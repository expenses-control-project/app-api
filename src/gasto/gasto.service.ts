import { Injectable } from '@nestjs/common';
import { Gasto } from './gasto.entity';

@Injectable()
export class GastoService {
  create(gasto: Gasto) {
    return 'This action adds a new gasto';
  }

  findAll() {
    return `This action returns all gasto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gasto`;
  }

  update(id: number, gasto: Gasto) {
    return `This action updates a #${id} gasto`;
  }

  remove(id: number) {
    return `This action removes a #${id} gasto`;
  }
}
