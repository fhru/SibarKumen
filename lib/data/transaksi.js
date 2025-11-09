import prisma from '../prisma';

// Get all barang masuk
export async function getBarangMasuk() {
  try {
    const barangMasuk = await prisma.barang_masuk.findMany({
      include: {
        users: {
          select: {
            id_user: true,
            nama_lengkap: true,
            username: true,
          },
        },
        detail_barang_masuk: {
          include: {
            barang: {
              select: {
                id_barang: true,
                nama_barang: true,
                kode_barang: true,
                kategori: {
                  select: {
                    id_kategori: true,
                    nama_kategori: true,
                  },
                },
                satuan: {
                  select: {
                    id_satuan: true,
                    nama_satuan: true,
                    singkatan: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        tanggal_masuk: 'desc',
      },
    });

    return barangMasuk;
  } catch (error) {
    console.error('Failed to fetch barang masuk:', error);
    throw new Error('Failed to fetch barang masuk.');
  }
}

export async function getBarangMasukById(id) {
  try {
    const barangMasuk = await prisma.barang_masuk.findUnique({
      where: { id_barang_masuk: id },
      include: {
        users: {
          select: {
            id_user: true,
            nama_lengkap: true,
            username: true,
          },
        },
        detail_barang_masuk: {
          include: {
            barang: {
              select: {
                id_barang: true,
                nama_barang: true,
                kode_barang: true,
                kategori: {
                  select: {
                    id_kategori: true,
                    nama_kategori: true,
                  },
                },
                satuan: {
                  select: {
                    id_satuan: true,
                    nama_satuan: true,
                    singkatan: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return barangMasuk.map((item) => ({
      ...item,
      detail_barang_masuk: item.detail_barang_masuk.map((detail) => ({
        ...detail,
        harga: detail.harga ? parseFloat(detail.harga.toString()) : 0, // Convert Decimal to Number
      })),
    }));
  } catch (error) {
    console.error('Failed to fetch barang masuk by ID:', error);
    throw new Error('Failed to fetch barang masuk.');
  }
}

// Create barang masuk
export async function createBarangMasuk(data) {
  try {
    const { tanggal_masuk, id_user, keterangan, items, details } = data;
    
    // Gunakan items jika ada, jika tidak gunakan details
    const itemDetails = items || details;

    // Validasi input
    if (!itemDetails || !Array.isArray(itemDetails) || itemDetails.length === 0) {
      throw new Error('Items/Details must be a non-empty array');
    }

    // Validasi setiap item
    itemDetails.forEach((item, index) => {
      if (!item) {
        throw new Error(`Item ${index} is null or undefined`);
      }
      if (!item.id_barang) {
        throw new Error(`Item ${index} missing id_barang`);
      }
      if (typeof item.jumlah !== 'number' || item.jumlah <= 0) {
        throw new Error(`Item ${index} has invalid jumlah: ${item.jumlah}`);
      }
    });

    // Convert string date to DateTime untuk Prisma
    const tanggalMasukDateTime = new Date(tanggal_masuk);
    if (isNaN(tanggalMasukDateTime.getTime())) {
      throw new Error(`Invalid date: ${tanggal_masuk}`);
    }

    const result = await prisma.$transaction(async (prisma) => {
      // Create barang masuk header
      const barangMasukData = {
        tanggal_masuk: tanggalMasukDateTime,
        keterangan: keterangan || '',
      };

      // Tambahkan id_user hanya jika ada
      if (id_user) {
        barangMasukData.id_user = id_user;
      }

      const barangMasuk = await prisma.barang_masuk.create({
        data: barangMasukData,
      });

      // Create detail barang masuk
      const detailPromises = itemDetails.map((item) =>
        prisma.detail_barang_masuk.create({
          data: {
            id_barang_masuk: barangMasuk.id_barang_masuk,
            id_barang: item.id_barang,
            jumlah: item.jumlah,
            harga: item.harga || 0,
          },
        })
      );

      await Promise.all(detailPromises);

      // Update stok barang - handle both create and update
      const stokPromises = itemDetails.map(async (item) => {
        // Cek apakah stok record sudah ada untuk barang ini
        const existingStok = await prisma.stok_barang.findFirst({
          where: { id_barang: item.id_barang },
        });

        if (existingStok) {
          // Update existing stok record menggunakan id_stok sebagai primary key
          return prisma.stok_barang.update({
            where: { id_stok: existingStok.id_stok },
            data: {
              stok_masuk: { increment: item.jumlah },
              stok_akhir: { increment: item.jumlah },
              updated_at: new Date(),
            },
          });
        } else {
          // Create new stok record
          return prisma.stok_barang.create({
            data: {
              id_barang: item.id_barang,
              stok_masuk: item.jumlah,
              stok_keluar: 0,
              stok_akhir: item.jumlah,
            },
          });
        }
      });

      await Promise.all(stokPromises);

      // Create mutasi barang untuk audit trail
      const mutasiPromises = itemDetails.map((item) =>
        prisma.mutasi_barang.create({
          data: {
            id_barang: item.id_barang,
            id_barang_masuk: barangMasuk.id_barang_masuk,
            tanggal_mutasi: tanggalMasukDateTime,
            tipe_mutasi: 'MASUK',
            jumlah: item.jumlah,
            keterangan: `${keterangan || 'Tanpa keterangan'}`,
          },
        })
      );

      await Promise.all(mutasiPromises);

      return barangMasuk;
    });

    return result;
  } catch (error) {
    console.error('Failed to create barang masuk:', error);
    throw new Error('Failed to create barang masuk.');
  }
}

// Delete barang masuk
export async function deleteBarangMasuk(id) {
  try {
    const result = await prisma.$transaction(async (prisma) => {
      // Get barang masuk data first for stock reversal
      const barangMasuk = await prisma.barang_masuk.findUnique({
        where: { id_barang_masuk: id },
        include: {
          detail_barang_masuk: true,
        },
      });

      if (!barangMasuk) {
        throw new Error('Barang masuk not found');
      }

      // Reverse stock changes - FIXED: cari stok record dulu menggunakan id_stok
      const stokPromises = barangMasuk.detail_barang_masuk.map(async (detail) => {
        // Cari stok record yang existing berdasarkan id_barang
        const existingStok = await prisma.stok_barang.findFirst({
          where: { id_barang: detail.id_barang }
        });

        if (existingStok) {
          // Update menggunakan id_stok sebagai primary key
          return prisma.stok_barang.update({
            where: { id_stok: existingStok.id_stok },
            data: {
              stok_masuk: { decrement: detail.jumlah },
              stok_akhir: { decrement: detail.jumlah },
              updated_at: new Date(),
            },
          });
        }
        // Jika tidak ada stok record, skip (seharusnya tidak terjadi untuk data yang valid)
      });

      await Promise.all(stokPromises);

      // Delete mutasi barang related to this barang masuk
      await prisma.mutasi_barang.deleteMany({
        where: { id_barang_masuk: id },
      });

      // Delete detail barang masuk
      await prisma.detail_barang_masuk.deleteMany({
        where: { id_barang_masuk: id },
      });

      // Delete barang masuk header
      const deletedBarangMasuk = await prisma.barang_masuk.delete({
        where: { id_barang_masuk: id },
      });

      return deletedBarangMasuk;
    });

    return result;
  } catch (error) {
    console.error('Failed to delete barang masuk:', error);
    throw new Error('Failed to delete barang masuk.');
  }
}


// Update barang masuk - FIXED VERSION
export async function updateBarangMasuk(id, data) {
  try {
    console.log('🔄 DATA DI updateBarangMasuk:', data);
    console.log('📦 ITEMS:', data?.items);
    console.log('🔍 DETAILS:', data?.details);

    const { tanggal_masuk, keterangan, items, details } = data;
    const itemDetails = items || details;

    console.log('✅ FINAL ITEM DETAILS:', itemDetails);

    // Validasi input
    if (
      !itemDetails ||
      !Array.isArray(itemDetails) ||
      itemDetails.length === 0
    ) {
      throw new Error('Items/Details must be a non-empty array');
    }

    // ✅ FIX: Convert string date to DateTime
    const tanggalMasukDateTime = new Date(tanggal_masuk + 'T00:00:00.000Z');
    console.log('📅 DATE CONVERSION:', tanggalMasukDateTime);

    const result = await prisma.$transaction(async (tx) => {
      // 1. Get existing data
      const existing = await tx.barang_masuk.findUnique({
        where: { id_barang_masuk: id },
        include: {
          detail_barang_masuk: true,
          mutasi_barang: true,
        },
      });

      if (!existing) {
        throw new Error('Barang masuk not found');
      }

      // 2. Reverse old stock & delete mutasi - ✅ FIXED
      const reverseStockPromises = existing.detail_barang_masuk.map(
        async (detail) => {
          // Cari stok record yang existing
          const existingStok = await tx.stok_barang.findFirst({
            where: { id_barang: detail.id_barang },
          });

          if (existingStok) {
            return tx.stok_barang.update({
              where: { id_stok: existingStok.id_stok }, // ✅ PAKAI id_stok
              data: {
                stok_masuk: { decrement: detail.jumlah },
                stok_akhir: { decrement: detail.jumlah },
              },
            });
          }
        }
      );

      const deleteMutasiPromise = tx.mutasi_barang.deleteMany({
        where: { id_barang_masuk: id },
      });

      await Promise.all([...reverseStockPromises, deleteMutasiPromise]);

      // 3. Delete old details
      await tx.detail_barang_masuk.deleteMany({
        where: { id_barang_masuk: id },
      });

      // 4. Update header
      const updatedBarangMasuk = await tx.barang_masuk.update({
        where: { id_barang_masuk: id },
        data: {
          tanggal_masuk: tanggalMasukDateTime, // ✅ PAKAI DateTime
          keterangan,
          updated_at: new Date(),
        },
      });

      // 5. Validate new barang
      const barangIds = itemDetails.map((item) => item.id_barang);
      const existingBarang = await tx.barang.findMany({
        where: { id_barang: { in: barangIds } },
        select: { id_barang: true },
      });

      if (existingBarang.length !== itemDetails.length) {
        throw new Error('Some barang not found');
      }

      // 6. Create new details
      await tx.detail_barang_masuk.createMany({
        data: itemDetails.map((item) => ({
          id_barang_masuk: id,
          id_barang: item.id_barang,
          jumlah: item.jumlah,
          harga: item.harga || 0,
        })),
      });

      // 7. Update stock & create mutasi (parallel) - ✅ FIXED
      const stockUpdates = itemDetails.map(async (item) => {
        // Cari stok record yang existing
        const existingStok = await tx.stok_barang.findFirst({
          where: { id_barang: item.id_barang },
        });

        if (existingStok) {
          // UPDATE existing
          return tx.stok_barang.update({
            where: { id_stok: existingStok.id_stok }, // ✅ PAKAI id_stok
            data: {
              stok_masuk: { increment: item.jumlah },
              stok_akhir: { increment: item.jumlah },
              updated_at: new Date(),
            },
          });
        } else {
          // CREATE new
          return tx.stok_barang.create({
            data: {
              id_barang: item.id_barang,
              stok_masuk: item.jumlah,
              stok_keluar: 0,
              stok_akhir: item.jumlah,
            },
          });
        }
      });

      const mutasiCreates = itemDetails.map((item) =>
        tx.mutasi_barang.create({
          data: {
            id_barang: item.id_barang,
            id_barang_masuk: id,
            tanggal_mutasi: tanggalMasukDateTime, // ✅ PAKAI DateTime
            tipe_mutasi: 'MASUK',
            jumlah: item.jumlah,
            keterangan: `${keterangan || 'Updated'}`,
          },
        })
      );

      await Promise.all([...stockUpdates, ...mutasiCreates]);

      return updatedBarangMasuk;
    });

    return result;
  } catch (error) {
    console.error(`Failed to update barang masuk ${id}:`, error);
    throw new Error(error.message || 'Failed to update barang masuk');
  }
}
