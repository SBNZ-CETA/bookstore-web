import { Component } from '@angular/core';
import { BooksServiceService } from '../books-service.service';
import { Book, BookOrder } from '../model';
import { ActivatedRoute } from '@angular/router';
import { OrderServiceService } from '../order-service.service';

@Component({
  selector: 'app-book-order',
  templateUrl: './book-order.component.html',
  styleUrls: ['./book-order.component.css']
})
export class BookOrderComponent {

  public books: BookOrder[] = [];
  public discountedPrice: number = 0;
  public checkout: boolean = false;

  constructor(private route: ActivatedRoute,
    private bookService: BooksServiceService, private orderService: OrderServiceService) {}


  ngOnInit() {
    // this.bookService.getBooks().subscribe(response => this.books = response);
    this.books = JSON.parse(localStorage.getItem("items") || "")
    
  }
  checkoutBooks(): void{
    this.checkout = true
    // this.orderService.orderBook(this.sum(), 2, this.books).subscribe(data => {
    //   this.discountedPrice = data.discountedPrice;
    //   console.log(data)
    // })
  }

  orderBooks(): void{
    
  }

  removeBook(book: Book): void{
    this.books.forEach( (item, index) => {
      if(item === book) this.books.splice(index,1);
    });
    localStorage.setItem("items", JSON.stringify(this.books))
  }

  incQuantity(book: Book): void{
    const index = this.books.findIndex(elem => elem.id === book.id)
      
    if(index != -1) 
      this.books[index].quantity += 1;
      localStorage.setItem("items", JSON.stringify(this.books))
  }

  decQuantity(book: Book): void{
    const index = this.books.findIndex(elem => elem.id === book.id)
      
    if(index != -1 && this.books[index].quantity>1) 
      this.books[index].quantity -= 1;
      localStorage.setItem("items", JSON.stringify(this.books))
  }

  sum(){
    return this.books
      .map(lot => lot.quantity*lot.cost)
      .reduce((prev, curr) => prev + curr, 0);
  }
}
