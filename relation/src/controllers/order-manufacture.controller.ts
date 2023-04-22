import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Order,
  Manufacture,
} from '../models';
import {OrderRepository} from '../repositories';

export class OrderManufactureController {
  constructor(
    @repository(OrderRepository) protected orderRepository: OrderRepository,
  ) { }

  @get('/orders/{id}/manufactures', {
    responses: {
      '200': {
        description: 'Array of Order has many Manufacture',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Manufacture)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Manufacture>,
  ): Promise<Manufacture[]> {
    return this.orderRepository.manufactures(id).find(filter);
  }

  @post('/orders/{id}/manufactures', {
    responses: {
      '200': {
        description: 'Order model instance',
        content: {'application/json': {schema: getModelSchemaRef(Manufacture)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Order.prototype.orderId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manufacture, {
            title: 'NewManufactureInOrder',
            exclude: ['manufactureId'],
            optional: ['orderId']
          }),
        },
      },
    }) manufacture: Omit<Manufacture, 'manufacture_id'>,
  ): Promise<Manufacture> {
    return this.orderRepository.manufactures(id).create(manufacture);
  }

  @patch('/orders/{id}/manufactures', {
    responses: {
      '200': {
        description: 'Order.Manufacture PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manufacture, {partial: true}),
        },
      },
    })
    manufacture: Partial<Manufacture>,
    @param.query.object('where', getWhereSchemaFor(Manufacture)) where?: Where<Manufacture>,
  ): Promise<Count> {
    return this.orderRepository.manufactures(id).patch(manufacture, where);
  }

  @del('/orders/{id}/manufactures', {
    responses: {
      '200': {
        description: 'Order.Manufacture DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Manufacture)) where?: Where<Manufacture>,
  ): Promise<Count> {
    return this.orderRepository.manufactures(id).delete(where);
  }
}
