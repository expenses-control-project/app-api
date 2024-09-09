import {Controller, Get, HttpException, HttpStatus} from '@nestjs/common';
import {RubroService} from './rubro.service';
import {ApiOperation, ApiTags} from '@nestjs/swagger';

@ApiTags('rubro')
@Controller('rubro')
export class RubroController {
	constructor(private readonly rubroService: RubroService) {}

	@ApiOperation({
		summary: 'Obtiene todos los rubros',
	})
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
