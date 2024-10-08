import {Body, Controller, Post, UnauthorizedException} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthDTO} from './auth.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(@Body() {usuario, password}: AuthDTO): Promise<any> {
		const userValidate = await this.authService.validarUsuario(
			usuario,
			password,
		);

		if (!userValidate) {
			throw new UnauthorizedException('Datos incorrectos');
		}

		return await this.authService.generateJWT(userValidate);
	}
	@Post('login-simple')
	async loginSimple(@Body() {usuario, password}: AuthDTO): Promise<any> {
		const userValidate = await this.authService.validarUsuario(
			usuario,
			password,
		);

		if (!userValidate) {
			throw new UnauthorizedException('Datos incorrectos');
		}

		return await this.authService.generateToken(userValidate);
	}
}
