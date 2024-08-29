import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import {EstablecimientoService} from './establecimiento.service';
import {Cuenta} from 'src/cuenta/cuenta.entity';
import {Establecimiento} from './establecimiento.entity';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('establecimiento')
@Controller('establecimiento')
export class EstablecimientoController {
	constructor(
		private readonly establecimientoService: EstablecimientoService,
	) {}

	@Post()
	create(@Body() establecimiento: Establecimiento) {
		return this.establecimientoService.create(establecimiento);
	}

	@Get()
	findAll() {
		return this.establecimientoService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.establecimientoService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: number, @Body() establecimiento: Establecimiento) {
		return this.establecimientoService.update(+id, establecimiento);
	}

	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.establecimientoService.remove(+id);
	}
}
