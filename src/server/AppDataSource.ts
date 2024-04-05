import { DataSource } from "typeorm";
import { User } from "./models/UserModel";

export const AppDataSource = new DataSource({
  synchronize: true,
  logging: false,
  migrations: [],
  subscribers: [],
  type: "sqlite",
  database: "db.sqlite",
  entities: [User],
});