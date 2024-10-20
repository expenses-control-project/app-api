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
	UseGuards,
} from '@nestjs/common';
import {CuentaService} from './cuenta.service';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {CreateCuentaDto, UpdateCuentaDto} from './cuenta.dto';
import {Roles} from 'src/auth/decorators/roles.decorator';
import {AuthGuard} from 'src/auth/guards/auth.guard';
import {RolesGuard} from 'src/auth/guards/roles.guard';

@ApiTags('cuenta')
@Controller('cuenta')
@UseGuards(AuthGuard, RolesGuard)
export class CuentaController {
	constructor(private readonly cuentaService: CuentaService) {}

	@ApiOperation({
		summary: 'Crea una cuenta ',
	})
	@Roles('USUARIO')
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
	@Roles('USUARIO')
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
	@Roles('USUARIO')
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
	@Roles('USUARIO')
	@Patch()
	async update(@Body() cuentaUpdate: UpdateCuentaDto): Promise<any> {
		const cuenta = await this.cuentaService.update(cuentaUpdate);
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
	@Roles('ADMIN')
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
