import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {Observable} from 'rxjs';
import {PUBLIC_KEY, ROLES_KEY} from '../decorators/key-decorator';
import {ROLES} from '@prisma/client';
import {Request} from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const isPublic = this.reflector.get<boolean>(
			PUBLIC_KEY,
			context.getHandler(),
		);
		if (isPublic) {
			return true;
		}
		const roles = this.reflector.get<Array<keyof typeof ROLES>>(
			ROLES_KEY,
			context.getHandler(),
		);

		const req = context.switchToHttp().getRequest<Request>();

		const {roleUsuario} = req;

		if (roleUsuario === ROLES.ADMIN) {
			return true;
		}

		const isAuth = roles.some((role) => role === roleUsuario);

		if (!isAuth) {
			throw new UnauthorizedException(
				'No tienes permisos para esta operacion ',
			);
		}

		return true;
	}
}
