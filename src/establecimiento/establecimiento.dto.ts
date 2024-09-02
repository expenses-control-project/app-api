import {Rubros} from '@prisma/client';
import {IsNotEmpty, IsNumber, IsString, MinLength} from 'class-validator';

export class CreateEstablecimientoDto {
	@IsString({message: 'El nombre debe ser un string'})
	@MinLength(4, {message: 'El nombre debe tener al menos 4 caracteres'})
	nombreEstablecimiento: string;

	@IsNumber({}, {message: 'El ID del rubro debe ser un número'})
	@IsNotEmpty({message: 'El rubro id no puede estar vacío'})
	rubroId: number;
}
export class UpdateEstablecimientoDto {
	@IsString({message: 'El nombre debe ser un string'})
	@MinLength(4, {message: 'El nombre debe tener al menos 4 caracteres'})
	nombreEstablecimiento: string;

	@IsNumber({}, {message: 'El ID del rubro debe ser un número'})
	@IsNotEmpty({message: 'El rubro id no puede estar vacío'})
	rubroId: number;
}
