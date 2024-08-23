import { Injectable } from '@nestjs/common';
import { Ingreso } from './ingreso.entity';

@Injectable()
export class IngresoService {
  create(ingreso: Ingreso) {
    return 'This action adds a new ingreso';
  }

  findAll() {
    return `This action returns all ingreso`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ingreso`;
  }

  update(id: number, ingreso: Ingreso) {
    return `This action updates a #${id} ingreso`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingreso`;
  }
}
