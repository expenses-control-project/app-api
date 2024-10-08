import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {Request} from 'express';
import {useToken} from 'src/auth/use.token';
import {PUBLIC_KEY} from 'src/auth/decorators/key-decorator';
import {UsuarioService} from 'src/usuario/usuario.service';
import {IuseToken} from '../auth.interface';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly usuarioService: UsuarioService,
		private readonly reflector: Reflector,
	) {}

	async canActivate(context: ExecutionContext) {
		const isPublic = this.reflector.get<boolean>(
			PUBLIC_KEY,
			context.getHandler(),
		);
		if (isPublic) {
			return true;
		}
		const req = context.switchToHttp().getRequest<Request>();

		const token = req.headers['expenses-control-jwt'];

		if (!token || Array.isArray(token)) {
			throw new UnauthorizedException('Token invalido o no existe');
		}

		const manageToken: IuseToken | string = useToken(token);

		if (typeof manageToken === 'string') {
			throw new UnauthorizedException(manageToken);
		}

		if (manageToken.isExpired) {
			throw new UnauthorizedException('El token expiró');
		}

		const {sub} = manageToken;
		const usuario = await this.usuarioService.findOneAuth(+sub);

		if (!usuario) {
			throw new UnauthorizedException('Usuario invalido');
		}
		req.idUsuario = usuario.idUsuario;
		req.roleUsuario = usuario.role;
		req.accessLevel = usuario.acceso;
		return true;
	}
}
