import {Module} from '@nestjs/common';
import {CuentaModule} from './cuenta/cuenta.module';
import {RubroModule} from './rubro/rubro.module';
import {IngresoModule} from './ingreso/ingreso.module';
import {GastoModule} from './gasto/gasto.module';
import {EstablecimientoModule} from './establecimiento/establecimiento.module';
import {PrismaModule} from './config/prisma.module';
import {UsuarioModule} from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		CuentaModule,
		RubroModule,
		IngresoModule,
		GastoModule,
		EstablecimientoModule,
		PrismaModule,
		UsuarioModule,
		AuthModule,
	],
	providers: [],
})
export class AppModule {}
