'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import SmoothScroll from '@/components/ui/SmoothScroll';
import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import ResultsTicker from '@/components/sections/ResultsTicker';
import About from '@/components/sections/About';
import Footer from '@/components/sections/Footer';

import Loader3D from '@/components/ui/Loader3D';
import CaseStudies from '@/components/sections/CaseStudies';
import ProcessSection from '@/components/sections/ProcessSection';
import SkillsMatrix from '@/components/sections/SkillsMatrix';
import Contact from '@/components/sections/Contact';

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <>
      {/* 3D Wireframe Loader with GSAP Counter & Split-Curtain Entrance */}
      {!loadingComplete && <Loader3D onLoadingComplete={() => setLoadingComplete(true)} />}

      <SmoothScroll>
        {/* Fixed Subtle Film Grain Texture */}
        <div className="bg-grain" />

        {/* Global Minimalist Navigation */}
        <Navbar />

        {/* Main Narrative Sections */}
        <main className="relative z-10 bg-[#080808]">
          {/* 1. Immersive Editorial Hero */}
          <Hero />

          {/* 2. Key Proof Point Marquee */}
          <ResultsTicker />

          {/* 3. About Hariom Bhati: Technical Background & Verified Certifications */}
          <About />

          {/* 4. Brands I Have Scaled (GSAP Horizontal Pan) */}
          <CaseStudies />

          {/* 5. 4-Step Growth Methodology */}
          <ProcessSection />

          {/* 6. Asymmetric Bento Skills & Telemetry Matrix */}
          <SkillsMatrix />

          {/* 7. Recruiter & Founder Conversion Channel */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </SmoothScroll>
    </>
  );
}
