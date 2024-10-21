import {Module} from '@nestjs/common';
import {RubroService} from './rubro.service';
import {RubroController} from './rubro.controller';
import {PrismaModule} from 'src/config/prisma.module';
import {UsuarioModule} from 'src/usuario/usuario.module';

@Module({
	imports: [PrismaModule, UsuarioModule],
	controllers: [RubroController],
	providers: [RubroService],
})
export class RubroModule {}
