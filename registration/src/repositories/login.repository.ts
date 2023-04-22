import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {RegistrationdbDataSource} from '../datasources';
import {Login, LoginRelations} from '../models';

export class LoginRepository extends DefaultCrudRepository<
  Login,
  typeof Login.prototype.id,
  LoginRelations
> {
  constructor(
    @inject('datasources.registrationdb') dataSource: RegistrationdbDataSource,
  ) {
    super(Login, dataSource);
  }
}
