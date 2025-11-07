/*
  Warnings:

  - Made the column `kode_kategori` on table `kategori` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "StatusUser" AS ENUM ('AKTIF', 'NONAKTIF');

-- AlterTable
ALTER TABLE "barang" ADD COLUMN     "id_satuan" INTEGER,
ADD COLUMN     "stok_minimum" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "kategori" ALTER COLUMN "kode_kategori" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "status" "StatusUser" NOT NULL DEFAULT 'AKTIF';

-- CreateTable
CREATE TABLE "satuan" (
    "id_satuan" SERIAL NOT NULL,
    "nama_satuan" VARCHAR NOT NULL,
    "singkatan" VARCHAR NOT NULL,
    "keterangan" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "satuan_pkey" PRIMARY KEY ("id_satuan")
);

-- CreateIndex
CREATE UNIQUE INDEX "satuan_nama_satuan_key" ON "satuan"("nama_satuan");

-- CreateIndex
CREATE UNIQUE INDEX "satuan_singkatan_key" ON "satuan"("singkatan");

-- AddForeignKey
ALTER TABLE "barang" ADD CONSTRAINT "barang_id_satuan_fkey" FOREIGN KEY ("id_satuan") REFERENCES "satuan"("id_satuan") ON DELETE NO ACTION ON UPDATE NO ACTION;
