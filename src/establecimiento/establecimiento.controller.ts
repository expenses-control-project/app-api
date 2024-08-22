import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstablecimientoService } from './establecimiento.service';
import { CreateEstablecimientoDto } from './dto/create-establecimiento.dto';
import { UpdateEstablecimientoDto } from './dto/update-establecimiento.dto';

@Controller('establecimiento')
export class EstablecimientoController {
  constructor(private readonly establecimientoService: EstablecimientoService) {}

  @Post()
  create(@Body() createEstablecimientoDto: CreateEstablecimientoDto) {
    return this.establecimientoService.create(createEstablecimientoDto);
  }

  @Get()
  findAll() {
    return this.establecimientoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.establecimientoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstablecimientoDto: UpdateEstablecimientoDto) {
    return this.establecimientoService.update(+id, updateEstablecimientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.establecimientoService.remove(+id);
  }
}
