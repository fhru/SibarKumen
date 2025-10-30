import Navbar from '@/components/landing-page/Navbar';
import Hero from '@/components/landing-page/Hero';
import MeshGradient from '@/components/landing-page/MeshGradient';
import HeroImage from '@/components/landing-page/HeroImage';
import About from '@/components/landing-page/About';
import Panduan from '@/components/landing-page/Panduan';
import Kontak from '@/components/landing-page/Kontak';
import Footer from '@/components/landing-page/Footer';
import ChatWidget from '@/components/landing-page/ChatWidget';

export default function Home() {
  return (
    <main>
      <div className="container mx-auto relative overflow-hidden md:overflow-visible">
        <Navbar />
        <Hero />
        <HeroImage />
        <About />
        <div id="panduan">
          <Panduan />
        </div>
        <Kontak />
        <MeshGradient />
      </div>
      <Footer />
      <ChatWidget />
    </main>
  );
}
