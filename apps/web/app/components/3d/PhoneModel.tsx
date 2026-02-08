import React, { useRef, useState, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll, RoundedBox, Html } from "@react-three/drei";
import * as THREE from "three";
import { Group } from "three";
import { easing } from "maath";

export function PhoneModel() {
  const group = useRef<Group>(null);
  
  // COMPONENTS 
  const displayRef = useRef<THREE.Mesh>(null);
  const touchRef = useRef<THREE.Mesh>(null);
  const boardRef = useRef<THREE.Mesh>(null);
  const batteryRef = useRef<THREE.Mesh>(null);
  const speakerRef = useRef<THREE.Mesh>(null);

  const scroll = useScroll();
  
  // --- INDUSTRIAL MATERIALS (Reference Inspired) ---
  // Using MeshStandardMaterial for reaction to light + Emissive for pulse
  
  const baseMaterialProps = {
      metalness: 0.9,
      roughness: 0.2,
      emissive: new THREE.Color("#000000"),
      emissiveIntensity: 0
  };

  const materials = useMemo(() => ({
      display: new THREE.MeshPhysicalMaterial({ 
          ...baseMaterialProps, 
          color: "#050505", 
          roughness: 0.1, 
          transmission: 0.1, 
          thickness: 0.5 
      }),
      touch: new THREE.MeshStandardMaterial({ ...baseMaterialProps, color: "#1a1a1a" }),
      board: new THREE.MeshStandardMaterial({ ...baseMaterialProps, color: "#0f172a" }), // Dark Slate
      battery: new THREE.MeshStandardMaterial({ ...baseMaterialProps, color: "#111111" }),
      speaker: new THREE.MeshStandardMaterial({ ...baseMaterialProps, color: "#222222" }),
  }), []);

  useFrame((state, delta) => {
    if (!group.current) return;

    // --- TIMELINE CONTROLLER ---
    // Scene 1: Hero (0 - 0.2)
    // Scene 2: Assembly (0.2 - 0.6)
    
    // 1. HERO
    const rHero = scroll.range(0, 0.2);
    // easing.damp3(group.current.scale, [1, 1, 1], 0.5, delta);
    
    // Rotate: Vertical -> Landscape (-90 deg Z)
    const targetRotX = THREE.MathUtils.lerp(0, 0.2, rHero); 
    const targetRotZ = THREE.MathUtils.lerp(0, -Math.PI / 2, rHero);
    easing.dampE(group.current.rotation, [targetRotX, 0, targetRotZ], 0.3, delta);
    
    // 2. ASSEMBLY
    const timeline = scroll.range(0.2, 0.6); 
    const startX = 8; 
    
    // Helper to animate part + emissive pulse
    const animateLayer = (mesh: THREE.Mesh | null, material: THREE.MeshStandardMaterial, stepIndex: number, finalX: number) => {
        if (!mesh) return;
        
        // Step Duration: 10% move, 10% pause. Total 5 steps = 100%.
        // Step 0: 0-10 move, 10-20 pause
        // Step 1: 20-30 move, 30-40 pause
        // ...
        
        const moveStart = (stepIndex * 0.2);
        const moveEnd = moveStart + 0.1;
        
        const pauseStart = moveEnd;
        const pauseEnd = pauseStart + 0.1;
        
        // A. MOVEMENT
        let progress = 0;
        if (timeline > moveStart && timeline <= moveEnd) {
            progress = (timeline - moveStart) / 0.1;
        } else if (timeline > moveEnd) {
            progress = 1;
        }
        
        // Easing (Power2 InOut style)
        const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
        mesh.position.x = THREE.MathUtils.lerp(startX, finalX, ease);
        
        // B. EMISSIVE PULSE (During Pause/Lock)
        // Flash bright then fade
        let intensity = 0;
        if (timeline > pauseStart && timeline < pauseEnd) {
             const p = (timeline - pauseStart) / 0.1;
             // Spike at start (0.1), fade out
             if (p < 0.2) intensity = p * 10; // Rapid ON (Max 2.0)
             else intensity = 2 * (1 - (p - 0.2)/0.8); // Fade OFF
        }
        
        // Apply emissive only if material supports it
        if ('emissiveIntensity' in material) {
             material.emissiveIntensity = Math.max(0, intensity);
             // Optional: Set emissive color to "Cyan" or "White" for the flash?
             // material.emissive.setHex(0xffffff);
             // We set base to black, so we need to set color too?
             // Let's set it to White for flash, revert to black?
             // Actually, if base emissive is Black, intensity won't show.
             // We need to set emissive color to something valid.
             if (intensity > 0.1) {
                 material.emissive.setHex(0x38bdf8); // Sky Blue / Cyan Pulse
             } else {
                 material.emissive.setHex(0x000000);
             }
        }
    };

    // Stacking gaps (Local X axis is vertical stack due to rotation)
    // Gap approx 0.08
    const gap = 0.06;
    
    // Order: Speaker(0) -> Battery(1) -> Board(2) -> Touch(3) -> Display(4)
    // Speaker is lowest (-2 * gap). Display is highest (+2 * gap).
    
    animateLayer(speakerRef.current, materials.speaker, 0, -2 * gap);
    animateLayer(batteryRef.current, materials.battery, 1, -1 * gap);
    animateLayer(boardRef.current, materials.board, 2, 0);
    animateLayer(touchRef.current, materials.touch, 3, 1 * gap);
    animateLayer(displayRef.current, materials.display, 4, 2 * gap);
    
  });
  
  return (
    <group ref={group} dispose={null}>
      
      {/* 5. DISPLAY (Top) */}
      <mesh ref={displayRef} position={[6, 0, 0.3]} material={materials.display}>
         <boxGeometry args={[0.05, 1.4, 2.9]} /> {/* Swapped dims for correct orientation on X-stack? */}
         {/* Wait. 
             If we animate X (Stack Axis).
             Box dims should be [Thickness, Height, Width] relative to Local axes?
             Local X is Stack Axis (Up/Down). So args[0] is Thickness (0.05).
             Local Y is "Left/Right" (Height of phone 2.9? Or Width 1.4?).
             Local Z is "Front/Back" (Width 1.4? Or Height 2.9?).
             
             Let's re-verify rotation.
             Group Rot Z = -90.
             Display Global Up (Y) -> Local X.
             Display Global Left (-X) -> Local Y.
             Display Global Start (Z) -> Local Z.
             
             Phone Dimensions: 
             Tall (Height) = 2.9 (along Global X / Local Y).
             Wide (Width) = 1.4 (along Global Z / Local Z).
             Thick = 0.05 (along Global Y / Local X).
             
             So BoxGeometry args should be: [Thickness, Height, Width].
             [0.05, 2.9, 1.4].
         */}
      </mesh>
      
      <RoundedBox ref={displayRef} args={[0.05, 2.9, 1.4]} radius={0.02} smoothness={4} material={materials.display}>
         <meshStandardMaterial {...materials.display} />
      </RoundedBox>
      
      <RoundedBox ref={touchRef} args={[0.02, 2.85, 1.35]} radius={0.02} smoothness={4} material={materials.touch} />
      <RoundedBox ref={boardRef} args={[0.05, 2.8, 1.30]} radius={0.02} smoothness={4} material={materials.board} />
      <RoundedBox ref={batteryRef} args={[0.05, 2.5, 1.0]} radius={0.02} smoothness={4} material={materials.battery} />
      <RoundedBox ref={speakerRef} args={[0.05, 2.9, 1.4]} radius={0.02} smoothness={4} material={materials.speaker} />
      
      {/* <Labels /> */}
    </group>
  );
}

// Labels component remains same...
function Labels() {
    const scroll = useScroll();
    const [activeStep, setActiveStep] = useState<number>(-1);

    useFrame(() => {
        const timeline = scroll.range(0.2, 0.6) * 100;
        let step = -1;
        if (timeline > 10 && timeline < 25) step = 0; 
        else if (timeline > 30 && timeline < 45) step = 1;
        else if (timeline > 50 && timeline < 65) step = 2;
        else if (timeline > 70 && timeline < 85) step = 3;
        else if (timeline > 90 && timeline < 100) step = 4;
        
        if (step !== activeStep) setActiveStep(step);
    });

    return (
        <>
            <Label text="Speaker" visible={activeStep === 0} pos={[-1.5, 0]} />
            <Label text="Battery" visible={activeStep === 1} pos={[1.5, 0]} />
            <Label text="Logic Board" visible={activeStep === 2} pos={[-1.5, 0]} />
            <Label text="Digitizer" visible={activeStep === 3} pos={[1.5, 0]} />
            <Label text="OLED Display" visible={activeStep === 4} pos={[0, -2]} />
        </>
    )
}

function Label({ text, visible, pos }: { text: string, visible: boolean, pos: [number, number] }) {
    return (
      <Html position={[0, pos[0], pos[1]]} center className={`pointer-events-none transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <div className="flex items-center gap-2">
             <div className="h-[2px] w-8 bg-sky-400 shadow-[0_0_10px_purple]"></div>
             <span className="text-xs font-black text-white bg-black/80 px-2 py-1 uppercase tracking-[0.2em] border border-white/20 backdrop-blur-sm">
                {text}
             </span>
          </div>
      </Html>
    );
}
