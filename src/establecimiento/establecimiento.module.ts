import {Module} from '@nestjs/common';
import {EstablecimientoService} from './establecimiento.service';
import {EstablecimientoController} from './establecimiento.controller';
import {PrismaModule} from 'src/config/prisma.module';
import {UsuarioModule} from 'src/usuario/usuario.module';

@Module({
	imports: [PrismaModule, UsuarioModule],
	controllers: [EstablecimientoController],
	providers: [EstablecimientoService],
})
export class EstablecimientoModule {}
