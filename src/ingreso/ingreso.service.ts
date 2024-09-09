import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import {PrismaService} from 'src/config/prisma.service';
import {CreateIngresoDto, UpdateIngresoDto} from './ingreso.dto';

@Injectable()
export class IngresoService {
	constructor(private prisma: PrismaService) {}

	async create(ingresoCreate: CreateIngresoDto): Promise<any> {
		try {
			return await this.prisma.ingresos.create({
				data: {
					saldo: ingresoCreate.saldo,
					fecha: ingresoCreate.fecha,
					cuenta: {
						connect: {idCuenta: ingresoCreate.cuentaId},
					},
				},
			});
		} catch (error) {
			throw new NotFoundException(
				`No se pudo crear el ingreso correctamente`,
			);
		}
	}

	async findAll(): Promise<any> {
		try {
			return await this.prisma.ingresos.findMany();
		} catch (error) {
			throw new NotFoundException(`No se encontraron ingresos`);
		}
	}

	async findOne(id: number): Promise<any> {
		const ingreso = await this.prisma.ingresos.findUnique({
			where: {idIngreso: id},
		});

		if (!ingreso) {
			throw new NotFoundException(
				`No se encontró el ingreso con el id: ${id}`,
			);
		}

		return ingreso;
	}

	async update(ingresoUpdate: UpdateIngresoDto): Promise<any> {
		try {
			return await this.prisma.ingresos.update({
				where: {idIngreso: ingresoUpdate.idIngreso},
				data: {
					saldo: ingresoUpdate.saldo || undefined,
					fecha: ingresoUpdate.fecha || undefined,
					cuenta: ingresoUpdate.cuentaId
						? {
								connect: {idCuenta: ingresoUpdate.cuentaId},
							}
						: undefined,
				},
			});
		} catch (error) {
			throw new NotFoundException(
				`No se puede actualizar el ingreso con el id: ${ingresoUpdate.idIngreso}`,
			);
		}
	}

	async remove(id: number): Promise<any> {
		try {
			return await this.prisma.ingresos.delete({
				where: {idIngreso: id},
			});
		} catch (error) {
			throw new NotFoundException(
				`No se puede eliminar el ingreso con el id: ${id}`,
			);
		}
	}

	async add(ingresoCreate: CreateIngresoDto): Promise<any> {
		try {
			// Busca la cuenta por ID y verifica si existe
			const cuenta = await this.prisma.cuentas.findUnique({
				where: {idCuenta: ingresoCreate.cuentaId},
			});

			if (!cuenta) {
				throw new NotFoundException(
					`No se encontró la cuenta con el id: ${ingresoCreate.cuentaId}`,
				);
			}

			const nuevoSaldo = (cuenta.saldo += ingresoCreate.saldo);

			// Actualiza el saldo nuevo de la cuenta en la base de datos
			const cuentaActualizada = await this.prisma.cuentas.update({
				where: {idCuenta: ingresoCreate.cuentaId},
				data: {saldo: nuevoSaldo},
			});
			return cuentaActualizada;
		} catch (error) {
			throw new NotFoundException(
				`No se puede debitar de la cuenta con el id: ${ingresoCreate.cuentaId}`,
			);
		}
	}
}
