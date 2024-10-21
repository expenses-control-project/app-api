import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import {PrismaService} from 'src/config/prisma.service';
import {
	CreateUsuarioDto,
	ResponseUsuarioDto,
	UpdateUsuarioDto,
	UpdateUsuarioPasswordDto,
} from './usuario.dto';
import {PrismaClientKnownRequestError} from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';
import {plainToInstance} from 'class-transformer';

@Injectable()
export class UsuarioService {
	constructor(private prisma: PrismaService) {}

	async create(createUsuarioDto: CreateUsuarioDto): Promise<any> {
		try {
			const password = await bcrypt.hash(
				createUsuarioDto.password,
				+process.env.HASH_SALT,
			);

			const usuario = await this.prisma.usuarios.create({
				data: {
					nombre: createUsuarioDto.nombre,
					apellido: createUsuarioDto.apellido,
					edad: createUsuarioDto.edad,
					email: createUsuarioDto.email,
					usuario: createUsuarioDto.usuario,
					password: password,
				},
			});
			return plainToInstance(ResponseUsuarioDto, usuario);
		} catch (error) {
			if (
				error instanceof PrismaClientKnownRequestError &&
				error.code === 'P2002'
			) {
				throw new BadRequestException(
					'El email o el nombre de usuario ya existe.',
				);
			} else {
				throw new BadRequestException({
					message: 'No se pudo crear el usuario',
					error: error,
				});
			}
		}
	}

	async findAll(): Promise<any> {
		const usuarios = await this.prisma.usuarios.findMany();

		if (usuarios.length === 0) {
			throw new NotFoundException(`No se encontraron usuarios`);
		}
		return plainToInstance(ResponseUsuarioDto, usuarios);
	}

	async findOne(id: number): Promise<any> {
		const usuario = await this.prisma.usuarios.findUnique({
			where: {idUsuario: id},
		});

		if (!usuario) {
			throw new NotFoundException(
				`No se encontró el usuario con el id: ${id}`,
			);
		}
		return plainToInstance(ResponseUsuarioDto, usuario);
	}

	async findOneAuth(id: number): Promise<any> {
		const usuario = await this.prisma.usuarios.findUnique({
			where: {idUsuario: id},
		});

		if (!usuario) {
			throw new NotFoundException(
				`No se encontró el usuario con el id: ${id}`,
			);
		}
		return usuario;
	}

	async updatePassword(
		updateUsuarioPasswordDto: UpdateUsuarioPasswordDto,
	): Promise<void> {
		try {
			// Encuentra el usuario
			const usuario = await this.prisma.usuarios.findUnique({
				where: {idUsuario: updateUsuarioPasswordDto.idUsuario},
			});

			if (!usuario) {
				throw new NotFoundException(
					`Usuario con id ${updateUsuarioPasswordDto.idUsuario} no encontrado.`,
				);
			}

			// Comprueba si viene la nueva y la vieja password en el body
			if (
				updateUsuarioPasswordDto.password &&
				updateUsuarioPasswordDto.passwordOld
			) {
				if (
					updateUsuarioPasswordDto.password ==
					updateUsuarioPasswordDto.passwordOld
				) {
					throw new BadRequestException(
						'Las contraseñas proporcionadas no pueden ser iguales.',
					);
				}
				// compara las contraseñas
				const isMatch = await bcrypt.compare(
					updateUsuarioPasswordDto.passwordOld,
					usuario.password,
				);

				if (!isMatch) {
					throw new BadRequestException(
						'La contraseña proporcionada no coincide con la almacenada.',
					);
				}

				// encripta la nueva contraseña
				const hashedPassword = await bcrypt.hash(
					updateUsuarioPasswordDto.password,
					+process.env.HASH_SALT,
				);

				updateUsuarioPasswordDto.password = hashedPassword;

				await this.prisma.usuarios.update({
					where: {idUsuario: updateUsuarioPasswordDto.idUsuario},
					data: {
						password: updateUsuarioPasswordDto.password,
					},
				});
			}
		} catch (error) {
			throw error;
		}
	}

	async update(updateUsuarioDto: UpdateUsuarioDto): Promise<any> {
		try {
			// Encuentra el usuario
			const usuario = await this.prisma.usuarios.findUnique({
				where: {idUsuario: updateUsuarioDto.idUsuario},
			});

			if (!usuario) {
				throw new NotFoundException(
					`Usuario con id ${updateUsuarioDto.idUsuario} no encontrado.`,
				);
			}

			const updatedUsuario = await this.prisma.usuarios.update({
				where: {idUsuario: updateUsuarioDto.idUsuario},
				data: {
					nombre: updateUsuarioDto.nombre || undefined,
					apellido: updateUsuarioDto.apellido || undefined,
					edad: updateUsuarioDto.edad || undefined,
					email: updateUsuarioDto.email || undefined,
					usuario: updateUsuarioDto.usuario || undefined,
				},
			});

			return plainToInstance(ResponseUsuarioDto, updatedUsuario);
		} catch (error) {
			throw new NotFoundException(
				`No se puede actualizar el usuario con el id: ${updateUsuarioDto.idUsuario}`,
			);
		}
	}

	async remove(id: number): Promise<any> {
		try {
			return await this.prisma.usuarios.delete({
				where: {idUsuario: id},
			});
		} catch (error) {
			throw new NotFoundException(
				`No se puede eliminar el usuario con el id: ${id}`,
			);
		}
	}

	async findBy({key, value}: {key: keyof CreateUsuarioDto; value: any}) {
		try {
			const usuario = await this.prisma.usuarios.findFirst({
				where: {[key]: value},
				select: {
					idUsuario: true,
					nombre: true,
					apellido: true,
					edad: true,
					email: true,
					usuario: true,
					password: true,
					role: true,
					acceso: true,
				},
			});
			return usuario;
		} catch (error) {
			throw new NotFoundException(`No se puede encontrar el usuario`);
		}
	}
}
