import {Global, Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UsuarioService} from 'src/usuario/usuario.service';
import {UsuarioModule} from 'src/usuario/usuario.module';
import {Prisma} from '@prisma/client';
import {PrismaModule} from 'src/config/prisma.module';

@Global()
@Module({
	imports: [UsuarioModule, PrismaModule],
	providers: [AuthService, UsuarioService],
	controllers: [AuthController],
})
export class AuthModule {}
