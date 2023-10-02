import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCardComponent } from './add-card/add-card.component';
import { User } from 'src/app/models/User.model';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  user!: User;

  constructor(
    public dialog: MatDialog,
    private tokenService: TokenService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  async getUser() {
    this.user = await firstValueFrom(
      this.userService.getUser(this.tokenService.getId())
    );
  }

  addCard() {
    this.dialog.open(AddCardComponent);
  }

  cardNumber(number: string) {
    let visibleChars = number.substring(number.length - 4);
    let hiddenChars = number.slice(0, -4).replace(/\d/g, '*');
    return hiddenChars + visibleChars;
  }

  deleteCard(cardId: number) {
    //cartel de swal que pregunte si esta seguro
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás recuperar esta tarjeta',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService
          .deleteCard(this.tokenService.getId(), cardId)
          .subscribe(
            (data) => {
              //cartel de swal que diga que se borro
              Swal.fire({
                icon: 'success',
                title: 'Tarjeta eliminada',
                text: 'La tarjeta fue eliminada exitosamente.',
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                window.location.reload();
              });
            },
            (error) => {
              console.log(error);
            }
          );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }
}
