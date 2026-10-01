'use client';

import React, { useState } from 'react';
import SmoothScroll from '@/components/ui/SmoothScroll';
import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Footer from '@/components/sections/Footer';

import Loader3D from '@/components/ui/Loader3D';
import CaseStudies from '@/components/sections/CaseStudies';
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

          {/* 2. About Hariom Bhati: Experience & Verified Certifications */}
          <About />

          {/* 3. Brands I Have Scaled (Featured Case Studies) */}
          <CaseStudies />

          {/* 4. Core Skills & Technical Growth Stack */}
          <SkillsMatrix />

          {/* 5. Recruiter & Founder Conversion Channel */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </SmoothScroll>
    </>
  );
}
