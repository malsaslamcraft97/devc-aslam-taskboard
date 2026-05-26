import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ default: 'My Task Board' })
  name!: string;

  @Column({ nullable: true, type: 'text' })
  description!: string | null;

  @OneToMany(() => Task, (task) => task.board, { cascade: true })
  tasks!: Task[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
