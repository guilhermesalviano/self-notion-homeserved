import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class WeatherHour {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  time!: string;

  @Column()
  temp!: number;

  @Column()
  icon!: string;
}