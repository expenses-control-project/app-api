import {Module} from '@nestjs/common';
import {CuentaService} from './cuenta.service';
import {CuentaController} from './cuenta.controller';
import {PrismaModule} from 'src/config/prisma.module';

@Module({
	imports: [PrismaModule],
	controllers: [CuentaController],
	providers: [CuentaService],
})
export class CuentaModule {}
