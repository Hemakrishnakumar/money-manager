import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { FinanceService } from './finance.service';
import { FinanceController } from './finance.controller';
import { Transaction } from './entities/transaction.entity';
import { User } from '../user/entities/user.entity';
import { FinanceRepository } from './finance.repositorys';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Account, User])],
  controllers: [FinanceController],
  providers: [FinanceService,FinanceRepository],
  exports: [FinanceService],
})
export class FinanceModule {}
