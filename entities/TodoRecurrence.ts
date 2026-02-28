import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class TodoRecurrence {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  repeat!: boolean;

  @Column()
  weeklyInterval!: number;

  @Column("simple-array")
  weeklyDays!: number[];

  @Column({ type: "varchar", nullable: true })
  weeklyEnd!: number | null;
}