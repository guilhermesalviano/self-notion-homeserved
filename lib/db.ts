import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.db", 
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
});

export const getDatabaseConnection = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
};