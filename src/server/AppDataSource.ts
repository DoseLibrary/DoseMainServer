import { DataSource } from "typeorm";
import { User } from "./models/UserModel";
import { ContentServer } from "./models/ContentServerModel";

export const AppDataSource = new DataSource({
  synchronize: true,
  logging: false,
  migrations: [],
  subscribers: [],
  type: "sqlite",
  database: "db.sqlite",
  entities: [
    User,
    ContentServer,
  ],
});