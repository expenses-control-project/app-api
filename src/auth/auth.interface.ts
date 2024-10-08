import {ROLES} from '@prisma/client';

export interface PayloadToken {
	sub: string;
	role: ROLES;
}

export interface AuthBody {
	usuario: string;
	password: string;
}

export interface AuthTokenResult {
	role: string;
	sub: string;
	iat: number;
	exp: number;
}

export interface IuseToken {
	role: string;
	sub: string;
	isExpired: boolean;
}
