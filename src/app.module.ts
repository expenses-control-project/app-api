import {Module} from '@nestjs/common';
import {CuentaModule} from './cuenta/cuenta.module';
import {MovimientoModule} from './movimiento/movimiento.module';
import {RubroModule} from './rubro/rubro.module';
import {IngresoModule} from './ingreso/ingreso.module';
import {GastoModule} from './gasto/gasto.module';
import {EstablecimientoModule} from './establecimiento/establecimiento.module';

@Module({
	imports: [
		CuentaModule,
		MovimientoModule,
		RubroModule,
		IngresoModule,
		GastoModule,
		EstablecimientoModule,
	],
})
export class AppModule {}
