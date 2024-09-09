import {Module} from '@nestjs/common';
import {EstablecimientoService} from './establecimiento.service';
import {EstablecimientoController} from './establecimiento.controller';
import {PrismaModule} from 'src/config/prisma.module';

@Module({
	imports: [PrismaModule],
	controllers: [EstablecimientoController],
	providers: [EstablecimientoService],
})
export class EstablecimientoModule {}
