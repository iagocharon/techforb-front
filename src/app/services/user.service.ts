import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDto } from '../models/UserDto';
import { CardDto } from '../models/CardDto.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl + environment.userUrl;

  constructor(private httpClient: HttpClient) {}

  public getUsers(): Observable<any> {
    return this.httpClient.get(this.apiUrl + 'list');
  }

  public getUser(id: number): Observable<any> {
    return this.httpClient.get(this.apiUrl + id + '/detail');
  }

  public getBalance(id: number): Observable<any> {
    return this.httpClient.get(this.apiUrl + id + '/balance');
  }

  public getTransactions(id: number): Observable<any> {
    return this.httpClient.get(this.apiUrl + id + '/transactions');
  }

  public getMonthlyIncomingTransactions(id: number): Observable<any> {
    return this.httpClient.get(
      this.apiUrl + id + '/monthly-incoming-transactions'
    );
  }

  public getMonthlyOutgoingTransactions(id: number): Observable<any> {
    return this.httpClient.get(
      this.apiUrl + id + '/monthly-outgoing-transactions'
    );
  }

  public getWeeklyIncomingTransactions(id: number): Observable<any> {
    return this.httpClient.get(
      this.apiUrl + id + '/weekly-incoming-transactions'
    );
  }

  public getWeeklyOutgoingTransactions(id: number): Observable<any> {
    return this.httpClient.get(
      this.apiUrl + id + '/weekly-outgoing-transactions'
    );
  }

  public getLastWeekIncomingTransactions(id: number): Observable<any> {
    return this.httpClient.get(
      this.apiUrl + id + '/last-week-incoming-transactions'
    );
  }

  public getLastWeekOutgoingTransactions(id: number): Observable<any> {
    return this.httpClient.get(
      this.apiUrl + id + '/last-week-outgoing-transactions'
    );
  }

  public getMonthlyIncome(id: number): Observable<any> {
    return this.httpClient.get(this.apiUrl + id + '/monthly-income');
  }

  public getLastMonthIncome(id: number): Observable<any> {
    return this.httpClient.get(this.apiUrl + id + '/last-month-income');
  }

  public getMonthlyExpenses(id: number): Observable<any> {
    return this.httpClient.get(this.apiUrl + id + '/monthly-expenses');
  }

  public getLastMonthExpenses(id: number): Observable<any> {
    return this.httpClient.get(this.apiUrl + id + '/last-month-expenses');
  }

  public addCard(id: number, card: CardDto): Observable<any> {
    return this.httpClient.put(this.apiUrl + id + '/add-card', card);
  }

  public deleteCard(userId: number, cardId: number): Observable<any> {
    return this.httpClient.delete(
      this.apiUrl + userId + '/delete-card/' + cardId
    );
  }

  public updateUser(id: number, user: UserDto): Observable<any> {
    return this.httpClient.put(this.apiUrl + id + '/update', user);
  }

  public deleteUser(id: number): Observable<any> {
    return this.httpClient.delete(this.apiUrl + id + '/delete');
  }
}
