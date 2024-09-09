import {Module} from '@nestjs/common';
import {IngresoService} from './ingreso.service';
import {IngresoController} from './ingreso.controller';
import {PrismaModule} from 'src/config/prisma.module';

@Module({
	imports: [PrismaModule],
	controllers: [IngresoController],
	providers: [IngresoService],
})
export class IngresoModule {}
