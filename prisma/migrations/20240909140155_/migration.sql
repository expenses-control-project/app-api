/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `Cuentas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Cuentas_nombre_key" ON "Cuentas"("nombre");
