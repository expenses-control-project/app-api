import { Injectable } from '@nestjs/common';
import { Movimiento } from './movimiento.entity';

@Injectable()
export class MovimientoService {
  create(movimiento: Movimiento) {
    return 'This action adds a new movimiento';
  }

  findAll() {
    return `This action returns all movimiento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movimiento`;
  }

  update(id: number, movimiento: Movimiento) {
    return `This action updates a #${id} movimiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} movimiento`;
  }
}
