import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlconnectionDataSource} from '../datasources';
import {Order, OrderRelations, Manufacture} from '../models';
import {ManufactureRepository} from './manufacture.repository';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.orderId,
  OrderRelations
> {

  public readonly manufactures: HasManyRepositoryFactory<Manufacture, typeof Order.prototype.orderId>;

  constructor(
    @inject('datasources.mysqlconnection') dataSource: MysqlconnectionDataSource, @repository.getter('ManufactureRepository') protected manufactureRepositoryGetter: Getter<ManufactureRepository>,
  ) {
    super(Order, dataSource);
    this.manufactures = this.createHasManyRepositoryFactoryFor('manufactures', manufactureRepositoryGetter,);
    this.registerInclusionResolver('manufactures', this.manufactures.inclusionResolver);
  }
}
