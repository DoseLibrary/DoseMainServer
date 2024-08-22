import { ValidationChain } from "express-validator";
import { GetEndpoint } from "../Endpoint";
import { RequestData } from "../../types/RequestData";
import { UserRepository } from "../../repositories/UserRepository";
import { ListContentServerResponse } from "@shared/types/response";

export class ListContentServersEndpoint extends GetEndpoint {
  constructor() {
    super('/list');
  }

  protected getValidator(): ValidationChain[] {
    return [];
  }

  protected async execute(data: RequestData<never, never, never>): Promise<ListContentServerResponse[]> {
    const user = await UserRepository.findOneBy({ id: data.userId });
    if (!user) {
      throw new Error('User not found');
    }

    const contentServers = user.contentServers;
    return contentServers.map(server => ({
      id: server.id,
      name: server.name,
      url: server.url
    }));
  }
}