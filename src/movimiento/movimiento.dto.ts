import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class CreateMovimientoDto {
	@IsString({message: 'El nombre del movimiento debe ser un string'})
	@IsNotEmpty({message: 'El nombre del movmiento no puede estar vacío'})
	nombreMovimiento: string;

	esGasto: boolean;

	esIngreso: boolean;

	@IsNumber({}, {message: 'El ID del ingreso debe ser un número'})
	@IsNotEmpty({message: 'El ingreso id no puede estar vacío'})
	ingresoId: number;

	@IsNumber({}, {message: 'El ID del gasto debe ser un número'})
	@IsNotEmpty({message: 'El gasto id no puede estar vacío'})
	gastoId: number;
}
export class UpdateMovimientoDto {
	@IsString({message: 'El nombre del movimiento debe ser un string'})
	@IsNotEmpty({message: 'El nombre del movmiento no puede estar vacío'})
	nombreMovimiento: string;

	esGasto: boolean;

	esIngreso: boolean;

	@IsNumber({}, {message: 'El ID del ingreso debe ser un número'})
	@IsNotEmpty({message: 'El ingreso id no puede estar vacío'})
	ingresoId: number;

	@IsNumber({}, {message: 'El ID del gasto debe ser un número'})
	@IsNotEmpty({message: 'El gasto id no puede estar vacío'})
	gastoId: number;
}
