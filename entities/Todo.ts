import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from "typeorm";
import { TodoRecurrence } from "./TodoRecurrence";

@Entity("todos")
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  checked!: boolean;

  @Column({ type: "varchar", nullable: true })
  priority!: string | null;

  @Column()
  createdAt!: Date;

  @OneToOne(() => TodoRecurrence, { cascade: true })
  @JoinColumn()
  recurrence!: TodoRecurrence;
}