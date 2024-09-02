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
import {MovimientoService} from './movimiento.service';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {CreateMovimientoDto, UpdateMovimientoDto} from './movimiento.dto';

@ApiTags('movimiento')
@Controller('movimiento')
export class MovimientoController {
	constructor(private readonly movimientoService: MovimientoService) {}

	@ApiOperation({
		summary: 'Crea un movimiento ',
	})
	@Post()
	async create(@Body() movimientoCreate: CreateMovimientoDto): Promise<any> {
		const movimiento =
			await this.movimientoService.create(movimientoCreate);
		return {
			statusCode: HttpStatus.CREATED,
			timestamp: new Date().toISOString(),
			message: 'Movimiento creado con éxito',
			movimiento: movimiento,
		};
	}

	@ApiOperation({
		summary: 'Obtiene todos los movimientos',
	})
	@Get()
	async findAll(): Promise<any> {
		const movimiento: [] = await this.movimientoService.findAll();
		return {
			statusCode: HttpStatus.OK,
			timestamp: new Date().toISOString(),
			message: 'Movimientos encontrados con éxito',
			movimiento: movimiento,
		};
	}

	@ApiOperation({
		summary: 'Obtiene movimientos por ID',
	})
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
		const movimiento = await this.movimientoService.findOne(id);
		return {
			statusCode: HttpStatus.OK,
			timestamp: new Date().toISOString(),
			message: 'Movimiento encontrado con éxito',
			movimiento: movimiento,
		};
	}

	@ApiOperation({
		summary: 'Edita las cuentas',
	})
	@Patch(':id')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() movimientoUpdate: UpdateMovimientoDto,
	): Promise<any> {
		const movimiento = await this.movimientoService.update(
			id,
			movimientoUpdate,
		);
		return {
			statusCode: HttpStatus.OK,
			timestamp: new Date().toISOString(),
			message: 'Movimiento editado con éxito',
			movimiento: movimiento,
		};
	}

	@ApiOperation({
		summary: 'Elimina un movimiento por ID',
	})
	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number): Promise<any> {
		await this.movimientoService.remove(id);
		return {
			statusCode: HttpStatus.OK,
			timestamp: new Date().toISOString(),
			message: 'Movimiento eliminado con éxito',
		};
	}
}
