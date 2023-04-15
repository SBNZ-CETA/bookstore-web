import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksViewComponent } from './modules/books/books-view/books-view.component';

const routes: Routes = [
  {path: '', component: BooksViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
