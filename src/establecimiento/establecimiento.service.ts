import {Injectable, NotFoundException} from '@nestjs/common';
import {
	CreateEstablecimientoDto,
	UpdateEstablecimientoDto,
} from './establecimiento.dto';
import {PrismaService} from 'src/config/prisma.service';

@Injectable()
export class EstablecimientoService {
	constructor(private prisma: PrismaService) {}

	async create(
		establecimientoCreate: CreateEstablecimientoDto,
	): Promise<any> {
		try {
			return await this.prisma.establecimientos.create({
				data: {
					nombreEstablecimiento:
						establecimientoCreate.nombreEstablecimiento,
					rubro: {
						connect: {idRubro: establecimientoCreate.rubroId},
					},
				},
			});
		} catch (error) {
			throw new NotFoundException(`No se pudo crear el establecimiento`);
		}
	}

	async findAll(): Promise<any> {
		const establecimientos = await this.prisma.ingresos.findMany();

		if (establecimientos.length === 0) {
			throw new NotFoundException(`No se encontraron establecimientos`);
		}

		return establecimientos;
	}

	async findOne(id: number): Promise<any> {
		const establecimiento = await this.prisma.establecimientos.findUnique({
			where: {idEstablecimiento: id},
		});

		if (!establecimiento) {
			throw new NotFoundException(
				`No se encontró el establecimiento con el id: ${id}`,
			);
		}

		return establecimiento;
	}

	async update(
		establecimientoUpdate: UpdateEstablecimientoDto,
	): Promise<any> {
		try {
			return await this.prisma.establecimientos.update({
				where: {
					idEstablecimiento: establecimientoUpdate.idEstablecimiento,
				},
				data: {
					nombreEstablecimiento:
						establecimientoUpdate.nombreEstablecimiento ||
						undefined,
					rubro: establecimientoUpdate.rubroId
						? {
								connect: {
									idRubro: establecimientoUpdate.rubroId,
								},
							}
						: undefined,
				},
			});
		} catch (error) {
			throw new NotFoundException(
				`No se puede actualizar el establecimiento con el id: ${establecimientoUpdate.idEstablecimiento}`,
			);
		}
	}

	async remove(id: number): Promise<any> {
		try {
			return await this.prisma.establecimientos.delete({
				where: {idEstablecimiento: id},
			});
		} catch (error) {
			throw new NotFoundException(
				`No se puede eliminar el establecimiento con el id: ${id}`,
			);
		}
	}
}
