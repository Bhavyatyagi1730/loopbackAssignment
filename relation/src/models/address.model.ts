import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Customer} from './customer.model';

@model()
export class Address extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    mysql: {
      columnName: 'address_id,',
    },
  })
  addressId?: number;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'string',
    required: true,
  })
  pincode: string;

  @belongsTo(() => Customer)
  customerId: number;

  constructor(data?: Partial<Address>) {
    super(data);
  }
}

export interface AddressRelations {
  // describe navigational properties here
}

export type AddressWithRelations = Address & AddressRelations;
