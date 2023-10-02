import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { Transaction } from 'src/app/models/Transaction';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  transactions: Transaction[] = [];

  transactionsDatasource: MatTableDataSource<Transaction> =
    new MatTableDataSource();

  displayedColumns: string[] = ['type', 'name', 'amount', 'date'];

  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(
    private tokenService: TokenService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getTransactions();
  }

  async getTransactions() {
    let incoming = await firstValueFrom(
      this.userService.getWeeklyIncomingTransactions(this.tokenService.getId())
    );
    let outgoing = await firstValueFrom(
      this.userService.getWeeklyOutgoingTransactions(this.tokenService.getId())
    );

    this.transactions = incoming.concat(outgoing);

    this.transactions.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    this.transactionsDatasource.data = this.transactions;
    this.transactionsDatasource.paginator = this.paginator;
  }

  normalizeMoney(money: number) {
    return money.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
    });
  }

  getDate(date: Date) {
    return new Date(date).toLocaleDateString('es-AR');
  }

  getTime(date: Date) {
    return new Date(date).toLocaleTimeString('es-AR');
  }
}
