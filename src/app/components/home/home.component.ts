import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  mobile!: boolean;

  @ViewChild('sidenav') public sidenav!: MatSidenav;

  constructor(
    private authService: AuthService,
    private sidenavService: SidenavService
  ) {}

  ngOnInit(): void {
    this.checkMobile();
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

  logout() {
    this.authService.logout();
  }

  checkMobile() {
    if (window.innerWidth <= 768) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }

  closeSidenav() {
    if (this.mobile) {
      this.sidenav.close();
    }
  }
}
