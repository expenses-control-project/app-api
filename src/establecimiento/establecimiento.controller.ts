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
	UseGuards,
} from '@nestjs/common';
import {EstablecimientoService} from './establecimiento.service';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {
	CreateEstablecimientoDto,
	UpdateEstablecimientoDto,
} from './establecimiento.dto';
import {AuthGuard} from 'src/auth/guards/auth.guard';
import {RolesGuard} from 'src/auth/guards/roles.guard';
import {Roles} from 'src/auth/decorators/roles.decorator';

@ApiTags('establecimiento')
@Controller('establecimiento')
@UseGuards(AuthGuard, RolesGuard)
export class EstablecimientoController {
	constructor(
		private readonly establecimientoService: EstablecimientoService,
	) {}
	@ApiOperation({
		summary: 'Crea un establecimiento',
	})
	@Roles('USUARIO')
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
	@Roles('USUARIO')
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
	@Roles('USUARIO')
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
	@Roles('USUARIO')
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
	@Roles('USUARIO')
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
