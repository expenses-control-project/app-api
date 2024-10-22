import {
	Body,
	Controller,
	Post,
	UnauthorizedException,
	UseGuards,
} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthDTO} from './auth.dto';
import {PublicAcces} from './decorators/public.decorator';
import {AuthGuard} from './guards/auth.guard';
import {RolesGuard} from './guards/roles.guard';

@Controller('auth')
@UseGuards(AuthGuard, RolesGuard)
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@PublicAcces()
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
