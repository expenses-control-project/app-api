import { Module } from '@nestjs/common';
import { EstablecimientoService } from './establecimiento.service';
import { EstablecimientoController } from './establecimiento.controller';

@Module({
  controllers: [EstablecimientoController],
  providers: [EstablecimientoService],
})
export class EstablecimientoModule {}
