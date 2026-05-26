import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Board } from '../../boards/entities/board.entity';

export type TaskStatus = 'todo' | 'in-progress' | 'completed' | 'wont-do';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column({ nullable: true, type: 'text' })
  description!: string | null;

  @Column({ default: '📝' })
  icon!: string;

  @Column({ default: 'todo' })
  status!: TaskStatus;

  @Column()
  boardId!: string;

  @ManyToOne(() => Board, (board) => board.tasks, { onDelete: 'CASCADE' })
  board!: Board;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
