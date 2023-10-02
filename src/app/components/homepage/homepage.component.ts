import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/User.model';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { TransferComponent } from './transfer/transfer.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  user!: User;

  monthlyIncome: number = 0;
  monthlyExpenses: number = 0;
  lastMonthIncome: number = 0;
  lastMonthExpenses: number = 0;

  increasedIncome!: boolean;
  increasedExpenses!: boolean;

  incomeChange!: string;
  expenseChange!: string;

  hiddenBalance: boolean = false;

  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getMonthlys();
  }

  async getUser() {
    this.user = await firstValueFrom(
      this.userService.getUser(this.tokenService.getId())
    );
  }

  async getMonthlys() {
    this.monthlyIncome = await firstValueFrom(
      this.userService.getMonthlyIncome(this.tokenService.getId())
    );
    this.monthlyExpenses = await firstValueFrom(
      this.userService.getMonthlyExpenses(this.tokenService.getId())
    );
    this.lastMonthIncome = await firstValueFrom(
      this.userService.getLastMonthIncome(this.tokenService.getId())
    );
    this.lastMonthExpenses = await firstValueFrom(
      this.userService.getLastMonthExpenses(this.tokenService.getId())
    );

    this.increasedIncome = this.monthlyIncome > this.lastMonthIncome;
    this.increasedExpenses = this.monthlyExpenses > this.lastMonthExpenses;

    if (this.increasedIncome) {
      this.incomeChange = '+';
    } else {
      this.incomeChange = '';
    }
    if (this.lastMonthIncome == 0) {
      this.lastMonthIncome = this.monthlyIncome - this.lastMonthIncome;
    }
    let percentageIncome =
      ((this.monthlyIncome - this.lastMonthIncome) / this.lastMonthIncome) *
      100;

    this.incomeChange += percentageIncome.toFixed(2);
    this.incomeChange += '%';

    if (this.increasedExpenses) {
      this.expenseChange = '+';
    } else {
      this.expenseChange = '';
    }

    if (this.lastMonthExpenses == 0) {
      this.lastMonthExpenses = this.monthlyExpenses - this.lastMonthExpenses;
    }

    let percentageExpenses =
      ((this.monthlyExpenses - this.lastMonthExpenses) /
        this.lastMonthExpenses) *
      100;
    this.expenseChange += percentageExpenses.toFixed(2);
    this.expenseChange += '%';
  }

  normalizeMoney(money: number) {
    return money.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
    });
  }

  toggleVisibility() {
    this.hiddenBalance = !this.hiddenBalance;
  }

  deposit() {
    this.dialog.open(DepositComponent);
  }

  withdraw() {
    this.dialog.open(WithdrawComponent);
  }

  transfer() {
    // this.dialog.open(TransferComponent);
  }
}
