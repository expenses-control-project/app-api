import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {ACCES_LEVEL, ROLES} from '@prisma/client';
import {Observable} from 'rxjs';
import {
	ACCES_LEVEL_KEY,
	PUBLIC_KEY,
	ROLES_KEY,
} from '../decorators/key-decorator';
import {Request} from 'express';

@Injectable()
export class AccessLevelGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		// Endpoint Publico
		const isPublic = this.reflector.get<boolean>(
			PUBLIC_KEY,
			context.getHandler(),
		);
		if (isPublic) {
			return true;
		}
		// Roles
		const roles = this.reflector.get<Array<keyof typeof ROLES>>(
			ROLES_KEY,
			context.getHandler(),
		);
		// AccessLevel
		const accessLevels = this.reflector.get<
			Array<keyof typeof ACCES_LEVEL>
		>(ACCES_LEVEL_KEY, context.getHandler());

		const req = context.switchToHttp().getRequest<Request>();
		const {roleUsuario, accessLevel} = req;

		if (roleUsuario === ROLES.USUARIO) {
			return true;
		}

		// Si el usuario tiene el rol correcto
		const isRoleValid = roles.some((role) => role === roleUsuario);
		const isAccessValid = accessLevels.some(
			(level) => level === accessLevel,
		);

		if (!isRoleValid || !isAccessValid) {
			throw new UnauthorizedException(
				'No tienes permisos para esta operación',
			);
		}

		return true;
	}
}
