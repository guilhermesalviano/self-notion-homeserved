import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { WeatherHour } from "./WeatherHour";

@Entity()
export class Weather {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  city!: string;

  @Column()
  temp!: number;

  @Column()
  feels!: number;

  @Column()
  condition!: string;

  @Column({ type: "simple-json" })
  hours!: { time: string; temp: number; icon: string; }[];
}