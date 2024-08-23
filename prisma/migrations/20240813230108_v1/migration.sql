-- CreateTable
CREATE TABLE "Cuenta" (
    "idCuenta" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "saldo" DOUBLE PRECISION NOT NULL,
    "idGasto" INTEGER,

    CONSTRAINT "Cuenta_pkey" PRIMARY KEY ("idCuenta")
);

-- CreateTable
CREATE TABLE "Establecimiento" (
    "idEstablecimiento" SERIAL NOT NULL,
    "nombreEstablecimiento" TEXT NOT NULL,
    "idRubro" INTEGER,

    CONSTRAINT "Establecimiento_pkey" PRIMARY KEY ("idEstablecimiento")
);

-- CreateTable
CREATE TABLE "Gasto" (
    "idGasto" SERIAL NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "idEstablecimiento" INTEGER,

    CONSTRAINT "Gasto_pkey" PRIMARY KEY ("idGasto")
);

-- CreateTable
CREATE TABLE "Ingreso" (
    "idIngreso" SERIAL NOT NULL,
    "saldo" DOUBLE PRECISION NOT NULL,
    "idCuenta" INTEGER,

    CONSTRAINT "Ingreso_pkey" PRIMARY KEY ("idIngreso")
);

-- CreateTable
CREATE TABLE "Rubro" (
    "idRubro" SERIAL NOT NULL,
    "nombreRubro" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Rubro_pkey" PRIMARY KEY ("idRubro")
);

-- AddForeignKey
ALTER TABLE "Cuenta" ADD CONSTRAINT "Cuenta_idGasto_fkey" FOREIGN KEY ("idGasto") REFERENCES "Gasto"("idGasto") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Establecimiento" ADD CONSTRAINT "Establecimiento_idRubro_fkey" FOREIGN KEY ("idRubro") REFERENCES "Rubro"("idRubro") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gasto" ADD CONSTRAINT "Gasto_idEstablecimiento_fkey" FOREIGN KEY ("idEstablecimiento") REFERENCES "Establecimiento"("idEstablecimiento") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingreso" ADD CONSTRAINT "Ingreso_idCuenta_fkey" FOREIGN KEY ("idCuenta") REFERENCES "Cuenta"("idCuenta") ON DELETE SET NULL ON UPDATE CASCADE;
