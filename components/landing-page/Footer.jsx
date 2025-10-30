import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Image src="/images/sibarkumenlogo.png" width={40} height={40} alt="Sibarkumen Logo" />
            <span className="font-bold text-lg">SibarKumen</span>
          </div>
          <div className="text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} SibarKumen. All rights reserved.</p>
            <p>Kelurahan Sukamaju, Kota Depok.</p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-gray-500 hover:text-gray-700">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-700">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
