import { Container, Button } from "@mobile-shop/ui";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Hero } from "./components/home/Hero";
import { Features } from "./components/home/Features";
import { CTASection } from "./components/home/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Animated Hero Section */}
      <Hero />

      {/* Features Grid */}
      <Features />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}

