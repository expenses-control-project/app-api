import {
	Controller,
	Get,
	HttpException,
	HttpStatus,
	UseGuards,
} from '@nestjs/common';
import {RubroService} from './rubro.service';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {AuthGuard} from 'src/auth/guards/auth.guard';
import {RolesGuard} from 'src/auth/guards/roles.guard';
import {Roles} from 'src/auth/decorators/roles.decorator';

@ApiTags('rubro')
@Controller('rubro')
@UseGuards(AuthGuard, RolesGuard)
export class RubroController {
	constructor(private readonly rubroService: RubroService) {}

	@ApiOperation({
		summary: 'Obtiene todos los rubros',
	})
	@Roles('USUARIO')
	@Get()
	async findAll(): Promise<any> {
		const rubros = await this.rubroService.findAll();

		return {
			statusCode: HttpStatus.OK,
			timestamp: new Date().toISOString(),
			message: 'Rubros encontrados con éxito',
			rubros: rubros,
		};
	}
}
