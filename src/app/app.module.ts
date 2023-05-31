import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksViewComponent, DialogOverviewExampleDialog, DialogRateABook } from './modules/books/books-view/books-view.component';
import { BookCreateComponent } from './modules/books/book-create/book-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { BookOrderComponent } from './modules/books/book-order/book-order.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { RegistrationComponent } from './modules/user/registration/registration.component';
import { LoginComponent } from './modules/user/login/login.component';
import { TokenInterceptor } from './utils/tocken.interceptor';
import { RecommendationPageComponent } from './modules/books/recommendation-page/recommendation-page.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksViewComponent,
    BookCreateComponent,
    NavbarComponent,
    BookOrderComponent,
    DialogOverviewExampleDialog,
    DialogRateABook,
    RegistrationComponent,
    LoginComponent,
    RecommendationPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule,
    MatRadioModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
