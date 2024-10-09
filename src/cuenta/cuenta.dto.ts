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

	@IsString({message: 'La descripción debe ser un string'})
	@IsOptional()
	descripcion?: string;

	@IsNumber({}, {message: 'EL saldo debe ser un numero'})
	@IsOptional()
	saldo?: number;

	@IsNumber({}, {message: 'El tipoCuenta debe ser un numero'})
	@IsOptional()
	tipoCuenta: number;
}

export class UpdateCuentaDto {
	@IsNumber({}, {message: 'El idCuenta debe ser un número'})
	@IsNotEmpty({message: 'El idCuenta no puede estar vacío'})
	idCuenta: number;

	@IsString({message: 'El nombre debe ser un string'})
	@MinLength(4, {message: 'El nombre debe tener al menos 4 caracteres'})
	@IsOptional()
	nombre?: string;

	@IsString({message: 'La descripción debe ser un string'})
	@IsOptional()
	descripcion?: string;

	@IsNumber({}, {message: 'EL saldo debe ser un numero'})
	@IsOptional()
	saldo?: number;
	
	@IsNumber({}, {message: 'El tipoCuenta debe ser un numero'})
	@IsOptional()
	tipoCuenta: number;
}
