import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Transaction } from 'src/app/models/Transaction';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-monthly-income',
  templateUrl: './monthly-income.component.html',
  styleUrls: ['./monthly-income.component.scss'],
})
export class MonthlyIncomeComponent implements OnInit {
  transactions: Transaction[] = [];

  labels: string[] = [];

  data: number[] = [];

  public lineChartData!: ChartConfiguration<'line'>['data'];
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        display: false,
      },
      y: {
        grid: {
          display: false,
        },
        display: false,
        ticks: {
          padding: 20,
        },
        beginAtZero: true,
      },
    },
  };
  public lineChartLegend = false;

  constructor(
    private tokenService: TokenService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getTransactions();
  }

  async getTransactions() {
    this.transactions = await firstValueFrom(
      this.userService.getMonthlyIncomingTransactions(this.tokenService.getId())
    );

    let currentDay = new Date();
    currentDay.setDate(currentDay.getDate() - 30);

    this.data = [];
    this.labels = [];

    for (let i = 1; i <= 30; i++) {
      let total = 0;
      for (let j = 0; j < this.transactions.length; j++) {
        let currentDate = new Date(this.transactions[j].date);

        if (
          currentDate.getFullYear() == currentDay.getFullYear() &&
          currentDate.getMonth() == currentDay.getMonth() &&
          currentDate.getDate() == currentDay.getDate()
        ) {
          total += this.transactions[j].amount;
        }
      }
      this.data.push(total);
      this.labels.push(i.toString());
      currentDay.setDate(currentDay.getDate() + 1);
    }

    this.lineChartData = {
      labels: this.labels,
      datasets: [
        {
          data: this.data,
          label: 'Series A',
          fill: true,
          tension: 0.5,
          borderColor: '#ff5164',
          borderWidth: 2,
          backgroundColor: (context) => {
            const bgColor = ['#ff5164', '#ff516440', '#ff516400'];
            if (!context.chart.chartArea) {
              return;
            }

            const {
              ctx,
              data,
              chartArea: { top, bottom },
            } = context.chart;
            const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
            gradientBg.addColorStop(0, bgColor[0]);
            gradientBg.addColorStop(0.5, bgColor[1]);
            gradientBg.addColorStop(1, bgColor[2]);
            return gradientBg;
          },
          pointBackgroundColor: 'transparent',
          pointBorderColor: 'transparent',
          pointBorderWidth: 0,
          pointHitRadius: 0,
          pointRadius: 0,
        },
      ],
    };
  }
}
