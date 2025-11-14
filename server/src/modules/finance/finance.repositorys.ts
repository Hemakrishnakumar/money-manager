import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Transaction } from 'typeorm';
import { Account } from './entities/account.entity';
import { Injectable } from '@nestjs/common';
@Injectable()
export class FinanceRepository {
  constructor(
    @InjectRepository(Account) private accountRepo: Repository<Account>,
  ) {}
  async findAccountByName(name: string): Promise<Account | null> {
    return await this.accountRepo.findOne({ where: { name: name } });
  }
  async createAccount(account: Account): Promise<Account> {
    return await this.accountRepo.save(account);
  }
  async getAllAccountsByUserId(userId: number) {
      await this.accountRepo.find({ where: { userId } });
      return 
  }
  async deleteAccountById(id: number) {
    return await this.accountRepo.softDelete(id);
  }
}
