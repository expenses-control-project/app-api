import {Module} from '@nestjs/common';
import {RubroService} from './rubro.service';
import {RubroController} from './rubro.controller';
import {PrismaModule} from 'src/config/prisma.module';

@Module({
	imports: [PrismaModule],
	controllers: [RubroController],
	providers: [RubroService],
})
export class RubroModule {}
