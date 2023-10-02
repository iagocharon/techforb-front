import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = environment.apiUrl + environment.transactionUrl;

  constructor(private httpClient: HttpClient) {}

  public deposit(id: number, amount: number): Observable<any> {
    let double = parseFloat(amount.toString());
    return this.httpClient.put(this.apiUrl + id + '/deposit', double);
  }

  public withdraw(id: number, amount: number): Observable<any> {
    let double = parseFloat(amount.toString());
    return this.httpClient.put(this.apiUrl + id + '/withdraw', double);
  }

  public transfer(
    id: number,
    amount: number,
    targetId: number
  ): Observable<any> {
    let double = parseFloat(amount.toString());
    return this.httpClient.put(
      this.apiUrl + id + '/transfer/' + targetId,
      double
    );
  }
}
