import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookCreateComponent } from './modules/books/book-create/book-create.component';
import { BooksViewComponent } from './modules/books/books-view/books-view.component';

const routes: Routes = [
  {path: '', component: BooksViewComponent},
  {path: 'create', component: BookCreateComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
