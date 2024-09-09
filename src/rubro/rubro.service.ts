import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from 'src/config/prisma.service';

@Injectable()
export class RubroService {
	constructor(private prisma: PrismaService) {}

	async findAll(): Promise<any> {
		const rubros = await this.prisma.rubros.findMany();

		if (rubros.length === 0) {
			throw new NotFoundException(`No se encontraron rubros`);
		}

		return rubros;
	}
}
