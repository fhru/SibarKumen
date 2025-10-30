import Image from 'next/image';

export default function HeroImage() {
  return (
    <div className="w-full px-3 md:px-24">
      <div className="w-full bg-white/50 rounded-xl md:rounded-3xl p-2 md:p-4 relative">
        <Image
          src="/images/Dashboard.png"
          alt="Hero Image"
          width={1440}
          height={1105}
          className="w-full rounded-lg md:rounded-2xl"
          draggable={false}
        />
        <div className="w-full bg-linear-to-t from-white to-transparent absolute bottom-0 left-0 h-full"></div>
      </div>
    </div>
  );
}
