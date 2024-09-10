import {
	IsDate,
	IsDateString,
	IsNotEmpty,
	IsNumber,
	IsOptional,
} from 'class-validator';

export class CreateIngresoDto {
	@IsNumber({}, {message: 'El saldo debe ser un número'})
	@IsNotEmpty({message: 'El saldo no puede estar vacío'})
	saldo: number;

	@IsDateString()
	@IsNotEmpty({message: 'La fecha no puede estar vacía'})
	fecha: string;

	@IsNumber({}, {message: 'El ID de la cuenta debe ser un número'})
	@IsNotEmpty({message: 'La cuenta id no puede estar vacío'})
	idCuenta: number;
}
export class UpdateIngresoDto {
	@IsNumber({}, {message: 'El idIngreso debe ser un número'})
	@IsNotEmpty({message: 'El idIngreso no puede estar vacío'})
	idIngreso: number;

	@IsNumber({}, {message: 'El saldo debe ser un número'})
	@IsNotEmpty({message: 'El saldo no puede estar vacío'})
	saldo: number;

	@IsDateString()
	@IsNotEmpty({message: 'La fecha no puede estar vacía'})
	fecha: string;

	@IsNumber({}, {message: 'El ID de la cuenta debe ser un número'})
	@IsNotEmpty({message: 'La cuenta id no puede estar vacío'})
	idCuenta: number;
}
