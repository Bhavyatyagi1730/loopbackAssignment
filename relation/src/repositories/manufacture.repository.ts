import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlconnectionDataSource} from '../datasources';
import {Manufacture, ManufactureRelations} from '../models';

export class ManufactureRepository extends DefaultCrudRepository<
  Manufacture,
  typeof Manufacture.prototype.manufactureId,
  ManufactureRelations
> {
  constructor(
    @inject('datasources.mysqlconnection') dataSource: MysqlconnectionDataSource,
  ) {
    super(Manufacture, dataSource);
  }
}
