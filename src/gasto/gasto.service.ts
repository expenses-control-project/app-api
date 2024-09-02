import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateGastoDto, UpdateGastoDto} from './gasto.dto';
import {PrismaService} from 'src/config/prisma.service';

@Injectable()
export class GastoService {
	constructor(private prisma: PrismaService) {}

	async create(gasto: CreateGastoDto): Promise<any> {
		try {
			return await this.prisma.gastos.create({
				data: {
					monto: gasto.monto,
					fecha: gasto.fecha,
					establecimiento: {
						connect: {idEstablecimiento: gasto.establecimientoId},
					},
				},
			});
		} catch (error) {
			throw new NotFoundException(`No se pudo crear el gasto`);
		}
	}

	async findAll(): Promise<any> {
		try {
			return await this.prisma.gastos.findMany();
		} catch (error) {
			return new NotFoundException(`No se encontraron gastos`);
		}
	}

	async findOne(id: number): Promise<any> {
		const gasto = await this.prisma.gastos.findUnique({
			where: {idGasto: id},
		});

		if (!gasto) {
			throw new NotFoundException(
				`No se encontró el gasto con el id: ${id}`,
			);
		}

		return gasto;
	}

	async update(id: number, gasto: UpdateGastoDto): Promise<any> {
		try {
			return await this.prisma.gastos.update({
				where: {idGasto: id},
				data: {
					monto: gasto.monto,
					fecha: gasto.fecha,
					establecimiento: {
						connect: {idEstablecimiento: gasto.establecimientoId},
					},
				},
			});
		} catch (error) {
			throw new NotFoundException(
				`No se puede actualizar el gasto con el id: ${id}`,
			);
		}
	}

	async remove(id: number): Promise<any> {
		try {
			return await this.prisma.gastos.delete({
				where: {idGasto: id},
			});
		} catch (error) {
			throw new NotFoundException(
				`No se puede eliminar el gasto con el id: ${id}`,
			);
		}
	}
}
