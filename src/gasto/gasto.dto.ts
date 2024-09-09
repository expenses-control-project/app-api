import {Type} from 'class-transformer';
import {
	IsDate,
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

	@IsDate({message: 'La fecha debe ser tipo date'})
	@IsNotEmpty({message: 'La fecha no puede estar vacía'})
	fecha: Date;

	@IsString({message: 'La descripción debe ser un string'})
	@IsOptional()
	descripcion?: string;

	@IsNumber({}, {message: 'El ID del establecimiento debe ser un número'})
	@IsNotEmpty({message: 'El establecimiento no puede estar vacío'})
	establecimientoId: number;

	@ValidateNested({each: true})
	@Type(() => Number)
	@IsNumber({}, {each: true, message: 'Cada ID de cuenta debe ser un número'})
	cuentasIds: number[]; // Array de IDs de cuentas a debitar
}
export class UpdateGastoDto {
	@IsNumber({}, {message: 'El idGasto debe ser un número'})
	@IsNotEmpty({message: 'El idGasto no puede estar vacío'})
	idGasto: number;

	@IsNumber({}, {message: 'El monto debe ser un número'})
	@IsNotEmpty({message: 'El monto no puede estar vacío'})
	@IsOptional()
	monto: number;

	@IsDate({message: 'La fecha debe ser tipo date'})
	@IsNotEmpty({message: 'La fecha no puede estar vacía'})
	@IsOptional()
	fecha: Date;

	@IsNumber({}, {message: 'El ID del establecimiento debe ser un número'})
	@IsNotEmpty({message: 'El establecimiento no puede estar vacío'})
	@IsOptional()
	establecimientoId: number;

	@ValidateNested({each: true})
	@Type(() => Number)
	@IsNumber({}, {each: true, message: 'Cada ID de cuenta debe ser un número'})
	cuentasIds: number[]; // Array de IDs de cuentas a debitar
}
