import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CardDto } from 'src/app/models/CardDto.model';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss'],
})
export class AddCardComponent implements OnInit {
  card = new FormGroup({
    name: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    cvv: new FormControl('', [Validators.required]),
    issuer: new FormControl('', [Validators.required]),
    month: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
  });

  months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  years: number[] = [];

  constructor(
    private userService: UserService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.setDateOptions();
  }

  setDateOptions() {
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 10; i++) {
      this.years.push(currentYear + i);
    }
  }

  addCard() {
    if (this.card.invalid) {
      return;
    }
    let cardDto = new CardDto();
    cardDto.name = this.card.value.name!;
    cardDto.number = this.card.value.number!;
    cardDto.cvv = this.card.value.cvv!;
    cardDto.issuer = this.card.value.issuer!;
    cardDto.expirationDate =
      this.card.value.month! + '/' + this.card.value.year!;

    console.log(cardDto);
    this.userService
      .addCard(this.tokenService.getId(), cardDto)
      .subscribe((data) => {
        Swal.fire({
          icon: 'success',
          title: 'Tarjeta Agregada',
          text: 'Ya podés utilizarla.',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.reload();
        });
      });
  }

  setIssuer(issuer: string) {
    this.card.controls['issuer'].setValue(issuer);
  }

  isSelected(issuer: string) {
    return this.card.value.issuer === issuer;
  }
}
