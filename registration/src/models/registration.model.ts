import {Entity, model, property} from '@loopback/repository';

@model()
export class Registration extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    limit: 10,
    required: true,
  })
  firstName?: string;

  @property({
    type: 'string',
    limit: 30,
    required: true,
  })
  lastName?: string;

  @property({
    type: 'string',

    jsonSchema: {
      // pattern: /\d{3}-\d{3}-\d{4}/.source,
      // pattern: '/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i'
    },

    required: true,
  })
  email?: string;

  @property({
    type: 'string',
    minLength: 8,
    maxLength: 512,
    required: true,
  })
  password?: string;

  constructor(data?: Partial<Registration>) {
    super(data);
  }
}

export interface RegistrationRelations {
  // describe navigational properties here
}

export type RegistrationWithRelations = Registration & RegistrationRelations;
