import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovimientoService } from './movimiento.service';
import { Movimiento } from './movimiento.entity';

@Controller('movimiento')
export class MovimientoController {
  constructor(private readonly movimientoService: MovimientoService) {}

  @Post()
  create(@Body() movimiento: Movimiento) {
    return this.movimientoService.create(movimiento);
  }

  @Get()
  findAll() {
    return this.movimientoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.movimientoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() movimiento: Movimiento) {
    return this.movimientoService.update(+id, movimiento);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.movimientoService.remove(+id);
  }
}
