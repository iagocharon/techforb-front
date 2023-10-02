import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Angylar Material
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';

import { LoginComponent } from './components/auth/login/login.component';
import { AuthComponent } from './components/auth/auth.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { interceptorProvider } from './services/interceptor.service';
import { CardsComponent } from './components/cards/cards.component';
import { AddCardComponent } from './components/cards/add-card/add-card.component';
import { DepositComponent } from './components/homepage/deposit/deposit.component';
import { WithdrawComponent } from './components/homepage/withdraw/withdraw.component';
import { TransferComponent } from './components/homepage/transfer/transfer.component';
import { MonthlyIncomeComponent } from './components/homepage/monthly-income/monthly-income.component';
import { MonthlyExpensesComponent } from './components/homepage/monthly-expenses/monthly-expenses.component';
import { HistoryComponent } from './components/homepage/history/history.component';
import { WeeklyBalanceComponent } from './components/homepage/weekly-balance/weekly-balance.component';
import { EditProfileComponent } from './components/header/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthComponent,
    SignupComponent,
    HomeComponent,
    HeaderComponent,
    HomepageComponent,
    CardsComponent,
    AddCardComponent,
    DepositComponent,
    WithdrawComponent,
    TransferComponent,
    MonthlyIncomeComponent,
    MonthlyExpensesComponent,
    HistoryComponent,
    WeeklyBalanceComponent,
    EditProfileComponent,
  ],
  imports: [
    //Angular Material
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule,
  ],
  providers: [interceptorProvider, { provide: LOCALE_ID, useValue: 'es-AR' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
