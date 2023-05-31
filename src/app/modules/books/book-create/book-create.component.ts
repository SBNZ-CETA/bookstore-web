import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksServiceService } from '../books-service.service';
import { Book, BookCreate } from '../model';
import { BookCategory } from '../BookCategory';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent {
  public book = <BookCreate>{};

  constructor(
    private bookService: BooksServiceService,
    private router: Router
  ) {}

  public category:string = '';
  public titleControl = new FormControl<string>('', Validators.required);
	public writerControl = new FormControl<string>('', Validators.required);
	public costControl = new FormControl<number>(0, {nonNullable: true});
  public categoryControl = new FormControl<string>('', Validators.required);


  public validateFields() {
    return this.titleControl.valid &&
      this.writerControl.valid &&
      this.costControl.valid;
  }

  private setCategory() {
    this.book.category.name = this.category
  }

  public createBook() {
    this.setCategory();
    this.bookService.createBook(this.book).subscribe(() => {
      alert('Successfully Created');
      this.router.navigate(['/']);
    });
  }
}
