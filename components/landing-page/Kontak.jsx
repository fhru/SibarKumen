import { MapPin, Phone, LifeBuoy, Clock } from 'lucide-react';

const contactData = [
  {
    icon: <MapPin className="w-6 h-6" />,
    title: 'Alamat Kantor',
    lines: ['Jl. Raya Merdeka No. 12, Kelurahan Sukamaju,', 'Kota Depok'],
    link: 'View on Google Maps',
    href: '#',
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: 'Kontak',
    lines: ['Telp: (021) 555-1234', 'Email: sibarkumen@kelurahan.go.id'],
    link: 'View on Google Maps',
    href: '#',
  },
  {
    icon: <LifeBuoy className="w-6 h-6" />,
    title: 'Dukungan Teknis',
    lines: ['Fahru - Admin Sistem', 'WA: 0812-3456-7890 (internal)'],
    link: 'View on Google Maps',
    href: '#',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Jam Layanan',
    lines: ['Senin-Jumat, 08.00-15.00 WIB'],
    link: 'View on Google Maps',
    href: '#',
  },
];

export default function Kontak() {
  return (
    <div className="w-full bg-background text-foreground py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Teks Section */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-5xl font-bold mb-3 md:mb-8">Contact our friendly team</h2>
          <h2 className="text-base md:text-xl text-muted-foreground">Let us know how we can help.</h2>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactData.map((item, index) => (
            <div
              key={index}
              className="bg-background text-foreground rounded-2xl p-6 flex flex-col gap-4 h-full border"
            >
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-muted">
                {item.icon}
              </div>
              <div className="grow">
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                {item.lines.map((line, i) => (
                  <p key={i} className="text-muted-foreground text-sm">
                    {line}
                  </p>
                ))}
              </div>
              {/* <div>
                <a href={item.href} className="text-sm font-semibold text-black underline">
                  {item.link}
                </a>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
