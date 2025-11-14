import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { FinanceRepository } from './finance.repositorys';

@Injectable()
export class FinanceService {
  constructor(private FinanceRepository: FinanceRepository) {}

  async createAccount(account: Account) {
    const accountExist = await this.FinanceRepository.findAccountByName(
      account.name,
    );
    if (accountExist) {
      throw new ConflictException(
        `Account already exist with this name ${account.name} `,
      );
    }
    const newAccount = await this.FinanceRepository.createAccount(account);
    if (!newAccount) {
      throw new BadRequestException('something went wrong try again');
    }
    return { message: 'accounts created successfully', data: newAccount };
  }

  async getAllAccountsByUserId(userId: number) {
    const accounts =
      await this.FinanceRepository.getAllAccountsByUserId(userId);
    return { message: 'accounts fetched successfully', data: accounts };
  }
  async deleteAccountById(id: number) {
    const result = await this.FinanceRepository.deleteAccountById(id);
    if (!result.affected) {
      throw new BadRequestException('failed to delete the account try again');
    }
    return 'account deleted successfully';
  }
}
