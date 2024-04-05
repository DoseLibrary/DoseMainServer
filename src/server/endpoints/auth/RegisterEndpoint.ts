import { body, ValidationChain } from "express-validator";
import { PostEndpoint } from "../Endpoint";
import { RequestData } from "../../types/RequestData";
import { RegisterRequest } from "@shared/types/request/RegisterRequest";
import { UserRepository } from "../../repositories/UserRepository";
import { BadRequestException } from "../../exceptions/BadRequestException";
import { generateSalt, hashText } from "../../lib/security";

export class RegisterEndpoint extends PostEndpoint {
  constructor() {
    super('/register');
  }

  protected getValidator(): ValidationChain[] {
    return [
      body('username').isString().isLength({ min: 3, max: 20 }),
      body('password').isString().isLength({ min: 8, max: 20 })
    ];
  }

  protected async execute(data: RequestData<RegisterRequest, unknown, unknown>): Promise<void> {
    const exists = await UserRepository.existsBy({ username: data.body.username });
    if (exists) {
      throw new BadRequestException({ message: 'Username already exists' });
    }
    const salt = generateSalt();
    const hash = hashText(data.body.password, salt);
    await UserRepository.save({
      username: data.body.username,
      password: hash,
      salt
    });
  }
}