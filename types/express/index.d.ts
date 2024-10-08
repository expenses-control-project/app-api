declare namespace Express {
	interface Request {
		idUsuario: number;
		roleUsuario: string;
		accessLevel: string;
	}
}
