import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ParseIntPipe,
	HttpStatus,
} from '@nestjs/common';
import {CuentaService} from './cuenta.service';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {CreateCuentaDto, UpdateCuentaDto} from './cuenta.dto';

@ApiTags('cuenta')
@Controller('cuenta')
export class CuentaController {
	constructor(private readonly cuentaService: CuentaService) {}

	@ApiOperation({
		summary: 'Crea un cuenta enviando los datos necesarios por body',
	})
	@Post()
	async create(@Body() cuentaCreate: CreateCuentaDto): Promise<any> {
		const cuenta = await this.cuentaService.create(cuentaCreate);
		return {
			statusCode: HttpStatus.CREATED,
			timestamp: new Date().toISOString(),
			message: 'Cuenta creada con éxito',
			cuenta: cuenta,
		};
	}

	@ApiOperation({
		summary: 'Obtiene todas las cuentas',
	})
	@Get()
	async findAll(): Promise<any> {
		const cuenta: [] = await this.cuentaService.findAll();
		return {
			statusCode: HttpStatus.OK,
			timestamp: new Date().toISOString(),
			message: 'Cuentas encontradas con éxito',
			cuenta: cuenta,
		};
	}
	@ApiOperation({
		summary: 'Obtiene cuentas por ID',
	})
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
		const cuenta = await this.cuentaService.findOne(id);
		return {
			statusCode: HttpStatus.OK,
			timestamp: new Date().toISOString(),
			message: 'Cuenta encontrada con éxito',
			cuenta: cuenta,
		};
	}
	@ApiOperation({
		summary: 'Edita las cuentas',
	})
	@Patch(':id')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() cuentaUpdate: UpdateCuentaDto,
	): Promise<any> {
		const cuenta = await this.cuentaService.update(id, cuentaUpdate);
		return {
			statusCode: HttpStatus.OK,
			timestamp: new Date().toISOString(),
			message: 'Cuenta editada con éxito',
			cuenta: cuenta,
		};
	}
	@ApiOperation({
		summary: 'Elimina una cuenta por ID',
	})
	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number): Promise<any> {
		await this.cuentaService.remove(id);
		return {
			statusCode: HttpStatus.OK,
			timestamp: new Date().toISOString(),
			message: 'Cuenta eliminada con éxito',
		};
	}
}
