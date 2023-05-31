import { Component } from '@angular/core';
import { BooksServiceService } from '../books-service.service';
import { Book, BookOrder, CreateOrderDto, PaymentType } from '../model';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderServiceService } from '../order-service.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-book-order',
  templateUrl: './book-order.component.html',
  styleUrls: ['./book-order.component.css']
})
export class BookOrderComponent {

  public books: BookOrder[] = [];
  public discountedPrice: number = 0;
  public checkout: boolean = false;
  public paymentType: PaymentType = PaymentType.DELIVERY;
  public order: any;

  constructor(private route: ActivatedRoute,
    public router: Router,
    private bookService: BooksServiceService, private orderService: OrderServiceService,
    private userService:UserService) {}


  ngOnInit() {
    this.books = JSON.parse(localStorage.getItem("items") || "")
    
  }
  checkoutBooks(): void{
    this.checkout = true
    this.orderService.checkout(this.sum(), this.userService.getUsername(), this.books, this.paymentType).subscribe(data => {
      this.discountedPrice = data.totalPrice;
      console.log(data)
      console.log(data.totalPrice)
      this.order = data
    })
  }

  orderBooks(): void{
    if (this.order){
      console.log(this.order)
      console.log(this.order)
      this.orderService.createOrder(this.order).subscribe(data => {
        console.log(data)
        console.log(data.totalPrice)
        this.order = data
      })
      alert("Your order is successfully CREATED.");
    }
    else
      alert("Your order was NOT CREATED.");
    
    this.checkout = false;
    localStorage.removeItem("items");
    this.router.navigate(['./'])
  }

  removeBook(book: BookOrder): void{
    this.books.forEach( (item, index) => {
      if(item.bookId === book.bookId) this.books.splice(index,1);
    });
    localStorage.setItem("items", JSON.stringify(this.books))
  }

  incQuantity(book: BookOrder): void{
    const index = this.books.findIndex(elem => elem.bookId === book.bookId)
      
    if(index != -1) 
      this.books[index].quantity += 1;
      localStorage.setItem("items", JSON.stringify(this.books))
  }

  decQuantity(book: BookOrder): void{
    const index = this.books.findIndex(elem => elem.bookId === book.bookId)
      
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
