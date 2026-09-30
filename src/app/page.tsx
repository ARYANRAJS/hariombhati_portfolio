'use client';

import dynamic from 'next/dynamic';
import SmoothScroll from '@/components/ui/SmoothScroll';
import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import ResultsTicker from '@/components/sections/ResultsTicker';
import About from '@/components/sections/About';
import Footer from '@/components/sections/Footer';

// Dynamic imports with ssr: false for GSAP scroll-triggered and heavy interactive components
const CaseStudies = dynamic(
  () => import('@/components/sections/CaseStudies'),
  { ssr: false }
);

const ProcessSection = dynamic(
  () => import('@/components/sections/ProcessSection'),
  { ssr: false }
);

const SkillsMatrix = dynamic(
  () => import('@/components/sections/SkillsMatrix'),
  { ssr: false }
);

const Contact = dynamic(
  () => import('@/components/sections/Contact'),
  { ssr: false }
);

export default function Home() {
  return (
    <SmoothScroll>
      {/* Fixed Subtle Film Grain Texture */}
      <div className="bg-grain" />

      {/* Global Minimalist Navigation */}
      <Navbar />

      {/* Main Narrative Sections */}
      <main className="relative z-10 bg-[#080808]">
        {/* 1. Immersive 3D Hero */}
        <Hero />

        {/* 2. Key Proof Point Marquee */}
        <ResultsTicker />

        {/* 3. Verified Case Studies (GSAP Horizontal Scroll) */}
        <CaseStudies />

        {/* 4. Strategic Edge & Attribution Philosophy */}
        <About />

        {/* 5. 4-Step Growth Methodology (GSAP Sticky Stack) */}
        <ProcessSection />

        {/* 6. Asymmetric Bento Skills & Telemetry Matrix */}
        <SkillsMatrix />

        {/* 7. Recruiter & Founder Conversion Channel */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </SmoothScroll>
  );
}
