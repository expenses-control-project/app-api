import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import {CuentaService} from './cuenta.service';
import { Cuenta } from './cuenta.entity';

@Controller('cuenta')
export class CuentaController {
	constructor(private readonly cuentaService: CuentaService) {}

	@Post()
	create(@Body() cuenta: Cuenta) {
		return this.cuentaService.create(cuenta);
	}

	@Get()
	findAll() {
		return this.cuentaService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.cuentaService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: number, @Body() cuenta: Cuenta) {
		return this.cuentaService.update(+id, cuenta);
	}

	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.cuentaService.remove(+id);
	}
}
