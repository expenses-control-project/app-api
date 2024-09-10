import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpStatus,
	ParseIntPipe,
} from '@nestjs/common';
import {GastoService} from './gasto.service';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {CreateGastoDto, UpdateGastoDto} from './gasto.dto';

@ApiTags('gasto')
@Controller('gasto')
export class GastoController {
	constructor(private readonly gastoService: GastoService) {}

	@ApiOperation({
		summary: 'Crea un gasto y debita de las cuentas correspondientes',
	})
	@Post()
	async create(@Body() gastoCreate: CreateGastoDto): Promise<any> {
		const {gasto, cuentas} = await this.gastoService.create(gastoCreate);

		return {
			statusCode: HttpStatus.CREATED,
			timestamp: new Date().toISOString(),
			message: 'Gasto creado y debitado de cuentas con éxito',
			gasto: gasto,
			cuentas: cuentas,
		};
	}

	@ApiOperation({
		summary: 'Obtiene todos los gastos',
	})
	@Get()
	async findAll(): Promise<any> {
		const gasto: [] = await this.gastoService.findAll();
		return {
			statusCode: HttpStatus.OK,
			timestamp: new Date().toISOString(),
			message: 'Gastos encontrados con éxito',
			gasto: gasto,
		};
	}

	@ApiOperation({
		summary: 'Obtiene gastos por ID',
	})
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
		const gasto = await this.gastoService.findOne(id);
		return {
			statusCode: HttpStatus.OK,
			timestamp: new Date().toISOString(),
			message: 'Gasto encontrado con éxito',
			gasto: gasto,
		};
	}

	@ApiOperation({
		summary: 'Edita los gastos',
	})
	@Patch()
	async update(@Body() gastoUpdate: UpdateGastoDto): Promise<any> {
		const gasto = await this.gastoService.update(gastoUpdate);
		return {
			statusCode: HttpStatus.OK,
			timestamp: new Date().toISOString(),
			message: 'Gasto editado con éxito',
			gasto: gasto,
		};
	}

	@ApiOperation({
		summary: 'Elimina un gasto por ID',
	})
	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number): Promise<any> {
		await this.gastoService.remove(id);
		return {
			statusCode: HttpStatus.OK,
			timestamp: new Date().toISOString(),
			message: 'Gasto eliminado con éxito',
		};
	}
}
