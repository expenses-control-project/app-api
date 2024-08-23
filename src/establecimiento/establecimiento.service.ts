import { Injectable } from '@nestjs/common';
import { Establecimiento } from './establecimiento.entity';


@Injectable()
export class EstablecimientoService {
  create(establecimiento: Establecimiento) {
    return 'This action adds a new establecimiento';
  }

  findAll() {
    return `This action returns all establecimiento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} establecimiento`;
  }

  update(id: number, establecimiento: Establecimiento) {
    return `This action updates a #${id} establecimiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} establecimiento`;
  }
}
