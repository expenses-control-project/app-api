-- CreateTable
CREATE TABLE "Movimiento" (
    "idMovimiento" SERIAL NOT NULL,
    "nombreMovimiento" TEXT NOT NULL,
    "idRubro" INTEGER,

    CONSTRAINT "Movimiento_pkey" PRIMARY KEY ("idMovimiento")
);

-- AddForeignKey
ALTER TABLE "Movimiento" ADD CONSTRAINT "Movimiento_idRubro_fkey" FOREIGN KEY ("idRubro") REFERENCES "Rubro"("idRubro") ON DELETE SET NULL ON UPDATE CASCADE;
