import {Module} from '@nestjs/common';
import {CuentaModule} from './cuenta/cuenta.module';
import {RubroModule} from './rubro/rubro.module';
import {IngresoModule} from './ingreso/ingreso.module';
import {GastoModule} from './gasto/gasto.module';
import {EstablecimientoModule} from './establecimiento/establecimiento.module';
import {PrismaModule} from './config/prisma.module';

@Module({
	imports: [
		CuentaModule,
		RubroModule,
		IngresoModule,
		GastoModule,
		EstablecimientoModule,
		PrismaModule,
	],
	providers: [],
})
export class AppModule {}
