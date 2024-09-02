import {IsNotEmpty, IsNumber} from 'class-validator';

export class CreateIngresoDto {
	@IsNumber({}, {message: 'El saldo debe ser un número'})
	@IsNotEmpty({message: 'El saldo no puede estar vacío'})
	saldo: number;

	@IsNumber({}, {message: 'El ID de la cuenta debe ser un número'})
	@IsNotEmpty({message: 'La cuenta id no puede estar vacío'})
	cuentaId: number;
}
export class UpdateIngresoDto {
	@IsNumber({}, {message: 'El saldo debe ser un número'})
	@IsNotEmpty({message: 'El saldo no puede estar vacío'})
	saldo: number;

	@IsNumber({}, {message: 'El ID de la cuenta debe ser un número'})
	@IsNotEmpty({message: 'La cuenta id no puede estar vacío'})
	cuentaId: number;
}
