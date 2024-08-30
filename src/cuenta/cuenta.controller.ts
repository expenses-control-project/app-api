import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpCode,
	ParseIntPipe,
	HttpStatus,
	HttpException,
	Res,
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
	async create(@Body() cuenta: CreateCuentaDto) {
		try {
			await this.cuentaService.create(cuenta);
			return {
				statusCode: HttpStatus.CREATED,
				message: 'Cuenta creada con éxito',
			};
		} catch (error) {
			throw new HttpException(
				`${error} Error al crear la cuenta`,
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	@ApiOperation({
		summary: 'Obtiene todas las cuentas',
	})
	@Get()
	async findAll() {
		try {
			await this.cuentaService.findAll();
			return {
				statusCode: HttpStatus.FOUND,
				message: 'Cuentas encontradas con éxito',
			};
		} catch (error) {
			throw new HttpException(
				`${error} Cuentas no encontradas`,
				HttpStatus.NOT_FOUND,
			);
		}
	}
	@ApiOperation({
		summary: 'Obtiene cuentas por ID',
	})
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number) {
		const cuenta = await this.cuentaService.findOne(id);
		if (!cuenta) {
			throw new HttpException(
				`Cuenta con el id: ${id} no encontrada`,
				HttpStatus.NOT_FOUND,
			);
		}
		return {
			statusCode: HttpStatus.FOUND,
			message: 'Cuenta encontrada con éxito',
		};
	}
	@ApiOperation({
		summary: 'Edita las cuentas',
	})
	@Patch(':id')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() cuenta: UpdateCuentaDto,
	) {
		try {
			await this.cuentaService.update(id, cuenta);
			return {
				statusCode: HttpStatus.OK,
				message: 'Cuenta editada con éxito',
			};
		} catch (error) {
			throw new HttpException(
				`${error} Al editar la cuenta con el id: ${id}`,
				HttpStatus.BAD_REQUEST,
			);
		}
	}
	@ApiOperation({
		summary: 'Elimina una cuenta por ID',
	})
	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number) {
		try {
			await this.cuentaService.remove(id);
			return {
				statusCode: HttpStatus.OK,
				message: 'Cuenta borrada con éxito',
			};
		} catch (error) {
			throw new HttpException(
				`${error} Al eliminar la cuenta con el id: ${id}`,
				HttpStatus.BAD_REQUEST,
			);
		}
	}
}
