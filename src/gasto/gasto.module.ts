import {Module} from '@nestjs/common';
import {GastoService} from './gasto.service';
import {GastoController} from './gasto.controller';
import {PrismaModule} from 'src/config/prisma.module';
import {UsuarioModule} from 'src/usuario/usuario.module';

@Module({
	imports: [PrismaModule, UsuarioModule],
	controllers: [GastoController],
	providers: [GastoService],
})
export class GastoModule {}
