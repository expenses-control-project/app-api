/*
  Warnings:

  - You are about to drop the column `idGasto` on the `Cuentas` table. All the data in the column will be lost.
  - You are about to drop the `Movimientos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fecha` to the `Ingresos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cuentas" DROP CONSTRAINT "Cuentas_idGasto_fkey";

-- DropForeignKey
ALTER TABLE "Movimientos" DROP CONSTRAINT "Movimientos_idGasto_fkey";

-- DropForeignKey
ALTER TABLE "Movimientos" DROP CONSTRAINT "Movimientos_idIngreso_fkey";

-- AlterTable
ALTER TABLE "Cuentas" DROP COLUMN "idGasto";

-- AlterTable
ALTER TABLE "Ingresos" ADD COLUMN     "fecha" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Movimientos";
