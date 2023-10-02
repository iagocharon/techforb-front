import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/models/UserDto';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  login() {
    let user = new UserDto();
    user.username = this.formLogin.value.username!;
    user.password = this.formLogin.value.password!;
    this.authService.login(user).subscribe(
      (data) => {
        this.tokenService.setToken(data.token);
        this.tokenService.setId(data.id);
        this.tokenService.setUsername(data.username);
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
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
          text: 'No se pudo iniciar sesión. Verificá tus credenciales.',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.reload();
        });
      }
    );
  }
}
