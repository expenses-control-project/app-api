import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import {RubroService} from './rubro.service';
import {Rubro} from './rubro.entity';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('rubro')
@Controller('rubro')
export class RubroController {
	constructor(private readonly rubroService: RubroService) {}

	@Post()
	create(@Body() rubro: Rubro) {
		return this.rubroService.create(rubro);
	}

	@Get()
	findAll() {
		return this.rubroService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.rubroService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: number, @Body() rubro: Rubro) {
		return this.rubroService.update(+id, rubro);
	}

	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.rubroService.remove(+id);
	}
}
