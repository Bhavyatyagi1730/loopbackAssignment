// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import {inject} from '@loopback/core';
import {
  HttpErrors,
  Response,
  RestBindings,
  // del,
  // get,
  // param,
  post,
  requestBody,

} from '@loopback/rest';
import {Registration} from '../models/registration.model';
import {RegistrationRepository} from '../repositories/registration.repository';
// import {RegistrationResponse} from '../interface/Registration'
import {error} from 'console';
import {HttpResponse} from '../interface/Registration';

export class UserRegistrationController {
  constructor(
    @inject('repositories.RegistrationRepository')
    private registrationRepo: RegistrationRepository,
    @inject(RestBindings.Http.RESPONSE) protected response: Response,
  ) {}

  @post('/registrations')
  async createRegistration(
    @requestBody() registration: Registration,
  ): Promise<HttpResponse> {
    try{
      const { email, firstName, lastName } = registration;

      if (!email || !firstName || !lastName) {
        return this.response.status(401).json({message : "All fields are required"});
      }

      const user = await this.registrationRepo.findOne({where: {email: email}});
      if (user) {
        return this.response.status(400).json({status: 'failed', message: 'Email already exists'});
      }

      const createdRegistration = await this.registrationRepo.create(registration);
      console.log(createdRegistration);

      const data={
        statusCode:200,
        message:"Successfull"
      }
      return registrationResponse;
    } catch(err){
      throw new HttpErrors.BadRequest(error.arguments);
    }
  }



  // @get('/registrations')
  // async getAllRegistrations(): Promise<Registration[]> {
  //   const registrations = await this.registrationRepo.find();
  //   return registrations;
  // }

  // @get('/registrations/{id}')
  // async getRegistrationById(
  //   @param.path.number('id') id: number,
  // ): Promise<unknown> {
  //   const registration = await this.registrationRepo.findById(id);
  //   console.log(registration);
  //   if (!registration) {
  //     this.response.status(401).json({message: 'User Not found'});
  //   }

  //   return this.response.status(200).json({message: 'User found'});
  // }

  // @del('/registrations/{id}')
  // async deleteRegistrationById(
  //   @param.path.number('id') id: number,
  // ): Promise<void> {
  //   const deleteduser = await this.registrationRepo.deleteById(id);
  //   console.log(deleteduser);
  //   return deleteduser;
  // }
}


