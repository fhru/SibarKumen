'use client';

import Navbar from '@/components/landing-page/Navbar';
import Hero from '@/components/landing-page/Hero';
import MeshGradient from '@/components/landing-page/MeshGradient';
import HeroImage from '@/components/landing-page/HeroImage';
import About from '@/components/landing-page/About';
import Panduan from '@/components/landing-page/Panduan';
import Kontak from '@/components/landing-page/Kontak';
import Footer from '@/components/landing-page/Footer';
import ChatWidget from '@/components/landing-page/ChatWidget';
import { useRef } from 'react';

export default function Home() {
  const panduanRef = useRef(null);

  const scrollToPanduan = () => {
    panduanRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main>
      <div className="container mx-auto relative overflow-hidden md:overflow-visible">
        <Navbar />
        <Hero onScrollToPanduan={scrollToPanduan} />
        <HeroImage />
        <About />
        <Panduan ref={panduanRef} />
        <Kontak />
        <MeshGradient />
      </div>
      <Footer />
      <ChatWidget />
    </main>
  );
}
