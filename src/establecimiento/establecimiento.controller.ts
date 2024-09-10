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
import {EstablecimientoService} from './establecimiento.service';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {
	CreateEstablecimientoDto,
	UpdateEstablecimientoDto,
} from './establecimiento.dto';

@ApiTags('establecimiento')
@Controller('establecimiento')
export class EstablecimientoController {
	constructor(
		private readonly establecimientoService: EstablecimientoService,
	) {}
	@ApiOperation({
		summary: 'Crea un establecimiento',
	})
	@Post()
	async create(
		@Body() establecimientoCreate: CreateEstablecimientoDto,
	): Promise<any> {
		const establecimiento = await this.establecimientoService.create(
			establecimientoCreate,
		);
		return {
			statusCode: HttpStatus.CREATED,
			timestamp: new Date().toISOString(),
			message: 'Establecimiento creado con éxito',
			establecimiento: establecimiento,
		};
	}

	@ApiOperation({
		summary: 'Obtiene todos los establecimientos',
	})
	@Get()
	async findAll(): Promise<any> {
		const establecimiento: [] = await this.establecimientoService.findAll();
		return {
			statusCode: HttpStatus.OK,
			timestamp: new Date().toISOString(),
			message: 'Establecimientos encontrados con éxito',
			establecimiento: establecimiento,
		};
	}

	@ApiOperation({
		summary: 'Obtiene establecimientos por ID',
	})
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
		const establecimiento = await this.establecimientoService.findOne(id);
		return {
			statusCode: HttpStatus.OK,
			timestamp: new Date().toISOString(),
			message: 'Establecimiento encontrado con éxito',
			establecimiento: establecimiento,
		};
	}

	@ApiOperation({
		summary: 'Edita los establecimientos',
	})
	@Patch()
	async update(
		@Body() establecimientoUpdate: UpdateEstablecimientoDto,
	): Promise<any> {
		const establecimiento = await this.establecimientoService.update(
			establecimientoUpdate,
		);
		return {
			statusCode: HttpStatus.OK,
			timestamp: new Date().toISOString(),
			message: 'Establecimiento editado con éxito',
			establecimiento: establecimiento,
		};
	}

	@ApiOperation({
		summary: 'Elimina un establecimiento por ID',
	})
	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number): Promise<any> {
		await this.establecimientoService.remove(id);
		return {
			statusCode: HttpStatus.OK,
			timestamp: new Date().toISOString(),
			message: 'Establecimiento eliminado con éxito',
		};
	}
}
