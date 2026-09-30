'use client';

import dynamic from 'next/dynamic';

const ParticleNetwork = dynamic(
  () => import('@designcodeio/threeui/components/ParticleNetwork').then((mod) => mod.ParticleNetwork),
  { ssr: false }
);

export default function ThreeUIBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-40 overflow-hidden">
      <ParticleNetwork speed={0.8} opacity={0.5} />
    </div>
  );
}
