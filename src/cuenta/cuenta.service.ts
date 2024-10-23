import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import {PrismaService} from 'src/config/prisma.service';
import {CreateCuentaDto, UpdateCuentaDto} from './cuenta.dto';
import {PrismaClientKnownRequestError} from '@prisma/client/runtime/library';

@Injectable()
export class CuentaService {
	constructor(private prisma: PrismaService) {}

	async create(cuentaCreate: CreateCuentaDto): Promise<any> {
		try {
			return await this.prisma.cuentas.create({
				data: {
					nombre: cuentaCreate.nombre,
					saldo: cuentaCreate.saldo|| 0,
					descripcion: cuentaCreate.descripcion || undefined,
					tipoCuenta: cuentaCreate.tipoCuenta
				},
			});
		} catch (error) {
			if (
				error instanceof PrismaClientKnownRequestError &&
				error.code === 'P2002'
			) {
				throw new BadRequestException(
					'El nombre de la cuenta ya existe.',
				);
			} else {
				throw new NotFoundException(`No se pudo crear la cuenta`);
			}
		}
	}

	async findAll(): Promise<any> {
		const cuentas = await this.prisma.cuentas.findMany({
			orderBy: {
				idCuenta: 'asc'
			  },
		});

		if (cuentas.length === 0) {
			throw new NotFoundException(`No se encontraron cuentas`);
		}
		return cuentas;
	}

	async findOne(id: number): Promise<any> {
		const cuenta = await this.prisma.cuentas.findUnique({
			where: {idCuenta: id},
		});

		if (!cuenta) {
			throw new NotFoundException(
				`No se encontró la cuenta con el id: ${id}`,
			);
		}

		return cuenta;
	}

	async update(cuentaUpdate: UpdateCuentaDto): Promise<any> {
		try {
			return await this.prisma.cuentas.update({
				where: {idCuenta: cuentaUpdate.idCuenta},
				data: {
					nombre: cuentaUpdate.nombre || undefined,
					descripcion: cuentaUpdate.descripcion || undefined,
					saldo: cuentaUpdate.saldo || undefined,
					tipoCuenta: cuentaUpdate.tipoCuenta
				},
			});
		} catch (error) {
			throw new NotFoundException(
				`No se puede actualizar la cuenta con el id: ${cuentaUpdate.idCuenta}`,
			);
		}
	}

	async remove(id: number): Promise<any> {
		try {
			return await this.prisma.cuentas.delete({
				where: {idCuenta: id},
			});
		} catch (error) {
			throw new NotFoundException(
				`No se puede eliminar la cuenta con el id: ${id}`,
			);
		}
	}
}
