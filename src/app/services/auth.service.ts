import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto } from '../models/UserDto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = environment.apiUrl + environment.authUrl;
  constructor(private httpClient: HttpClient) {}

  public signup(user: UserDto): Observable<any> {
    return this.httpClient.post(this.apiUrl + 'signup', user);
  }

  public login(user: UserDto): Observable<any> {
    return this.httpClient.post(this.apiUrl + 'login', user);
  }

  public logout(): void {
    window.sessionStorage.clear();
    Swal.fire({
      icon: 'success',
      title: 'Sesión Cerrada',
      text: 'Cerraste sesión correctamente',
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      window.location.reload();
    });
  }

  public isAuthenticated(): boolean {
    const authToken = sessionStorage.getItem('AuthToken');
    return authToken !== null;
  }
}
