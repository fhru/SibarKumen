/*
  Warnings:

  - A unique constraint covering the columns `[kode_kategori]` on the table `kategori` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "kategori" ADD COLUMN     "kode_kategori" VARCHAR;

-- CreateIndex
CREATE UNIQUE INDEX "kategori_kode_kategori_key" ON "kategori"("kode_kategori");
