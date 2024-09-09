import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import {CreateGastoDto, UpdateGastoDto} from './gasto.dto';
import {PrismaService} from 'src/config/prisma.service';

@Injectable()
export class GastoService {
	constructor(private prisma: PrismaService) {}

	async create(gastoCreate: CreateGastoDto): Promise<any> {
		try {
			// Crea el gasto
			const nuevoGasto = await this.prisma.gastos.create({
				data: {
					monto: gastoCreate.monto,
					fecha: gastoCreate.fecha,
					descripcion: gastoCreate.descripcion || undefined,
					establecimiento: {
						connect: {
							idEstablecimiento: gastoCreate.establecimientoId,
						},
					},
				},
			});

			// Relaciona el gasto con las cuentas en la tabla CuentasGastos
			for (const cuentaId of gastoCreate.cuentasIds) {
				await this.prisma.gastosCuentas.create({
					data: {
						idCuenta: cuentaId,
						idGasto: nuevoGasto.idGasto,
					},
				});
			}

			return nuevoGasto;
		} catch (error) {
			throw new NotFoundException('No se pudo crear el gasto');
		}
	}

	async findAll(): Promise<any> {
		try {
			return await this.prisma.gastos.findMany({
				include: {
					cuentaList: {
						include: {
							cuenta: true, // Incluye las cuentas asociadas
						},
					},
				},
			});
		} catch (error) {
			throw new NotFoundException(
				'No se encontraron relaciones entre cuentas y gastos',
			);
		}
	}

	async findOne(id: number): Promise<any> {
		const gasto = await this.prisma.gastos.findUnique({
			where: {idGasto: id},
			include: {
				establecimiento: true, // Incluye el establecimiento relacionado (opcional)
				cuentaList: {
					// Relación con la tabla asociativa
					include: {
						cuenta: true, // Incluye las cuentas asociadas
					},
				},
			},
		});

		if (!gasto) {
			throw new NotFoundException(
				`No se encontró el gasto con el id: ${id}`,
			);
		}

		return gasto;
	}

	async update(gastoUpdate: UpdateGastoDto): Promise<any> {
		try {
			const gastoActualizado = await this.prisma.gastos.update({
				where: {idGasto: gastoUpdate.idGasto},
				data: {
					monto: gastoUpdate.monto || undefined,
					fecha: gastoUpdate.fecha,
					establecimiento: gastoUpdate.establecimientoId
						? {
								connect: {
									idEstablecimiento:
										gastoUpdate.establecimientoId,
								},
							}
						: undefined,
				},
			});
			// Verfica que se  envían cuentas para debitar y actualiza la tabla asociativa
			if (gastoUpdate.cuentasIds && gastoUpdate.cuentasIds.length > 0) {
				// Primero eliminamos las relaciones existentes
				await this.prisma.gastosCuentas.deleteMany({
					where: {idGasto: gastoUpdate.idGasto},
				});

				// Creamos las nuevas relaciones en la tabla asociativa
				const nuevasRelaciones = gastoUpdate.cuentasIds.map(
					(idCuenta) => ({
						idCuenta,
						idGasto: gastoActualizado.idGasto,
					}),
				);

				await this.prisma.gastosCuentas.createMany({
					data: nuevasRelaciones,
				});
			}
			return gastoActualizado;
		} catch (error) {
			throw new NotFoundException(
				`No se puede actualizar el gasto con el id: ${gastoUpdate.idGasto}`,
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

	async debit(gastoUpdate: CreateGastoDto): Promise<any> {
		try {
			const cuentasActualizadas = [];

			for (const cuentaId of gastoUpdate.cuentasIds) {
				// Busca la cuenta por ID y verifica si existe
				const cuenta = await this.prisma.cuentas.findUnique({
					where: {idCuenta: cuentaId},
				});

				if (!cuenta) {
					throw new NotFoundException(
						`No se encontró la cuenta con el id: ${cuentaId}`,
					);
				}

				const nuevoSaldo = cuenta.saldo - gastoUpdate.monto;

				// Verifica si el saldo es suficiente
				if (nuevoSaldo < 0) {
					throw new BadRequestException(
						`Saldo insuficiente en la cuenta con ID: ${cuentaId}`,
					);
				}

				// Actualiza el saldo de la cuenta
				const cuentaActualizada = await this.prisma.cuentas.update({
					where: {idCuenta: cuentaId},
					data: {saldo: nuevoSaldo},
				});

				cuentasActualizadas.push(cuentaActualizada);
			}

			return cuentasActualizadas;
		} catch (error) {
			throw new NotFoundException(
				'No se pudo debitar de una o más cuentas',
			);
		}
	}
}
