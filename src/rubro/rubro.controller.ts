import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RubroService } from './rubro.service';
import { CreateRubroDto } from './dto/create-rubro.dto';
import { UpdateRubroDto } from './dto/update-rubro.dto';

@Controller('rubro')
export class RubroController {
  constructor(private readonly rubroService: RubroService) {}

  @Post()
  create(@Body() createRubroDto: CreateRubroDto) {
    return this.rubroService.create(createRubroDto);
  }

  @Get()
  findAll() {
    return this.rubroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rubroService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRubroDto: UpdateRubroDto) {
    return this.rubroService.update(+id, updateRubroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rubroService.remove(+id);
  }
}
