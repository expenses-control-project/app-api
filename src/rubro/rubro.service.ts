import { Injectable } from '@nestjs/common';
import { Rubro } from './rubro.entity';

@Injectable()
export class RubroService {
  create(rubro: Rubro) {
    return 'This action adds a new rubro';
  }

  findAll() {
    return `This action returns all rubro`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rubro`;
  }

  update(id: number, rubro: Rubro) {
    return `This action updates a #${id} rubro`;
  }

  remove(id: number) {
    return `This action removes a #${id} rubro`;
  }
}
