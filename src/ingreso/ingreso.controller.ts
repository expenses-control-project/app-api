import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import {IngresoService} from './ingreso.service';
import {Ingreso} from './ingreso.entity';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('ingreso')
@Controller('ingreso')
export class IngresoController {
	constructor(private readonly ingresoService: IngresoService) {}

	@Post()
	create(@Body() ingreso: Ingreso) {
		return this.ingresoService.create(ingreso);
	}

	@Get()
	findAll() {
		return this.ingresoService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.ingresoService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: number, @Body() ingreso: Ingreso) {
		return this.ingresoService.update(+id, ingreso);
	}

	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.ingresoService.remove(+id);
	}
}
