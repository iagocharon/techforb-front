import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { firstValueFrom } from 'rxjs';
import { Transaction } from 'src/app/models/Transaction';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-weekly-balance',
  templateUrl: './weekly-balance.component.html',
  styleUrls: ['./weekly-balance.component.scss'],
})
export class WeeklyBalanceComponent implements OnInit {
  transactions: Transaction[] = [];

  public barChartData!: ChartConfiguration<'bar'>['data'];
  public barChartOptions!: ChartOptions<'bar'>;
  public barChartLegend = false;
  public barChartPlugins = [];

  constructor(
    private tokenService: TokenService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.setOptions();
    this.getTransactions();
  }

  setOptions() {
    if (window.innerWidth > 768) {
      this.barChartOptions = {
        responsive: false,
        scales: {
          x: {
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value, index, ticks) => {
                return value.toLocaleString('es-AR', {
                  style: 'currency',
                  currency: 'ARS',
                });
              },
              stepSize: 20000,
              padding: 20,
            },
            border: {
              display: false,
            },
          },
        },
      };
    } else {
      this.barChartOptions = {
        indexAxis: 'y',
        responsive: false,
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              display: false,
              stepSize: 20000,
            },
            border: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
            ticks: {
              padding: 10,
            },
          },
        },
      };
    }
  }

  async getTransactions() {
    let thisWeekIncoming = await firstValueFrom(
      this.userService.getWeeklyIncomingTransactions(this.tokenService.getId())
    );
    let thisWeekOutgoing = await firstValueFrom(
      this.userService.getWeeklyOutgoingTransactions(this.tokenService.getId())
    );
    let lastWeekIncoming = await firstValueFrom(
      this.userService.getLastWeekIncomingTransactions(
        this.tokenService.getId()
      )
    );
    let lastWeekOutgoing = await firstValueFrom(
      this.userService.getLastWeekOutgoingTransactions(
        this.tokenService.getId()
      )
    );

    let thisWeek = thisWeekIncoming.concat(thisWeekOutgoing);
    let lastWeek = lastWeekIncoming.concat(lastWeekOutgoing);

    console.log(thisWeek);

    let currentDay = new Date();
    currentDay.setDate(currentDay.getDate() - 7);

    let thisWeekData = [];
    let lastWeekData = [];

    for (let i = 1; i <= 7; i++) {
      let total = 0;
      for (let j = 0; j < thisWeek.length; j++) {
        let currentDate = new Date(thisWeek[j].date);

        if (
          currentDate.getFullYear() == currentDay.getFullYear() &&
          currentDate.getMonth() == currentDay.getMonth() &&
          currentDate.getDate() == currentDay.getDate()
        ) {
          total += thisWeek[j].amount;
        }
      }
      thisWeekData.push(total);
      currentDay.setDate(currentDay.getDate() + 1);
    }

    currentDay = new Date();
    currentDay.setDate(currentDay.getDate() - 14);
    for (let i = 1; i <= 7; i++) {
      let total = 0;
      for (let j = 0; j < lastWeek.length; j++) {
        let currentDate = new Date(lastWeek[j].date);
        if (
          currentDate.getFullYear() == currentDay.getFullYear() &&
          currentDate.getMonth() == currentDay.getMonth() &&
          currentDate.getDate() == currentDay.getDate()
        ) {
          total += lastWeek[j].amount;
        }
      }
      lastWeekData.push(total);
      currentDay.setDate(currentDay.getDate() + 1);
    }
    let shorts;
    if (window.innerWidth <= 768) {
      shorts = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    } else {
      shorts = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    }
    let currentDate = new Date();
    let labels = [];
    for (let i = 1; i <= 7; i++) {
      currentDate.setDate(currentDate.getDate() + 1);
      labels.push(shorts[currentDate.getDay()]);
    }

    if (window.innerWidth <= 768) {
      this.barChartData = {
        labels: labels,
        datasets: [
          {
            data: lastWeekData,
            label: 'Semana Pasada',
            backgroundColor: '#ff516480',
            borderRadius: {
              topRight: 20,
              bottomRight: 20,
            },
          },
          {
            data: thisWeekData,
            label: 'Esta Semana',
            backgroundColor: '#ff5164',
            borderRadius: {
              topRight: 20,
              bottomRight: 20,
            },
          },
        ],
      };
    } else {
      this.barChartData = {
        labels: labels,
        datasets: [
          {
            data: lastWeekData,
            label: 'Semana Pasada',
            backgroundColor: '#ff516480',
            borderRadius: {
              topLeft: 20,
              topRight: 20,
            },
          },
          {
            data: thisWeekData,
            label: 'Esta Semana',
            backgroundColor: '#ff5164',
            borderRadius: {
              topLeft: 20,
              topRight: 20,
            },
          },
        ],
      };
    }
  }
}
