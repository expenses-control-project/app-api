import {AuthTokenResult, IuseToken} from 'src/auth/auth.interface';
import * as jwt from 'jsonwebtoken';

export const useToken = (token: string): IuseToken | string => {
	try {
		const decode = jwt.decode(token) as AuthTokenResult;

		const currenDate = new Date();
		const expiresDate = new Date(decode.exp);

		return {
			sub: decode.sub,
			role: decode.role,
			isExpired: +expiresDate <= +currenDate / 1000,
		};
	} catch (error) {
		return 'Token invalido';
	}
};
