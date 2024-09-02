import {Establecimientos} from '@prisma/client';
import {IsDate, IsNotEmpty, IsNumber} from 'class-validator';

export class CreateGastoDto {
	@IsNumber({}, {message: 'El monto debe ser un número'})
	@IsNotEmpty({message: 'El monto no puede estar vacío'})
	monto: number;

	@IsDate({message: 'La fecha debe ser tipo date'})
	@IsNotEmpty({message: 'La fecha no puede estar vacía'})
	fecha: Date;

	@IsNumber({}, {message: 'El ID del establecimiento debe ser un número'})
	@IsNotEmpty({message: 'El establecimiento no puede estar vacío'})
	establecimientoId: number;
}
export class UpdateGastoDto {
	@IsNumber({}, {message: 'El monto debe ser un número'})
	@IsNotEmpty({message: 'El monto no puede estar vacío'})
	monto: number;

	@IsDate({message: 'La fecha debe ser tipo date'})
	@IsNotEmpty({message: 'La fecha no puede estar vacía'})
	fecha: Date;

	@IsNumber({}, {message: 'El ID del establecimiento debe ser un número'})
	@IsNotEmpty({message: 'El establecimiento no puede estar vacío'})
	establecimientoId: number;
}
