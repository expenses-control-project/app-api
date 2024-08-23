import { Injectable } from '@nestjs/common';
import { Cuenta } from './cuenta.entity';


@Injectable()
export class CuentaService {
  create(cuenta: Cuenta) {
    return 'This action adds a new cuenta';
  }

  findAll() {
    return `This action returns all cuenta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cuenta`;
  }

  update(id: number, cuenta: Cuenta) {
    return `This action updates a #${id} cuenta`;
  }

  remove(id: number) {
    return `This action removes a #${id} cuenta`;
  }
}
