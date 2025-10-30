export default function MeshGradient() {
  return (
    <div className="absolute inset-0 h-64 -mt-24 -z-10 top-[570px] md:top-[825px] pointer-events-none">
      <div className="absolute inset-0 w-full h-full">
        {/* Lingkaran 1 */}
        <div
          className="absolute left-[10%] top-[20%] w-16 md:w-80 h-16 md:h-80 bg-[#6A00F4] rounded-full blur-[90px]"
          style={{ mixBlendMode: 'color' }}
        />
        {/* Lingkaran 2 */}
        <div
          className="absolute left-[35%] top-[28%] w-16 md:w-[18rem] h-16 md:h-72 bg-[#9D4EDD] rounded-full blur-[100px]"
          style={{ mixBlendMode: 'color' }}
        />
        {/* Lingkaran 3 */}
        <div
          className="absolute left-[45%] top-[52%] w-40 md:w-72 h-40 md:h-72 bg-[#FF4D6D] rounded-full blur-[70px]"
          style={{ mixBlendMode: 'color' }}
        />
        {/* Lingkaran 4 */}
        <div
          className="absolute left-[68%] top-[18%] w-16 md:w-68 h-16 md:h-68 bg-[#4CC9F0] rounded-full blur-[95px]"
          style={{ mixBlendMode: 'color' }}
        />
        {/* Lingkaran 5 */}
        <div
          className="absolute left-[55%] top-[39%] w-16 md:w-64 h-16 md:h-64 bg-[#B5179E] rounded-full blur-[120px]"
          style={{ mixBlendMode: 'color' }}
        />
        {/* Tambahan overlap */}
        <div
          className="absolute left-[25%] top-[55%] w-16 md:w-40 h-16 md:h-40 bg-[#FFB4A2] rounded-full blur-[60px]"
          style={{ mixBlendMode: 'color' }}
        />
        <div
          className="absolute left-[70%] top-[58%] w-16 md:w-44 h-16 md:h-44 bg-[#43AA8B] rounded-full blur-[80px]"
          style={{ mixBlendMode: 'color' }}
        />
      </div>
    </div>
  );
}
