import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from 'src/config/prisma.service';
import {
	AllCuentaDto,
	ByIdCuentaDto,
	CreateCuentaDto,
	UpdateCuentaDto,
} from './cuenta.dto';

@Injectable()
export class CuentaService {
	constructor(private prisma: PrismaService) {}

	async create(cuenta: CreateCuentaDto): Promise<void> {
		await this.prisma.cuentas.create({
			data: {
				nombre: cuenta.nombre,
				saldo: cuenta.saldo,
			},
		});
	}
	async findAll(): Promise<AllCuentaDto[]> {
		return this.prisma.cuentas.findMany();
	}

	async findOne(id: number): Promise<ByIdCuentaDto> {
		return;
	}

	async update(id: number, cuenta: UpdateCuentaDto) {
		return new NotFoundException(`This action updates a #${id} cuenta`);
	}

	async remove(id: number) {
		return `This action removes a #${id} cuenta`;
	}
}
