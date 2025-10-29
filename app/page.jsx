import Navbar from '@/components/landing-page/Navbar';
import Hero from '@/components/landing-page/Hero';
import MeshGradient from '@/components/landing-page/MeshGradient';
import HeroImage from '@/components/landing-page/HeroImage';
import About from '@/components/landing-page/About';

export default function Home() {
  return (
    <div>
      <div className="container mx-auto">
        <Navbar />
        <Hero />
        <HeroImage />
        <About />
      </div>
      <MeshGradient />
    </div>
  );
}
