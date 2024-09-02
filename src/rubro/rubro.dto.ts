import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class CreateRubroDto {
	@IsString({message: 'El nombre del rubro debe ser un string'})
	@IsNotEmpty({message: 'El nombre del rubro no puede estar vacío'})
	nombreRubro: string;

	@IsNumber({}, {message: 'El total del rubro debe ser un número'})
	@IsNotEmpty({message: 'El total del rubro no puede estar vacío'})
	total: number;
}
export class UpdateRubroDto {
	@IsString({message: 'El nombre del rubro debe ser un string'})
	@IsNotEmpty({message: 'El nombre del rubro no puede estar vacío'})
	nombreRubro: string;

	@IsNumber({}, {message: 'El total del rubro debe ser un número'})
	@IsNotEmpty({message: 'El total del rubro no puede estar vacío'})
	total: number;
}
