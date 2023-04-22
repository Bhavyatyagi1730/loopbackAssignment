import {Entity, model, property} from '@loopback/repository';

@model()
export class Manufacture extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    mysql:{
      columnName:'manufacture_id,'
    }
  })
  manufactureId?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  age: number;

  @property({
    type: 'number',
  })
  orderId?: number;

  constructor(data?: Partial<Manufacture>) {
    super(data);
  }
}

export interface ManufactureRelations {
  // describe navigational properties here
}

export type ManufactureWithRelations = Manufacture & ManufactureRelations;
