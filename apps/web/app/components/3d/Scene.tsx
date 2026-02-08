"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, ScrollControls } from "@react-three/drei";
import { Suspense } from "react";
import { PhoneModel } from "./PhoneModel";

export function ThreeScene() {
  return (
    <div className="h-screen w-full relative bg-slate-50 dark:bg-slate-950">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [2, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={2048} castShadow />
          <Environment preset="city" />
          <ScrollControls pages={3} damping={0.25}>
            <PhoneModel />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
