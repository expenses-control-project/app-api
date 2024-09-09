/*
  Warnings:

  - A unique constraint covering the columns `[nombreRubro]` on the table `Rubros` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Rubros_nombreRubro_key" ON "Rubros"("nombreRubro");
