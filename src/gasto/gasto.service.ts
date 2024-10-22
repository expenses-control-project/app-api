import {
	BadRequestException,
	Injectable,
	NotFoundException,
	NotImplementedException,
} from '@nestjs/common';
import {CreateGastoDto, UpdateGastoDto} from './gasto.dto';
import {PrismaService} from 'src/config/prisma.service';

@Injectable()
export class GastoService {
	constructor(private prisma: PrismaService) {}

	async create(gastoCreate: CreateGastoDto): Promise<any> {
		try {
			// Inicia transaccion
			const result = await this.prisma.$transaction(async (prisma) => {
				// Crea el gasto
				const nuevoGasto = await prisma.gastos.create({
					data: {
						monto: gastoCreate.monto,
						fecha: new Date(gastoCreate.fecha),
						descripcion: gastoCreate.descripcion || undefined,
						establecimiento: {
							connect: {
								idEstablecimiento:
									gastoCreate.idEstablecimiento,
							},
						},
					},
				});

				const cuentasActualizadas = [];

				// Relaciona el gasto con las cuentas en la tabla GastosCuentas y actualiza el saldo
				for (const cuentaId of gastoCreate.idsCuentas) {
					// Busca la cuenta por ID y verifica si existe
					const cuenta = await prisma.cuentas.findUnique({
						where: {idCuenta: cuentaId},
					});

					if (!cuenta) {
						throw new NotFoundException(
							`No se encontró la cuenta con el id: ${cuentaId}`,
						);
					}

					// Verifica si el saldo es suficiente
					const nuevoSaldo = cuenta.saldo - gastoCreate.monto;
					if (nuevoSaldo < 0) {
						throw new BadRequestException(
							`Saldo insuficiente en la cuenta con ID: ${cuentaId}`,
						);
					}

					// Actualiza el saldo de la cuenta
					const cuentaActualizada = await prisma.cuentas.update({
						where: {idCuenta: cuentaId},
						data: {saldo: nuevoSaldo},
					});

					cuentasActualizadas.push(cuentaActualizada);

					// Inserta en la tabla GastosCuentas para crear la relación
					await prisma.gastosCuentas.create({
						data: {
							idCuenta: cuentaId,
							idGasto: nuevoGasto.idGasto,
						},
					});
				}

				return {nuevoGasto, cuentasActualizadas};
			});

			return {
				gasto: result.nuevoGasto,
				cuentas: result.cuentasActualizadas,
			};
		} catch (error) {
			throw new NotFoundException(
				`No se pudo crear el gasto o debitar de una o más cuentas: ${error.message}`,
			);
		}
	}

	async findAll(): Promise<any> {
		const gastos = await this.prisma.gastos.findMany({
			include: {
				cuentaList: {
					include: {
						cuenta: true, // Incluye las cuentas asociadas
					},
				},
				establecimiento: {
					select: {
						nombreEstablecimiento: true,
						rubro: {
							select: {
								nombreRubro: true,
								idRubro: true
							}
						}
					}
				}
			},
		});
		if (gastos.length === 0) {
			throw new NotFoundException('No se encontraron gastos');
		}
		return gastos;
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
			if (gastoUpdate.idsCuentas && gastoUpdate.idsCuentas.length > 0) {
				const cuentasConNuevoSaldo = [];

				// Valida si el  saldo es suficiente en todas las cuentas
				for (const idCuenta of gastoUpdate.idsCuentas) {
					const cuenta = await this.prisma.cuentas.findUnique({
						where: {idCuenta: idCuenta},
					});

					if (!cuenta) {
						throw new NotFoundException(
							`No se encontró la cuenta con el id: ${idCuenta}`,
						);
					}

					const nuevoSaldo = cuenta.saldo - gastoUpdate.monto;

					if (nuevoSaldo < 0) {
						throw new BadRequestException(
							`Saldo insuficiente en la cuenta con ID: ${idCuenta}`,
						);
					}

					// Almacena las cuentas con saldo actualizado
					cuentasConNuevoSaldo.push({idCuenta, nuevoSaldo});
				}

				// Si se tiene el saldo suficiente se actualiza los cambios
				await this.prisma.gastosCuentas.deleteMany({
					where: {idGasto: gastoUpdate.idGasto},
				});

				const nuevasRelaciones = gastoUpdate.idsCuentas.map(
					(idCuenta) => ({
						idCuenta,
						idGasto: gastoUpdate.idGasto,
					}),
				);

				await this.prisma.gastosCuentas.createMany({
					data: nuevasRelaciones,
				});

				// Actualiza el saldo de las cuentas
				for (const {idCuenta, nuevoSaldo} of cuentasConNuevoSaldo) {
					await this.prisma.cuentas.update({
						where: {idCuenta},
						data: {saldo: nuevoSaldo},
					});
				}
			}

			// Actualizar el gasto
			const gastoActualizado = await this.prisma.gastos.update({
				where: {idGasto: gastoUpdate.idGasto},
				data: {
					monto: gastoUpdate.monto || undefined,
					fecha: new Date(gastoUpdate.fecha),
					establecimiento: gastoUpdate.idEstablecimiento
						? {
								connect: {
									idEstablecimiento:
										gastoUpdate.idEstablecimiento,
								},
							}
						: undefined,
				},
			});

			return gastoActualizado;
		} catch (error) {
			// Verificacion de errores
			if (
				error instanceof BadRequestException ||
				error instanceof NotFoundException
			) {
				throw error;
			} else {
				throw new NotFoundException(
					`No se puede actualizar el gasto con el id: ${gastoUpdate.idGasto}`,
				);
			}
		}
	}

	async remove(id: number): Promise<any> {
		try {
			// Inicia transaccion
			await this.prisma.$transaction(async (prisma) => {
				// Elimina las relaciones en la tabla asociativa
				await prisma.gastosCuentas.deleteMany({
					where: {idGasto: id},
				});

				// Después de eliminar las relaciones, elimina el gasto
				await prisma.gastos.delete({
					where: {idGasto: id},
				});
			});
		} catch (error) {
			throw new NotFoundException(
				`No se puede eliminar el gasto con el id: ${id}, debido a restricciones de relaciones o no se encontró el gasto`,
			);
		}
	}
}
