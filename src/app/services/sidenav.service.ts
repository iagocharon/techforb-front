import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({ providedIn: 'root' })
export class SidenavService {
  private sidenav!: MatSidenav;

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public open() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';

    document.getElementById('sidenav-content')?.classList.add('sidenav-open');
    console.log(document.getElementById('sidenav-content'));
    return this.sidenav.open();
  }

  public close() {
    document.getElementsByTagName('body')[0].style.overflow = 'auto';
    document
      .getElementById('sidenav-content')
      ?.classList.remove('sidenav-open');
    return this.sidenav.close();
  }

  public toggle(): void {
    let open = document
      .getElementById('sidenav-content')
      ?.classList.contains('sidenav-open');
    console.log(open);
    if (open) {
      document.getElementsByTagName('body')[0].style.overflow = 'auto';
    } else {
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    }
    document
      .getElementById('sidenav-content')
      ?.classList.toggle('sidenav-open');
    this.sidenav.toggle();
  }
}
