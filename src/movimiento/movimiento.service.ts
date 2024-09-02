import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from 'src/config/prisma.service';
import {CreateMovimientoDto, UpdateMovimientoDto} from './movimiento.dto';

@Injectable()
export class MovimientoService {
	constructor(private prisma: PrismaService) {}

	async create(movimientoCreate: CreateMovimientoDto): Promise<any> {
		try {
			return await this.prisma.movimientos.create({
				data: {
					nombreMovimiento: movimientoCreate.nombreMovimiento,
					esGasto: movimientoCreate.esGasto,
					esIngreso: movimientoCreate.esIngreso,
					ingreso: {
						connect: {idIngreso: movimientoCreate.ingresoId},
					},
					gasto: {
						connect: {idGasto: movimientoCreate.gastoId},
					},
				},
			});
		} catch (error) {
			throw new NotFoundException(
				`No se pudo crear el movimiento correctamente`,
			);
		}
	}

	async findAll(): Promise<any> {
		try {
			return await this.prisma.movimientos.findMany();
		} catch (error) {
			return new NotFoundException(`No se encontraron movimientos`);
		}
	}

	async findOne(id: number): Promise<any> {
		const movimiento = await this.prisma.movimientos.findUnique({
			where: {idMovimiento: id},
		});

		if (!movimiento) {
			throw new NotFoundException(
				`No se encontró el movimiento con el id: ${id}`,
			);
		}

		return movimiento;
	}

	async update(
		id: number,
		movimientoUpdate: UpdateMovimientoDto,
	): Promise<any> {
		try {
			return await this.prisma.movimientos.update({
				where: {idMovimiento: id},
				data: {
					nombreMovimiento: movimientoUpdate.nombreMovimiento,
					esGasto: movimientoUpdate.esGasto,
					esIngreso: movimientoUpdate.esIngreso,
					ingreso: {
						connect: {idIngreso: movimientoUpdate.ingresoId},
					},
					gasto: {
						connect: {idGasto: movimientoUpdate.gastoId},
					},
				},
			});
		} catch (error) {
			throw new NotFoundException(
				`No se puede actualizar el movimiento con el id: ${id}`,
			);
		}
	}

	async remove(id: number): Promise<any> {
		try {
			return await this.prisma.movimientos.delete({
				where: {idMovimiento: id},
			});
		} catch (error) {
			throw new NotFoundException(
				`No se puede eliminar el movimiento con el id: ${id}`,
			);
		}
	}
}
