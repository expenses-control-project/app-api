import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import {GastoService} from './gasto.service';
import {Gasto} from './gasto.entity';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('gasto')
@Controller('gasto')
export class GastoController {
	constructor(private readonly gastoService: GastoService) {}

	@Post()
	create(@Body() gasto: Gasto) {
		return this.gastoService.create(gasto);
	}

	@Get()
	findAll() {
		return this.gastoService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.gastoService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: number, @Body() gasto: Gasto) {
		return this.gastoService.update(+id, gasto);
	}

	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.gastoService.remove(+id);
	}
}
