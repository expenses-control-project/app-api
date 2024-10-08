-- CreateEnum
CREATE TYPE "ROLES" AS ENUM ('USUARIO', 'ADMIN');

-- CreateEnum
CREATE TYPE "ACCES_LEVEL" AS ENUM ('BASIC', 'MANTEINER', 'OWNER');

-- CreateTable
CREATE TABLE "Usuarios" (
    "idUsuario" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "edad" DOUBLE PRECISION NOT NULL,
    "email" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "ROLES" NOT NULL DEFAULT 'USUARIO',
    "acceso" "ACCES_LEVEL" NOT NULL DEFAULT 'BASIC',

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("idUsuario")
);

-- CreateTable
CREATE TABLE "Cuentas" (
    "idCuenta" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "saldo" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Cuentas_pkey" PRIMARY KEY ("idCuenta")
);

-- CreateTable
CREATE TABLE "Establecimientos" (
    "idEstablecimiento" SERIAL NOT NULL,
    "nombreEstablecimiento" TEXT NOT NULL,
    "idRubro" INTEGER NOT NULL,

    CONSTRAINT "Establecimientos_pkey" PRIMARY KEY ("idEstablecimiento")
);

-- CreateTable
CREATE TABLE "Gastos" (
    "idGasto" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "idEstablecimiento" INTEGER NOT NULL,

    CONSTRAINT "Gastos_pkey" PRIMARY KEY ("idGasto")
);

-- CreateTable
CREATE TABLE "GastosCuentas" (
    "idGasto" INTEGER NOT NULL,
    "idCuenta" INTEGER NOT NULL,

    CONSTRAINT "GastosCuentas_pkey" PRIMARY KEY ("idGasto","idCuenta")
);

-- CreateTable
CREATE TABLE "Ingresos" (
    "idIngreso" SERIAL NOT NULL,
    "saldo" DOUBLE PRECISION NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "idCuenta" INTEGER NOT NULL,

    CONSTRAINT "Ingresos_pkey" PRIMARY KEY ("idIngreso")
);

-- CreateTable
CREATE TABLE "Rubros" (
    "idRubro" SERIAL NOT NULL,
    "nombreRubro" TEXT NOT NULL,

    CONSTRAINT "Rubros_pkey" PRIMARY KEY ("idRubro")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_usuario_key" ON "Usuarios"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "Cuentas_nombre_key" ON "Cuentas"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Establecimientos_nombreEstablecimiento_key" ON "Establecimientos"("nombreEstablecimiento");

-- CreateIndex
CREATE UNIQUE INDEX "Rubros_nombreRubro_key" ON "Rubros"("nombreRubro");

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
