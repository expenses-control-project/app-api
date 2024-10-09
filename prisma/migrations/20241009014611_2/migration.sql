/*
  Warnings:

  - Added the required column `tipoCuenta` to the `Cuentas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cuentas" ADD COLUMN     "tipoCuenta" INTEGER NOT NULL;
