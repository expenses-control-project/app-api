import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from 'src/config/prisma.service';
import {CreateRubroDto, UpdateRubroDto} from './rubro.dto';

@Injectable()
export class RubroService {
	constructor(private prisma: PrismaService) {}

	async create(rubroCreate: CreateRubroDto): Promise<any> {
		try {
			return await this.prisma.rubros.create({
				data: {
					nombreRubro: rubroCreate.nombreRubro,
					total: rubroCreate.total,
				},
			});
		} catch (error) {
			throw new NotFoundException(
				`No se pudo crear el rubro correctamente`,
			);
		}
	}

	async findAll(): Promise<any> {
		try {
			return await this.prisma.rubros.findMany();
		} catch (error) {
			return new NotFoundException(`No se encontraron rubros`);
		}
	}

	async findOne(id: number): Promise<any> {
		const rubro = await this.prisma.rubros.findUnique({
			where: {idRubro: id},
		});

		if (!rubro) {
			throw new NotFoundException(
				`No se encontró el rubro con el id: ${id}`,
			);
		}

		return rubro;
	}

	async update(id: number, rubroUpdate: UpdateRubroDto): Promise<any> {
		try {
			return await this.prisma.rubros.update({
				where: {idRubro: id},
				data: {
					nombreRubro: rubroUpdate.nombreRubro,
					total: rubroUpdate.total,
				},
			});
		} catch (error) {
			throw new NotFoundException(
				`No se puede actualizar el rubro con el id: ${id}`,
			);
		}
	}

	async remove(id: number): Promise<any> {
		try {
			return await this.prisma.rubros.delete({
				where: {idRubro: id},
			});
		} catch (error) {
			throw new NotFoundException(
				`No se puede eliminar el rubro con el id: ${id}`,
			);
		}
	}
}
