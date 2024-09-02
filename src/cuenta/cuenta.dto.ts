import {IsNotEmpty, IsNumber, IsString, MinLength} from 'class-validator';

export class CreateCuentaDto {
	@IsString({message: 'El nombre debe ser un string'})
	@MinLength(4, {message: 'El nombre debe tener al menos 4 caracteres'})
	nombre: string;

	@IsNumber({}, {message: 'El saldo debe ser un número'})
	@IsNotEmpty({message: 'El saldo no puede estar vacío'})
	saldo: number;

	@IsNumber({}, {message: 'El ID del gasto debe ser un número'})
	@IsNotEmpty({message: 'El gasto id no puede estar vacío'})
	gastoId: number;
}
export class UpdateCuentaDto {
	@IsString({message: 'El nombre debe ser un string'})
	@MinLength(4, {message: 'El nombre debe tener al menos 4 caracteres'})
	nombre: string;

	@IsNumber({}, {message: 'El saldo debe ser un número'})
	@IsNotEmpty({message: 'El saldo no puede estar vacío'})
	saldo: number;

	@IsNumber({}, {message: 'El ID del gasto debe ser un número'})
	@IsNotEmpty({message: 'El gasto id no puede estar vacío'})
	gastoId: number;
}
