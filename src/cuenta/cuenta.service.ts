import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from 'src/config/prisma.service';
import {CreateCuentaDto, UpdateCuentaDto} from './cuenta.dto';

@Injectable()
export class CuentaService {
	constructor(private prisma: PrismaService) {}

	async create(cuentaCreate: CreateCuentaDto): Promise<any> {
		try {
			return await this.prisma.cuentas.create({
				data: {
					nombre: cuentaCreate.nombre,
					saldo: cuentaCreate.saldo,
					gasto: {
						connect: {idGasto: cuentaCreate.gastoId},
					},
				},
			});
		} catch (error) {
			throw new NotFoundException(`No se pudo crear la cuenta`);
		}
	}

	async findAll(): Promise<any> {
		try {
			return await this.prisma.cuentas.findMany();
		} catch (error) {
			return new NotFoundException(`No se encontraron cuentas`);
		}
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

	async update(id: number, cuentaUpdate: UpdateCuentaDto): Promise<any> {
		try {
			return await this.prisma.cuentas.update({
				where: {idCuenta: id},
				data: {
					nombre: cuentaUpdate.nombre,
					saldo: cuentaUpdate.saldo,
					gasto: {
						connect: {idGasto: cuentaUpdate.gastoId},
					},
				},
			});
		} catch (error) {
			throw new NotFoundException(
				`No se puede actualizar la cuenta con el id: ${id}`,
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
