import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDto } from 'src/app/models/UserDto';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  formLogin = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    dni: new FormControl('', [Validators.required]),
  });

  signup() {
    let user = new UserDto();
    user.username = this.formLogin.value.username!;
    user.password = this.formLogin.value.password!;
    user.name = this.formLogin.value.name!;
    user.email = this.formLogin.value.email!;
    user.phone = this.formLogin.value.phone!;
    user.dni = this.formLogin.value.dni!;
    this.authService.signup(user).subscribe(
      (data) => {
        this.authService.login(user).subscribe(
          (data) => {
            this.tokenService.setToken(data.token);
            this.tokenService.setId(data.id);
            this.tokenService.setUsername(data.username);
            Swal.fire({
              icon: 'success',
              title: 'Registro exitoso',
              text: 'Ya podés disfrutar de la plataforma.',
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              window.location.reload();
            });
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Inicio de sesión fallido',
              text: 'No se pudo iniciar sesión. Verificá tus datos.',
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              window.location.reload();
            });
          }
        );
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Registro fallido',
          text: 'No se pudo registrar. Verificá tus datos.',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.reload();
        });
      }
    );
  }
}
