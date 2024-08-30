import {IsNotEmpty, IsNumber, IsString, MinLength} from 'class-validator';

export class CreateCuentaDto {
	@IsString()
	@MinLength(4)
	nombre: string;
	@IsNumber()
	@IsNotEmpty()
	saldo: number;
}
export class UpdateCuentaDto {
	nombre: string;
	saldo: number;
}
export class AllCuentaDto {}
export class ByIdCuentaDto {}
