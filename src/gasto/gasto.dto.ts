import {Transform, Type} from 'class-transformer';
import {
	IsDate,
	IsDateString,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';

export class CreateGastoDto {
	@IsNumber({}, {message: 'El monto debe ser un número'})
	@IsNotEmpty({message: 'El monto no puede estar vacío'})
	monto: number;

	@IsDateString()
	@IsNotEmpty({message: 'La fecha no puede estar vacía'})
	fecha: string;

	@IsString({message: 'La descripción debe ser un string'})
	@IsOptional()
	descripcion?: string;

	@IsNumber({}, {message: 'El ID del establecimiento debe ser un número'})
	@IsNotEmpty({message: 'El establecimiento no puede estar vacío'})
	idEstablecimiento: number;

	@Type(() => Number)
	@IsNumber({}, {each: true, message: 'Cada ID de cuenta debe ser un número'})
	@Transform(({value}) => (typeof value === 'number' ? [value] : value)) // Convertir a array solo si es un número
	idsCuentas: number[]; // Array de IDs de cuentas a debitar
}
export class UpdateGastoDto {
	@IsNumber({}, {message: 'El idGasto debe ser un número'})
	@IsNotEmpty({message: 'El idGasto no puede estar vacío'})
	idGasto: number;

	@IsNumber({}, {message: 'El monto debe ser un número'})
	@IsNotEmpty({message: 'El monto no puede estar vacío'})
	@IsOptional()
	monto: number;

	@IsDateString()
	@IsNotEmpty({message: 'La fecha no puede estar vacía'})
	fecha: string;

	@IsNumber({}, {message: 'El ID del establecimiento debe ser un número'})
	@IsNotEmpty({message: 'El establecimiento no puede estar vacío'})
	idEstablecimiento: number;

	@Type(() => Number)
	@IsNumber({}, {each: true, message: 'Cada ID de cuenta debe ser un número'})
	@Transform(({value}) => (typeof value === 'number' ? [value] : value)) // Convertir a array solo si es un número
	idsCuentas: number[]; // Array de IDs de cuentas a debitar
}
