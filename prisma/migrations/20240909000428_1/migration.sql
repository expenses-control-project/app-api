/*
  Warnings:

  - You are about to drop the column `total` on the `Rubros` table. All the data in the column will be lost.
  - Added the required column `descripcion` to the `Cuentas` table without a default value. This is not possible if the table is not empty.
  - Made the column `idRubro` on table `Establecimientos` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `descripcion` to the `Gastos` table without a default value. This is not possible if the table is not empty.
  - Made the column `idEstablecimiento` on table `Gastos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `idCuenta` on table `Ingresos` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Establecimientos" DROP CONSTRAINT "Establecimientos_idRubro_fkey";

-- DropForeignKey
ALTER TABLE "Gastos" DROP CONSTRAINT "Gastos_idEstablecimiento_fkey";

-- DropForeignKey
ALTER TABLE "Ingresos" DROP CONSTRAINT "Ingresos_idCuenta_fkey";

-- AlterTable
ALTER TABLE "Cuentas" ADD COLUMN     "descripcion" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Establecimientos" ALTER COLUMN "idRubro" SET NOT NULL;

-- AlterTable
ALTER TABLE "Gastos" ADD COLUMN     "descripcion" TEXT NOT NULL,
ALTER COLUMN "idEstablecimiento" SET NOT NULL;

-- AlterTable
ALTER TABLE "Ingresos" ALTER COLUMN "idCuenta" SET NOT NULL;

-- AlterTable
ALTER TABLE "Rubros" DROP COLUMN "total";

-- CreateTable
CREATE TABLE "GastosCuentas" (
    "idGasto" INTEGER NOT NULL,
    "idCuenta" INTEGER NOT NULL,

    CONSTRAINT "GastosCuentas_pkey" PRIMARY KEY ("idGasto","idCuenta")
);

-- AddForeignKey
ALTER TABLE "Establecimientos" ADD CONSTRAINT "Establecimientos_idRubro_fkey" FOREIGN KEY ("idRubro") REFERENCES "Rubros"("idRubro") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gastos" ADD CONSTRAINT "Gastos_idEstablecimiento_fkey" FOREIGN KEY ("idEstablecimiento") REFERENCES "Establecimientos"("idEstablecimiento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GastosCuentas" ADD CONSTRAINT "GastosCuentas_idGasto_fkey" FOREIGN KEY ("idGasto") REFERENCES "Gastos"("idGasto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GastosCuentas" ADD CONSTRAINT "GastosCuentas_idCuenta_fkey" FOREIGN KEY ("idCuenta") REFERENCES "Cuentas"("idCuenta") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingresos" ADD CONSTRAINT "Ingresos_idCuenta_fkey" FOREIGN KEY ("idCuenta") REFERENCES "Cuentas"("idCuenta") ON DELETE RESTRICT ON UPDATE CASCADE;
