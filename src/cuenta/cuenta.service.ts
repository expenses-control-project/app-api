import {Injectable} from '@nestjs/common';
import {Cuenta} from './cuenta.entity';
import {PrismaService} from 'src/config/prisma.service';

@Injectable()
export class CuentaService {
	constructor(private prisma: PrismaService) {}

	async create(cuenta: Cuenta) {
		return 'This action adds a new cuenta';
	}

	async findAll(): Promise<Cuenta[]> {
		return this.prisma.cuentas.findMany();
	}

	async findOne(id: number) {
		return this.prisma.cuentas.findUnique(id);
	}

	async update(id: number, cuenta: Cuenta) {
		return `This action updates a #${id} cuenta`;
	}

	async remove(id: number) {
		return `This action removes a #${id} cuenta`;
	}
}
