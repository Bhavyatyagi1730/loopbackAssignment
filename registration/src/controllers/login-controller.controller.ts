import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Response, RestBindings, post, requestBody} from '@loopback/rest';
import {Login} from '../models';
import {LoginRepository, RegistrationRepository} from '../repositories';

export class LoginControllerController {
  constructor(
    @repository(RegistrationRepository)
    private registrationRepository: RegistrationRepository,
    @repository(LoginRepository)
    private loginRepository: LoginRepository,
    @inject(RestBindings.Http.RESPONSE) protected response: Response,
  ) {}
  @post('/login')
  async login(@requestBody() user: Login): Promise<unknown> {
    try {
      const {email, password} = user;
      console.log(email);
      const isUserFound = await this.registrationRepository.findOne({
        where: {email: email},
      });
      if (!isUserFound) {
        this.response
          .status(401)
          .json({message: 'You are not register user'});
      }

      if (isUserFound?.password !== password) {
        this.response.status(401).json({
          message: 'Please enter Correct password',
        });
      }
      console.log(isUserFound);

      return this.response.status(200).json({message: 'Login success'});

    } catch (err) {
      console.error(err);
      this.response.status(500).json({message: 'Unable to login'});
    }
  }
}
