import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FinanceService } from './finance.service';
import { CreateAccountDto } from './dto/createAccount.dto';
import { Account } from './entities/account.entity';
import { JwtGuard } from 'src/guards/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user';

@Controller('api/v1/accounts')
export class FinanceController {
  constructor(private financeService: FinanceService) {}

  @Post()
  @UseGuards(JwtGuard)
  async createAccount(
    @Body() account: CreateAccountDto,
    @CurrentUser() currentUser: any,
  ) {
    const userId = currentUser.id;
    return this.financeService.createAccount({
      ...account,
      userId: userId,
    } as any);
  }
  @Get('/:userId')
  async getAllAccountsByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return await this.financeService.getAllAccountsByUserId(userId);
  }
  @Delete('/:id')
  async deleteAccount(@Param('id', ParseIntPipe) id: number) {
    return await this.financeService.deleteAccountById(id);
  }
}
