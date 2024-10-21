import {Module} from '@nestjs/common';
import {IngresoService} from './ingreso.service';
import {IngresoController} from './ingreso.controller';
import {PrismaModule} from 'src/config/prisma.module';
import {UsuarioModule} from 'src/usuario/usuario.module';

@Module({
	imports: [PrismaModule, UsuarioModule],
	controllers: [IngresoController],
	providers: [IngresoService],
})
export class IngresoModule {}
