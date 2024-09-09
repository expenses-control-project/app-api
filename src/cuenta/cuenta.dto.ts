import {Type} from 'class-transformer';
import {
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	MinLength,
} from 'class-validator';

export class CreateCuentaDto {
	@IsString({message: 'El nombre debe ser un string'})
	@MinLength(4, {message: 'El nombre debe tener al menos 4 caracteres'})
	nombre: string;

	@IsNumber({}, {message: 'El saldo debe ser un número'})
	@IsOptional()
	saldo: number = 0;

	@IsString({message: 'La descripción debe ser un string'})
	@IsOptional()
	descripcion?: string;
}

export class UpdateCuentaDto {
	@IsNumber({}, {message: 'El idCuenta debe ser un número'})
	@IsNotEmpty({message: 'El idCuenta no puede estar vacío'})
	idCuenta: number;

	@IsString({message: 'El nombre debe ser un string'})
	@MinLength(4, {message: 'El nombre debe tener al menos 4 caracteres'})
	@IsOptional()
	nombre?: string;

	@IsNumber({}, {message: 'El saldo debe ser un número'})
	@IsNotEmpty({message: 'El saldo no puede estar vacío'})
	@IsOptional()
	saldo?: number;

	@IsString({message: 'La descripción debe ser un string'})
	@IsOptional()
	descripcion?: string;
}
