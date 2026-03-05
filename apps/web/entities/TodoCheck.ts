import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from "typeorm";
import { Todo } from "./Todo";

@Entity("todo_checks")
export class TodoCheck {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  timestamp!: string;

  @Column({ type: "tinyint", width: 1, default: 0 })
  checked!: number;

  @OneToOne(() => Todo)
  @JoinColumn()
  todo!: Todo;
}