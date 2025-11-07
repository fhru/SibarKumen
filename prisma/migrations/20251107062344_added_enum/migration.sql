-- CreateEnum
CREATE TYPE "StatusPeminjaman" AS ENUM ('DIPINJAM', 'DIKEMBALIKAN');

-- CreateEnum
CREATE TYPE "TipeMutasi" AS ENUM ('MASUK', 'KELUAR', 'PINJAM', 'KEMBALI');

-- CreateTable
CREATE TABLE "barang" (
    "id_barang" SERIAL NOT NULL,
    "id_kategori" INTEGER,
    "kode_barang" VARCHAR NOT NULL,
    "nama_barang" VARCHAR NOT NULL,
    "deskripsi" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "barang_pkey" PRIMARY KEY ("id_barang")
);

-- CreateTable
CREATE TABLE "barang_keluar" (
    "id_barang_keluar" SERIAL NOT NULL,
    "id_user" INTEGER,
    "tanggal_keluar" DATE NOT NULL,
    "keterangan" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "barang_keluar_pkey" PRIMARY KEY ("id_barang_keluar")
);

-- CreateTable
CREATE TABLE "barang_masuk" (
    "id_barang_masuk" SERIAL NOT NULL,
    "id_user" INTEGER,
    "tanggal_masuk" DATE NOT NULL,
    "keterangan" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "barang_masuk_pkey" PRIMARY KEY ("id_barang_masuk")
);

-- CreateTable
CREATE TABLE "detail_barang_keluar" (
    "id_detail_keluar" SERIAL NOT NULL,
    "id_barang_keluar" INTEGER,
    "id_barang" INTEGER,
    "jumlah" INTEGER,
    "tujuan" VARCHAR,

    CONSTRAINT "detail_barang_keluar_pkey" PRIMARY KEY ("id_detail_keluar")
);

-- CreateTable
CREATE TABLE "detail_barang_masuk" (
    "id_detail_masuk" SERIAL NOT NULL,
    "id_barang_masuk" INTEGER,
    "id_barang" INTEGER,
    "jumlah" INTEGER,
    "harga" DECIMAL,

    CONSTRAINT "detail_barang_masuk_pkey" PRIMARY KEY ("id_detail_masuk")
);

-- CreateTable
CREATE TABLE "detail_peminjaman" (
    "id_detail_pinjam" SERIAL NOT NULL,
    "id_peminjaman" INTEGER,
    "id_barang" INTEGER,
    "jumlah" INTEGER,
    "kondisi" VARCHAR,

    CONSTRAINT "detail_peminjaman_pkey" PRIMARY KEY ("id_detail_pinjam")
);

-- CreateTable
CREATE TABLE "kategori" (
    "id_kategori" SERIAL NOT NULL,
    "nama_kategori" VARCHAR NOT NULL,
    "keterangan" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "kategori_pkey" PRIMARY KEY ("id_kategori")
);

-- CreateTable
CREATE TABLE "mutasi_barang" (
    "id_mutasi" SERIAL NOT NULL,
    "id_barang" INTEGER,
    "id_barang_masuk" INTEGER,
    "id_barang_keluar" INTEGER,
    "tanggal_mutasi" DATE NOT NULL,
    "tipe_mutasi" "TipeMutasi",
    "jumlah" INTEGER,
    "keterangan" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mutasi_barang_pkey" PRIMARY KEY ("id_mutasi")
);

-- CreateTable
CREATE TABLE "peminjaman_barang" (
    "id_peminjaman" SERIAL NOT NULL,
    "id_user" INTEGER,
    "tanggal_pinjam" DATE NOT NULL,
    "tanggal_kembali" DATE,
    "status" "StatusPeminjaman" DEFAULT 'DIPINJAM',
    "keterangan" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "peminjaman_barang_pkey" PRIMARY KEY ("id_peminjaman")
);

-- CreateTable
CREATE TABLE "stok_barang" (
    "id_stok" SERIAL NOT NULL,
    "id_barang" INTEGER,
    "stok_masuk" INTEGER DEFAULT 0,
    "stok_keluar" INTEGER DEFAULT 0,
    "stok_akhir" INTEGER DEFAULT 0,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stok_barang_pkey" PRIMARY KEY ("id_stok")
);

-- CreateTable
CREATE TABLE "users" (
    "id_user" SERIAL NOT NULL,
    "username" VARCHAR NOT NULL,
    "nama_lengkap" VARCHAR NOT NULL,
    "password" TEXT NOT NULL,
    "role" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_user")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "barang" ADD CONSTRAINT "barang_id_kategori_fkey" FOREIGN KEY ("id_kategori") REFERENCES "kategori"("id_kategori") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "barang_keluar" ADD CONSTRAINT "barang_keluar_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "barang_masuk" ADD CONSTRAINT "barang_masuk_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detail_barang_keluar" ADD CONSTRAINT "detail_barang_keluar_id_barang_fkey" FOREIGN KEY ("id_barang") REFERENCES "barang"("id_barang") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detail_barang_keluar" ADD CONSTRAINT "detail_barang_keluar_id_barang_keluar_fkey" FOREIGN KEY ("id_barang_keluar") REFERENCES "barang_keluar"("id_barang_keluar") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detail_barang_masuk" ADD CONSTRAINT "detail_barang_masuk_id_barang_fkey" FOREIGN KEY ("id_barang") REFERENCES "barang"("id_barang") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detail_barang_masuk" ADD CONSTRAINT "detail_barang_masuk_id_barang_masuk_fkey" FOREIGN KEY ("id_barang_masuk") REFERENCES "barang_masuk"("id_barang_masuk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detail_peminjaman" ADD CONSTRAINT "detail_peminjaman_id_barang_fkey" FOREIGN KEY ("id_barang") REFERENCES "barang"("id_barang") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detail_peminjaman" ADD CONSTRAINT "detail_peminjaman_id_peminjaman_fkey" FOREIGN KEY ("id_peminjaman") REFERENCES "peminjaman_barang"("id_peminjaman") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mutasi_barang" ADD CONSTRAINT "mutasi_barang_id_barang_fkey" FOREIGN KEY ("id_barang") REFERENCES "barang"("id_barang") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mutasi_barang" ADD CONSTRAINT "mutasi_barang_id_barang_keluar_fkey" FOREIGN KEY ("id_barang_keluar") REFERENCES "barang_keluar"("id_barang_keluar") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mutasi_barang" ADD CONSTRAINT "mutasi_barang_id_barang_masuk_fkey" FOREIGN KEY ("id_barang_masuk") REFERENCES "barang_masuk"("id_barang_masuk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "peminjaman_barang" ADD CONSTRAINT "peminjaman_barang_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stok_barang" ADD CONSTRAINT "stok_barang_id_barang_fkey" FOREIGN KEY ("id_barang") REFERENCES "barang"("id_barang") ON DELETE NO ACTION ON UPDATE NO ACTION;
