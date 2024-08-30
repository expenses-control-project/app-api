-- CreateTable
CREATE TABLE "Usuarios" (
    "idUsuario" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("idUsuario")
);

-- CreateTable
CREATE TABLE "Cuentas" (
    "idCuenta" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "saldo" DOUBLE PRECISION NOT NULL,
    "idGasto" INTEGER,

    CONSTRAINT "Cuentas_pkey" PRIMARY KEY ("idCuenta")
);

-- CreateTable
CREATE TABLE "Establecimientos" (
    "idEstablecimiento" SERIAL NOT NULL,
    "nombreEstablecimiento" TEXT NOT NULL,
    "idRubro" INTEGER,

    CONSTRAINT "Establecimientos_pkey" PRIMARY KEY ("idEstablecimiento")
);

-- CreateTable
CREATE TABLE "Gastos" (
    "idGasto" SERIAL NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "idEstablecimiento" INTEGER,

    CONSTRAINT "Gastos_pkey" PRIMARY KEY ("idGasto")
);

-- CreateTable
CREATE TABLE "Ingresos" (
    "idIngreso" SERIAL NOT NULL,
    "saldo" DOUBLE PRECISION NOT NULL,
    "idCuenta" INTEGER,

    CONSTRAINT "Ingresos_pkey" PRIMARY KEY ("idIngreso")
);

-- CreateTable
CREATE TABLE "Rubros" (
    "idRubro" SERIAL NOT NULL,
    "nombreRubro" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Rubros_pkey" PRIMARY KEY ("idRubro")
);

-- CreateTable
CREATE TABLE "Movimientos" (
    "idMovimiento" SERIAL NOT NULL,
    "nombreMovimiento" TEXT NOT NULL,
    "idGasto" INTEGER,
    "idIngreso" INTEGER,
    "esGasto" BOOLEAN NOT NULL,
    "esIngreso" BOOLEAN NOT NULL,

    CONSTRAINT "Movimientos_pkey" PRIMARY KEY ("idMovimiento")
);

-- AddForeignKey
ALTER TABLE "Cuentas" ADD CONSTRAINT "Cuentas_idGasto_fkey" FOREIGN KEY ("idGasto") REFERENCES "Gastos"("idGasto") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Establecimientos" ADD CONSTRAINT "Establecimientos_idRubro_fkey" FOREIGN KEY ("idRubro") REFERENCES "Rubros"("idRubro") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gastos" ADD CONSTRAINT "Gastos_idEstablecimiento_fkey" FOREIGN KEY ("idEstablecimiento") REFERENCES "Establecimientos"("idEstablecimiento") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingresos" ADD CONSTRAINT "Ingresos_idCuenta_fkey" FOREIGN KEY ("idCuenta") REFERENCES "Cuentas"("idCuenta") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimientos" ADD CONSTRAINT "Movimientos_idIngreso_fkey" FOREIGN KEY ("idIngreso") REFERENCES "Ingresos"("idIngreso") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimientos" ADD CONSTRAINT "Movimientos_idGasto_fkey" FOREIGN KEY ("idGasto") REFERENCES "Gastos"("idGasto") ON DELETE SET NULL ON UPDATE CASCADE;
