import { AppDataSource } from "../AppDataSource";
import { ContentServer } from "../models/ContentServerModel";

export const ContentServerRepository = AppDataSource.getRepository(ContentServer).extend({ });
