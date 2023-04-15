import { Component } from '@angular/core';
import { Book } from '../model';
import { BooksServiceService } from '../books-service.service';

@Component({
  selector: 'app-books-view',
  templateUrl: './books-view.component.html',
  styleUrls: ['./books-view.component.css']
})
export class BooksViewComponent {

  public books: Book[] = [];

  constructor(
    private bookService: BooksServiceService
  ) {}


  ngOnInit() {
    this.bookService.getBooks().subscribe(response => this.books = response);
  }

}
