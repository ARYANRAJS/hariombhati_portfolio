'use client';

import dynamic from 'next/dynamic';
import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { CaseStudies } from '@/components/sections/CaseStudies';
import Footer from '@/components/sections/Footer';

// Dynamic imports for heavy 3D/interactive components (no SSR)
const ThreeUIBackground = dynamic(
  () => import('@/components/3d/ThreeUIBackground'),
  { ssr: false }
);

const ParticleBackground = dynamic(
  () => import('@/components/3d/ParticleField'),
  { ssr: false }
);

const SkillsMatrix = dynamic(
  () => import('@/components/sections/SkillsMatrix'),
  { ssr: false }
);

const ROASCalculator = dynamic(
  () => import('@/components/sections/ROASCalculator'),
  { ssr: false }
);

const ProcessSection = dynamic(
  () => import('@/components/sections/ProcessSection'),
  { ssr: false }
);

const Certifications = dynamic(
  () => import('@/components/sections/Certifications'),
  { ssr: false }
);

const Contact = dynamic(
  () => import('@/components/sections/Contact'),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      {/* ThreeUI Ambient Shader Background */}
      <ThreeUIBackground />

      {/* Global 3D Particle Background */}
      <ParticleBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero />

        {/* Subtle section divider */}
        <div className="section-glow" />

        {/* Case Studies */}
        <CaseStudies />

        {/* Skills & Tools */}
        <SkillsMatrix />

        {/* Growth Engine / Process */}
        <ProcessSection />

        {/* ROAS Calculator */}
        <ROASCalculator />

        {/* Certifications & Education */}
        <Certifications />

        {/* Contact */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
