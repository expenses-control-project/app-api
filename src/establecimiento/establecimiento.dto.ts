import {Rubros} from '@prisma/client';
import {
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	MinLength,
} from 'class-validator';

export class CreateEstablecimientoDto {
	@IsString({message: 'El nombre debe ser un string'})
	@MinLength(4, {message: 'El nombre debe tener al menos 4 caracteres'})
	nombreEstablecimiento: string;

	@IsNumber({}, {message: 'El ID del rubro debe ser un número'})
	@IsNotEmpty({message: 'El rubro id no puede estar vacío'})
	rubroId: number;
}
export class UpdateEstablecimientoDto {
	@IsNumber({}, {message: 'El idEstablecimiento debe ser un número'})
	@IsNotEmpty({message: 'El idEstablecimiento no puede estar vacío'})
	idEstablecimiento: number;

	@IsString({message: 'El nombre debe ser un string'})
	@MinLength(4, {message: 'El nombre debe tener al menos 4 caracteres'})
	@IsOptional()
	nombreEstablecimiento?: string;

	@IsNumber({}, {message: 'El ID del rubro debe ser un número'})
	@IsOptional()
	rubroId?: number;
}
