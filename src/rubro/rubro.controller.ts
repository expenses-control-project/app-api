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
import {RubroService} from './rubro.service';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {CreateRubroDto, UpdateRubroDto} from './rubro.dto';

@ApiTags('rubro')
@Controller('rubro')
export class RubroController {
	constructor(private readonly rubroService: RubroService) {}

	@ApiOperation({
		summary: 'Crea un rubro ',
	})
	@Post()
	async create(@Body() rubroCreate: CreateRubroDto): Promise<any> {
		const rubro = await this.rubroService.create(rubroCreate);
		return {
			statusCode: HttpStatus.CREATED,
			timestamp: new Date().toISOString(),
			message: 'Rubro creado con éxito',
			rubro: rubro,
		};
	}

	@ApiOperation({
		summary: 'Obtiene todos los rubros',
	})
	@Get()
	async findAll(): Promise<any> {
		const rubro: [] = await this.rubroService.findAll();
		return {
			statusCode: HttpStatus.OK,
			timestamp: new Date().toISOString(),
			message: 'Rubros encontrados con éxito',
			rubro: rubro,
		};
	}

	@ApiOperation({
		summary: 'Obtiene rubros por ID',
	})
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
		const rubro = await this.rubroService.findOne(id);
		return {
			statusCode: HttpStatus.OK,
			timestamp: new Date().toISOString(),
			message: 'Rubro encontrado con éxito',
			rubro: rubro,
		};
	}

	@ApiOperation({
		summary: 'Edita los rubros',
	})
	@Patch(':id')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() rubroUpdate: UpdateRubroDto,
	): Promise<any> {
		const rubro = await this.rubroService.update(id, rubroUpdate);
		return {
			statusCode: HttpStatus.OK,
			timestamp: new Date().toISOString(),
			message: 'Rubro editado con éxito',
			rubro: rubro,
		};
	}

	@ApiOperation({
		summary: 'Elimina un rubro por ID',
	})
	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number): Promise<any> {
		await this.rubroService.remove(id);
		return {
			statusCode: HttpStatus.OK,
			timestamp: new Date().toISOString(),
			message: 'Rubro eliminado con éxito',
		};
	}
}
