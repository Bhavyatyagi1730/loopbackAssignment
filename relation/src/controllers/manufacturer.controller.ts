import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Manufacture} from '../models';
import {ManufactureRepository} from '../repositories';

export class ManufacturerController {
  constructor(
    @repository(ManufactureRepository)
    public manufactureRepository : ManufactureRepository,
  ) {}

  @post('/manufactures')
  @response(200, {
    description: 'Manufacture model instance',
    content: {'application/json': {schema: getModelSchemaRef(Manufacture)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manufacture, {
            title: 'NewManufacture',
            exclude: ['manufactureId'],
          }),
        },
      },
    })
    manufacture: Omit<Manufacture, 'manufacturerId'>,
  ): Promise<Manufacture> {
    return this.manufactureRepository.create(manufacture);
  }

  @get('/manufactures/count')
  @response(200, {
    description: 'Manufacture model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Manufacture) where?: Where<Manufacture>,
  ): Promise<Count> {
    return this.manufactureRepository.count(where);
  }

  @get('/manufactures')
  @response(200, {
    description: 'Array of Manufacture model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Manufacture, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Manufacture) filter?: Filter<Manufacture>,
  ): Promise<Manufacture[]> {
    return this.manufactureRepository.find(filter);
  }

  @patch('/manufactures')
  @response(200, {
    description: 'Manufacture PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manufacture, {partial: true}),
        },
      },
    })
    manufacture: Manufacture,
    @param.where(Manufacture) where?: Where<Manufacture>,
  ): Promise<Count> {
    return this.manufactureRepository.updateAll(manufacture, where);
  }

  @get('/manufactures/{id}')
  @response(200, {
    description: 'Manufacture model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Manufacture, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Manufacture, {exclude: 'where'}) filter?: FilterExcludingWhere<Manufacture>
  ): Promise<Manufacture> {
    return this.manufactureRepository.findById(id, filter);
  }

  @patch('/manufactures/{id}')
  @response(204, {
    description: 'Manufacture PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manufacture, {partial: true}),
        },
      },
    })
    manufacture: Manufacture,
  ): Promise<void> {
    await this.manufactureRepository.updateById(id, manufacture);
  }

  @put('/manufactures/{id}')
  @response(204, {
    description: 'Manufacture PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() manufacture: Manufacture,
  ): Promise<void> {
    await this.manufactureRepository.replaceById(id, manufacture);
  }

  @del('/manufactures/{id}')
  @response(204, {
    description: 'Manufacture DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.manufactureRepository.deleteById(id);
  }
}
