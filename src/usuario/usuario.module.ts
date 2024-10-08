import {Module} from '@nestjs/common';
import {UsuarioService} from './usuario.service';
import {UsuarioController} from './usuario.controller';
import {PrismaModule} from 'src/config/prisma.module';

@Module({
	imports: [PrismaModule],
	controllers: [UsuarioController],
	providers: [UsuarioService],
})
export class UsuarioModule {}
