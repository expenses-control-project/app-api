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
import {UsuarioService} from './usuario.service';
import {
	CreateUsuarioDto,
	ResponseUsuarioDto,
	UpdateUsuarioDto,
} from './usuario.dto';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {PublicAcces} from 'src/auth/decorators/public.decorator';
import {AuthGuard} from 'src/auth/guards/auth.guard';
import {RolesGuard} from 'src/auth/guards/roles.guard';
import {Roles} from 'src/auth/decorators/roles.decorator';
import {AccessLevelGuard} from 'src/auth/guards/access-level.guard';
import {AccessLevel} from 'src/auth/decorators/acces-level.decorator';

@ApiTags('usuario')
@Controller('usuario')
@UseGuards(AuthGuard, RolesGuard)
export class UsuarioController {
	constructor(private readonly usuarioService: UsuarioService) {}

	@ApiOperation({
		summary: 'Crea un usuario',
	})
	@Post()
	async create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<any> {
		const usuario = await this.usuarioService.create(createUsuarioDto);
		return {
			statusCode: HttpStatus.CREATED,
			timestamp: new Date().toISOString(),
			message: 'Usuario creado con éxito',
			usuario: usuario,
		};
	}

	@ApiOperation({
		summary: 'Obtiene todos los usuarios',
	})
	@Roles('ADMIN')
	@Get()
	async findAll(): Promise<any> {
		const usuarios: ResponseUsuarioDto[] =
			await this.usuarioService.findAll();
		return {
			statusCode: HttpStatus.OK,
			timestamp: new Date().toISOString(),
			message: 'Usuarios encontrados con éxito',
			usuarios: usuarios,
		};
	}

	@ApiOperation({
		summary: 'Obtiene usuarios por ID',
	})
	@PublicAcces()
	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
		const usuario = await this.usuarioService.findOne(id);
		return {
			statusCode: HttpStatus.OK,
			timestamp: new Date().toISOString(),
			message: 'Usuario encontrado con éxito',
			usuario: usuario,
		};
	}

	@ApiOperation({
		summary: 'Edita los usuarios',
	})
	@Patch()
	async update(@Body() updateUsuarioDto: UpdateUsuarioDto): Promise<any> {
		const usuario = await this.usuarioService.update(updateUsuarioDto);
		return {
			statusCode: HttpStatus.OK,
			timestamp: new Date().toISOString(),
			message: 'Usuario editado con éxito',
			usuario: usuario,
		};
	}

	@ApiOperation({
		summary: 'Elimina un usuario por ID',
	})
	@Delete(':id')
	async remove(@Param('id', ParseIntPipe) id: number): Promise<any> {
		await this.usuarioService.remove(id);
		return {
			statusCode: HttpStatus.OK,
			timestamp: new Date().toISOString(),
			message: 'Usuario eliminado con éxito',
		};
	}
}
