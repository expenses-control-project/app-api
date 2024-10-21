import {Module} from '@nestjs/common';
import {CuentaService} from './cuenta.service';
import {CuentaController} from './cuenta.controller';
import {PrismaModule} from 'src/config/prisma.module';
import {UsuarioModule} from 'src/usuario/usuario.module';

@Module({
	imports: [PrismaModule, UsuarioModule],
	controllers: [CuentaController],
	providers: [CuentaService],
})
export class CuentaModule {}
