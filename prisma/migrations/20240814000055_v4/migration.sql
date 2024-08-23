/*
  Warnings:

  - You are about to drop the column `idRubro` on the `Movimiento` table. All the data in the column will be lost.
  - Added the required column `esGasto` to the `Movimiento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `esIngreso` to the `Movimiento` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Movimiento" DROP CONSTRAINT "Movimiento_idRubro_fkey";

-- AlterTable
ALTER TABLE "Movimiento" DROP COLUMN "idRubro",
ADD COLUMN     "esGasto" BOOLEAN NOT NULL,
ADD COLUMN     "esIngreso" BOOLEAN NOT NULL,
ADD COLUMN     "idGasto" INTEGER,
ADD COLUMN     "idIngreso" INTEGER;

-- AddForeignKey
ALTER TABLE "Movimiento" ADD CONSTRAINT "Movimiento_idIngreso_fkey" FOREIGN KEY ("idIngreso") REFERENCES "Ingreso"("idIngreso") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimiento" ADD CONSTRAINT "Movimiento_idGasto_fkey" FOREIGN KEY ("idGasto") REFERENCES "Gasto"("idGasto") ON DELETE SET NULL ON UPDATE CASCADE;
