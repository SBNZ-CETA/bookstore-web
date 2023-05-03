import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookCreateComponent } from './modules/books/book-create/book-create.component';
import { BookOrderComponent } from './modules/books/book-order/book-order.component';
import { BooksViewComponent } from './modules/books/books-view/books-view.component';

const routes: Routes = [
  {path: '', component: BooksViewComponent},
  {path: 'create', component: BookCreateComponent},
  {path: 'order', component: BookOrderComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
