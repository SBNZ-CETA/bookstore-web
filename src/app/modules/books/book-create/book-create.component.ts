import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksServiceService } from '../books-service.service';
import { Book, BookCreate } from '../model';

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

  public titleControl = new FormControl<string>('', Validators.required);
	public writerControl = new FormControl<string>('', Validators.required);
	public costControl = new FormControl<number>(0, {nonNullable: true});

  public validateFields() {
    return this.titleControl.valid &&
      this.writerControl.valid &&
      this.costControl.valid;
  }

  public createBook() {
    this.bookService.createBook(this.book).subscribe(() => {
      alert('Successfully Created');
      this.router.navigate(['/']);
    });
  }
}
