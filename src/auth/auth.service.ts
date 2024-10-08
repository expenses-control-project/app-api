import {BadRequestException, Injectable} from '@nestjs/common';
import {UsuarioService} from 'src/usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {PrismaClientKnownRequestError} from '@prisma/client/runtime/library';
import {PayloadToken} from './auth.interface';
import {plainToInstance} from 'class-transformer';
import {ResponseAuthDto, ResponseAuthDtoSimple} from './auth.dto';
import {createHash} from 'crypto';

@Injectable()
export class AuthService {
	constructor(private readonly usuarioService: UsuarioService) {}

	async validarUsuario(usuario: string, password: string) {
		try {
			const usuarioPorNombreUsuario = await this.usuarioService.findBy({
				key: 'usuario',
				value: usuario,
			});

			const usuarioPorEmail = await this.usuarioService.findBy({
				key: 'email',
				value: usuario,
			});

			if (usuarioPorNombreUsuario) {
				const match = await bcrypt.compare(
					password,
					usuarioPorNombreUsuario.password,
				);
				if (match) return usuarioPorNombreUsuario;
			}
			if (usuarioPorEmail) {
				const match = await bcrypt.compare(
					password,
					usuarioPorEmail.password,
				);
				if (match) return usuarioPorEmail;
			}
		} catch (error) {
			if (
				error instanceof PrismaClientKnownRequestError &&
				error.code === 'P2002'
			) {
				throw new BadRequestException(
					'El email o el nombre de usuario no existen.',
				);
			} else {
				throw new BadRequestException(
					'No se pudo encontrar el usuario o email',
				);
			}
		}
	}

	async signJWT({
		payload,
		secret,
		expires,
	}: {
		payload: jwt.JwtPayload;
		secret: string;
		expires: number | string;
	}) {
		return jwt.sign(payload, secret, {expiresIn: expires});
	}

	async generateJWT(usuario: any): Promise<any> {
		const getUsuario = await this.usuarioService.findOneAuth(
			usuario.idUsuario,
		);

		const payload: PayloadToken = {
			role: getUsuario.role,
			sub: getUsuario.idUsuario,
		};

		return {
			accesToken: await this.signJWT({
				payload,
				secret: process.env.JWT_SECRET,
				expires: '1h',
			}),
			usuario: plainToInstance(ResponseAuthDto, getUsuario),
		};
	}

	async generateToken(usuario: any): Promise<any> {
		const getUsuario = await this.usuarioService.findOneAuth(
			usuario.idUsuario,
		);

		// Generar un hash basado en el usuario
		const token = await this.generateHashToken(
			getUsuario.email + process.env.SECRET_KEY,
		);

		return {
			accesToken: token,
			usuario: plainToInstance(ResponseAuthDtoSimple, getUsuario),
		};
	}

	async generateHashToken(data: string): Promise<string> {
		const hash = createHash('sha256').update(data).digest('hex');
		return hash;
	}
}
