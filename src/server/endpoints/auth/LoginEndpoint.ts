import { body, ValidationChain } from "express-validator";
import { PostEndpoint } from "../Endpoint";
import { RequestData } from "../../types/RequestData";
import { LoginRequest } from "@shared/types/request";
import { LoginResponse } from "@shared/types/response";
import { UserRepository } from "../../repositories/UserRepository";
import { hashText, signJwt, signUserJwt } from "../../lib/security";
import { BadRequestException } from "../../exceptions/BadRequestException";

export class LoginEndpoint extends PostEndpoint {
  constructor() {
    super('/login');
  }

  protected getValidator(): ValidationChain[] {
    return [
      body('username').isString(),
      body('password').isString()
    ]
  }

  protected async execute(data: RequestData<LoginRequest, unknown, unknown>): Promise<LoginResponse> {
    const user = await UserRepository.findOneBy({ username: data.body.username });
    if (!user) {
      throw new BadRequestException({ message: 'Invalid username and/or password' });
    }
    const hash = hashText(data.body.password, user.salt);
    if (hash !== user.password) {
      throw new BadRequestException({ message: 'Invalid username and/or password' });
    }

    const accessToken = signUserJwt({ userId: user.id, username: user.username });
    const refreshToken = signJwt({ userId: user.id, username: user.username }, '7d');
    return {
      accessToken,
      refreshToken
    };
  }
}