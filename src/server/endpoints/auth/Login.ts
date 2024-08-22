import EventEmitter from "events";
import { PostEndpoint } from "../../lib/Endpoint";
import { body, ValidationChain } from "express-validator";
import { LoginRequest } from "@shared/types/request";
import { RequestData } from "../../types/RequestData";
import { UserRepository } from "../../repositories/UserRepository";
import { Security } from "../../lib/security";
import { NotAuthorizedException } from "../../exceptions/NotAuthorizedException";

export class LoginEndpoint extends PostEndpoint {
  constructor(emitter: EventEmitter) {
    super('/login', emitter);
    this.setAuthRequired(false);
  }

  getValidator(): ValidationChain[] {
    return [
      body('username', 'Username has to be a string').isString(),
      body('password', 'Password has to be a string').isString()
    ];
  }

  async execute(requestData: RequestData<LoginRequest>) {
    const { username, password } = requestData.body;
    const user = await UserRepository.findOneByUsername(username);
    if (user === null) {
      throw new NotAuthorizedException();
    }
    const hash = Security.hashText(password, user.salt);;
    if (hash !== user.password) {
      throw new NotAuthorizedException();
    }
    return {
      token: Security.signUserJwt({ username: user.username, userId: user.id }),
      refreshToken: Security.signJwt({ username: user.username, userId: user.id }, '7d'),
    };
  }
}