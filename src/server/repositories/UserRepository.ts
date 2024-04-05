import { AppDataSource } from "../AppDataSource";
import { User } from "../models/UserModel";

export const UserRepository = AppDataSource.getRepository(User).extend({ });
