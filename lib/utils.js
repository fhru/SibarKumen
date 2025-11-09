import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function generateKodeBarang(namaKategori, existingCount) {
  // Ambil 3 huruf depan kategori, uppercase
  const prefix = namaKategori.substring(0, 3).toUpperCase();
  
  // Format: KATEG001, KATEG002, dst
  const sequence = String(existingCount + 1).padStart(3, '0');
  
  return `${prefix}${sequence}`;
}

// Utility function untuk convert Decimal ke number
export function convertDecimalsToNumbers(data) {
  return JSON.parse(JSON.stringify(data, (key, value) => {
    if (value && typeof value === 'object' && value.isDecimal) {
      return parseFloat(value.toString());
    }
    return value;
  }));
}
