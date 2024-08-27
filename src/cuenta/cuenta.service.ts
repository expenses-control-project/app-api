import {Injectable} from '@nestjs/common';
import {Cuenta} from './cuenta.entity';
import {PrismaService} from 'src/config/prisma.service';

@Injectable()
export class CuentaService {
	constructor(private prisma: PrismaService) {}

	create(cuenta: Cuenta) {
		return 'This action adds a new cuenta';
	}

	findAll(): Promise<Cuenta[]> {
		return this.prisma.cuentas.findMany();
	}

	findOne(id: number) {
		return `This action returns a #${id} cuenta`;
	}

	update(id: number, cuenta: Cuenta) {
		return `This action updates a #${id} cuenta`;
	}

	remove(id: number) {
		return `This action removes a #${id} cuenta`;
	}
}
