import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { UserDto } from 'src/app/models/UserDto';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  user = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    dni: new FormControl('', [Validators.required]),
  });

  constructor(
    private tokenService: TokenService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  async getUser() {
    let currentUser = await firstValueFrom(
      this.userService.getUser(this.tokenService.getId())
    );

    this.user.setValue({
      name: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone,
      dni: currentUser.dni,
    });
  }

  updateProfile() {
    let userDto = new UserDto();
    userDto.name = this.user.value.name!;
    userDto.email = this.user.value.email!;
    userDto.phone = this.user.value.phone!;
    userDto.dni = this.user.value.dni!;

    this.userService.updateUser(this.tokenService.getId(), userDto).subscribe(
      (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Perfil actualizado',
          text: 'Tu perfil se modificó correctamente.',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.reload();
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Edición fallida',
          text: 'No se pudo editar tu perfil. Verificá tus datos.',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }
}
