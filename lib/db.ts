import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Weather } from "@/entities/Weather";
import { WeatherHour } from "@/entities/WeatherHour";
import { Todo } from "@/entities/Todo";
import { TodoRecurrence } from "@/entities/TodoRecurrence";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.db", 
    synchronize: true,
    logging: true,
    entities: [User, Weather, WeatherHour, Todo, TodoRecurrence],
    subscribers: [],
    migrations: [],
});

export const getDatabaseConnection = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
};