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
					fecha: new Date(ingresoCreate.fecha),
					cuenta: {
						connect: {idCuenta: ingresoCreate.idCuenta},
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
		const ingresos = await this.prisma.ingresos.findMany({
			include: {
				cuenta: {
					select: {
						nombre: true
					}
				}
			}
		});

		if (ingresos.length === 0) {
			throw new NotFoundException(`No se encontraron ingresos`);
		}

		return ingresos;
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
			// Obtener el ingreso actual
			const ingresoActual = await this.prisma.ingresos.findUnique({
				where: {idIngreso: ingresoUpdate.idIngreso},
				include: {cuenta: true}, // cuente asociada al ingreso
			});

			if (!ingresoActual) {
				throw new NotFoundException(
					`No se encontró el ingreso con el id: ${ingresoUpdate.idIngreso}`,
				);
			}

			// Ajusta la diferencia de saldo
			const diferenciaSaldo = ingresoUpdate.saldo - ingresoActual.saldo;

			// Actualizar el saldo de la cuenta sumando la diferencia
			const cuentaActualizada = await this.prisma.cuentas.update({
				where: {idCuenta: ingresoActual.idCuenta},
				data: {saldo: ingresoActual.saldo + diferenciaSaldo},
			});

			// Actualizar el ingreso con los nuevos datos
			const ingresoActualizado = await this.prisma.ingresos.update({
				where: {idIngreso: ingresoUpdate.idIngreso},
				data: {
					saldo: cuentaActualizada.saldo,
					fecha: ingresoUpdate.fecha
						? new Date(ingresoUpdate.fecha)
						: ingresoActual.fecha,
					cuenta: ingresoUpdate.idCuenta
						? {connect: {idCuenta: ingresoUpdate.idCuenta}}
						: undefined,
				},
			});

			return {ingreso: ingresoActualizado, cuentaActualizada};
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
				where: {idCuenta: ingresoCreate.idCuenta},
			});

			if (!cuenta) {
				throw new NotFoundException(
					`No se encontró la cuenta con el id: ${ingresoCreate.idCuenta}`,
				);
			}

			const nuevoSaldo = (cuenta.saldo += ingresoCreate.saldo);

			// Actualiza el saldo nuevo de la cuenta en la base de datos
			const cuentaActualizada = await this.prisma.cuentas.update({
				where: {idCuenta: ingresoCreate.idCuenta},
				data: {saldo: nuevoSaldo},
			});
			return cuentaActualizada;
		} catch (error) {
			throw new NotFoundException(
				`No se puede debitar de la cuenta con el id: ${ingresoCreate.idCuenta}`,
			);
		}
	}
}
