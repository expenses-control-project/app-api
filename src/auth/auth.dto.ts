import {IsNotEmpty, IsString} from 'class-validator';
import {AuthBody} from './auth.interface';
import {Exclude} from 'class-transformer';

export class AuthDTO implements AuthBody {
	@IsNotEmpty({message: 'El usuario no puede estar vacío'})
	usuario: string;

	@IsNotEmpty({message: 'La contraseña no puede estar vacía'})
	@IsString({message: 'La contraseña debe ser un texto válido'})
	password: string;
}

export class ResponseAuthDto {
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
export class ResponseAuthDtoSimple {
	idUsuario: number;
	nombre: string;
	apellido: string;
	edad: number;
	email: string;
	usuario: string;

	@Exclude()
	password: string;

	@Exclude()
	role: string;

	@Exclude()
	acceso: string;
}
