import { body, ValidationChain } from "express-validator";
import { PostEndpoint } from "../../lib/Endpoint";
import { RequestData } from "../../types/RequestData";
import { RegisterRequest } from "@shared/types/request";
import { UserRepository } from "../../repositories/UserRepository";
import EventEmitter from "events";
import { Security } from "../../lib/security";

export class RegisterEndpoint extends PostEndpoint {
  constructor(emitter: EventEmitter) {
    super('/register', emitter);
    this.setAuthRequired(false);
  }

  getValidator(): ValidationChain[] {
    return [
      body('username', 'Username has to be a string').isString(),
      body('password', 'Password has to be a string').isString()
    ];
  }

  async execute(requestData: RequestData<RegisterRequest>) {
    const { username, password } = requestData.body;
    const existingUser = await UserRepository.findOneByUsername(username);
    if (existingUser !== null) {
      throw new Error('User already exists');
    }
    
    const salt = Security.generateSalt();
    const hashedPassword = Security.hashText(password, salt);
    const user = UserRepository.create({
      username,
      password: hashedPassword,
      salt,
      hasAccess: true
    });
    await UserRepository.save(user);
    return { status: 'success' };
  }
}