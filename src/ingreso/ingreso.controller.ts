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
import {IngresoService} from './ingreso.service';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {CreateIngresoDto, UpdateIngresoDto} from './ingreso.dto';

@ApiTags('ingreso')
@Controller('ingreso')
export class IngresoController {
	constructor(private readonly ingresoService: IngresoService) {}

	@ApiOperation({
		summary: 'Crea un ingreso ',
	})
	@Post()
	async create(@Body() ingresoCreate: CreateIngresoDto): Promise<any> {
		const ingreso = await this.ingresoService.create(ingresoCreate);
		const cuentaAdd = await this.ingresoService.add(ingreso);
		return {
			statusCode: HttpStatus.CREATED,
			timestamp: new Date().toISOString(),
			message: 'Ingreso creado con éxito',
			ingreso: ingreso,
			cuenta: cuentaAdd,
		};
	}

	@ApiOperation({
		summary: 'Obtiene todos los ingresos',
	})
	@Get()
	async findAll(): Promise<any> {
		const ingreso: [] = await this.ingresoService.findAll();
		return {
			statusCode: HttpStatus.OK,
			timestamp: new Date().toISOString(),
			message: 'Ingresos encontrados con éxito',
			ingreso: ingreso,
		};
	}

	@ApiOperation({
		summary: 'Obtiene ingresos por ID',
	})
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
		const ingreso = await this.ingresoService.findOne(id);
		return {
			statusCode: HttpStatus.OK,
			timestamp: new Date().toISOString(),
			message: 'Ingreso encontrado con éxito',
			ingreso: ingreso,
		};
	}

	@ApiOperation({
		summary: 'Edita los ingresos',
	})
	@Patch()
	async update(@Body() ingresoUpdate: UpdateIngresoDto): Promise<any> {
		const {ingreso, cuentaActualizada} =
			await this.ingresoService.update(ingresoUpdate);
		return {
			statusCode: HttpStatus.OK,
			timestamp: new Date().toISOString(),
			message: 'Ingreso editado con éxito',
			ingreso: ingreso,
			cuenta: cuentaActualizada,
		};
	}

	@ApiOperation({
		summary: 'Elimina un ingreso por ID',
	})
	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number): Promise<any> {
		await this.ingresoService.remove(id);
		return {
			statusCode: HttpStatus.OK,
			timestamp: new Date().toISOString(),
			message: 'Ingreso eliminado con éxito',
		};
	}
}
