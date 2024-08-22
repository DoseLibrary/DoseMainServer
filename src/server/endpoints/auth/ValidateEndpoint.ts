import { body, ValidationChain } from "express-validator";
import { PostEndpoint } from "../Endpoint";
import { RequestData } from "../../types/RequestData";
import { verifyJwt } from "../../lib/security";
import { NotAuthorizedException } from "../../exceptions/NotAuthorizedException";
import { UserRepository } from "../../repositories/UserRepository";

interface Body {
  token: string;
}

export class ValidateEndpoint extends PostEndpoint {
  constructor() {
    super('/validate');
  }

  protected getValidator(): ValidationChain[] {
    return [
      body('token').isJWT()
    ];
  }

  protected async execute(data: RequestData<Body, unknown, unknown>): Promise<unknown> {
    try {
      const decoded = verifyJwt(data.body.token);
      const user = await UserRepository.findOneBy({ id: decoded.userId });
      if (!user) {
        throw new NotAuthorizedException();
      }

      return {
        valid: true,
        username: user.username
      };
    } catch (error) {
      throw new NotAuthorizedException();
    }

  }
}