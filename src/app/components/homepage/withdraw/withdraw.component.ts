import { Component } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { TransactionService } from 'src/app/services/transaction.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss'],
})
export class WithdrawComponent {
  ammount: number = 0;

  constructor(
    private tokenService: TokenService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {}

  withdraw() {
    this.transactionService
      .withdraw(this.tokenService.getId(), this.ammount)
      .subscribe(
        (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Retiro realizado',
            text: 'El retiro se realizó con éxito.',
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
            text: 'Hubo un error al realizar el retiro.',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
  }
}
