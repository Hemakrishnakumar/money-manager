import {
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Account } from './account.entity';
import { User } from 'src/modules/user/entities/user.entity';

export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float', default: 0 })
  amount: number;

  @Column({ nullable: true })
  description: string;

  @Column()
  category: string;

  @Column()
  userId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Account, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'AccountId' })
  account: Account;
}
