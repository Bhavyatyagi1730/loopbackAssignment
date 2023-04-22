import {Entity, hasMany, model, property} from '@loopback/repository';
import {Manufacture} from './manufacture.model';

@model()
export class Order extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    mysql: {
      columnName: 'order_id,',
    },
  })
  orderId?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
  })
  customerId?: number;

  @hasMany(() => Manufacture)
  manufactures: Manufacture;

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
