import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { TransactionService } from 'src/app/services/transaction.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
})
export class DepositComponent implements OnInit {
  ammount: number = 0;

  constructor(
    private tokenService: TokenService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {}

  deposit() {
    this.transactionService
      .deposit(this.tokenService.getId(), this.ammount)
      .subscribe(
        (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Depósito realizado',
            text: 'El depósito se realizó con éxito.',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.reload();
          });
        },
        (error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al realizar el depósito.',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
  }
}
