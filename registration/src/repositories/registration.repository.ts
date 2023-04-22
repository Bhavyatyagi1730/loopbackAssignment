import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {RegistrationdbDataSource} from '../datasources';
import {Registration, RegistrationRelations} from '../models';

export class RegistrationRepository extends DefaultCrudRepository<
  Registration,
  typeof Registration.prototype.id,
  RegistrationRelations
> {
  constructor(
    @inject('datasources.registrationdb') dataSource: RegistrationdbDataSource,
  ) {
    super(Registration, dataSource);
  }
}
