import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/User.model';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user!: User;

  mobile!: boolean;

  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private dialog: MatDialog,
    private sidenavService: SidenavService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.checkMobile();
  }

  getUser() {
    this.userService.getUser(this.tokenService.getId()).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editProfile() {
    this.dialog.open(EditProfileComponent, {
      data: this.user,
    });
  }

  checkMobile() {
    if (window.innerWidth <= 768) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }

  toggleSidenav() {
    this.sidenavService.toggle();
  }
}
