import {Exclude} from 'class-transformer';
import {
	IsEmail,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	IsStrongPassword,
	MaxLength,
	MinLength,
} from 'class-validator';

export class CreateUsuarioDto {
	@IsNotEmpty({message: 'El nombre no puede estar vacío'})
	@IsString({message: 'El nombre debe ser un texto válido'})
	nombre: string;

	@IsNotEmpty({message: 'El apellido no puede estar vacío'})
	@IsString({message: 'El apellido debe ser un texto válido'})
	apellido: string;

	@IsNotEmpty({message: 'La edad no puede estar vacía'})
	@IsNumber({}, {message: 'La edad debe ser un número'})
	edad: number;

	@IsString({message: 'El email debe ser un texto válido'})
	@IsEmail({}, {message: 'El email debe tener un formato válido'})
	email: string;

	@IsNotEmpty({message: 'El usuario no puede estar vacío'})
	@MinLength(4, {message: 'El usuario debe tener al menos 4 caracteres'})
	@MaxLength(50, {message: 'El usuario no puede tener más de 50 caracteres'})
	usuario: string;

	@IsNotEmpty({message: 'La contraseña no puede estar vacía'})
	@IsString({message: 'La contraseña debe ser un texto válido'})
	@IsStrongPassword(
		{
			minLength: 8,
			minLowercase: 1,
			minUppercase: 1,
			minNumbers: 1,
		},
		{
			message:
				'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula y un número',
		},
	)
	password: string;
}

export class UpdateUsuarioDto {
	@IsNumber({}, {message: 'El idUsuario debe ser un número'})
	@IsNotEmpty({message: 'El idUsuario no puede estar vacío'})
	idUsuario: number;

	@IsNotEmpty({message: 'El nombre no puede estar vacío'})
	@IsString({message: 'El nombre debe ser un texto válido'})
	@IsOptional()
	nombre?: string;

	@IsNotEmpty({message: 'El apellido no puede estar vacío'})
	@IsString({message: 'El apellido debe ser un texto válido'})
	@IsOptional()
	apellido?: string;

	@IsNotEmpty({message: 'La edad no puede estar vacía'})
	@IsNumber({}, {message: 'La edad debe ser un número'})
	@IsOptional()
	edad?: number;

	@IsString({message: 'El email debe ser un texto válido'})
	@IsEmail({}, {message: 'El email debe tener un formato válido'})
	@IsOptional()
	email?: string;

	@IsNotEmpty({message: 'El usuario no puede estar vacío'})
	@MinLength(4, {message: 'El usuario debe tener al menos 4 caracteres'})
	@MaxLength(50, {message: 'El usuario no puede tener más de 50 caracteres'})
	@IsOptional()
	usuario?: string;

	@IsNotEmpty({message: 'La contraseña no puede estar vacía'})
	@IsString({message: 'La contraseña debe ser un texto válido'})
	password: string;
}

export class ResponseUsuarioDto {
	idUsuario: number;
	nombre: string;
	apellido: string;
	edad: number;
	email: string;
	usuario: string;

	@Exclude()
	password: string;

	role: string;

	@Exclude()
	acceso: string;
}
