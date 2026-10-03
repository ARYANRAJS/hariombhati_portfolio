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
        <main className="relative z-10 bg-[#080808] shadow-[0_30px_70px_rgba(0,0,0,0.95)]">
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

        {/* Fixed Curtain Reveal Footer */}
        <div
          id="footer-reveal-wrapper"
          className="relative w-full h-[88vh] sm:h-[82vh] lg:h-[88vh] min-h-[600px] sm:min-h-[580px] [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)]"
        >
          <div className="fixed bottom-0 left-0 w-full h-[88vh] sm:h-[82vh] lg:h-[88vh] min-h-[600px] sm:min-h-[580px] z-0">
            <Footer />
          </div>
        </div>
      </SmoothScroll>
    </>
  );
}
