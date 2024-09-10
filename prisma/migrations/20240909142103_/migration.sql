/*
  Warnings:

  - A unique constraint covering the columns `[nombreEstablecimiento]` on the table `Establecimientos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Establecimientos_nombreEstablecimiento_key" ON "Establecimientos"("nombreEstablecimiento");
