import {Injectable, NotFoundException} from '@nestjs/common';
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
			return new NotFoundException(`No se encontraron ingresos`);
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

	async update(id: number, ingresoUpdate: UpdateIngresoDto): Promise<any> {
		try {
			return await this.prisma.ingresos.update({
				where: {idIngreso: id},
				data: {
					saldo: ingresoUpdate.saldo,
					cuenta: {
						connect: {idCuenta: ingresoUpdate.cuentaId},
					},
				},
			});
		} catch (error) {
			throw new NotFoundException(
				`No se puede actualizar el ingreso con el id: ${id}`,
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
}
