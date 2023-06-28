import { Component } from '@angular/core';
import { BooksServiceService } from '../books-service.service';
import { Book, BookOrder, CreateOrderDto, PaymentType, TransactionDto } from '../model';
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
  public transactionDto: TransactionDto = {} as TransactionDto;
  public cardInputFlag: boolean = false;
  public expDate: Date = new Date();

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
      this.cardInputFlag = true;
    })
  }

  orderBooks(): void{
    if (this.order){
      this.transactionDto.expirationDate = new Date(this.expDate);
      this.transactionDto.expirationDate.setHours(0,0,0,0)
      this.transactionDto.location = window.location.hostname
      this.transactionDto.receiverAccountId = 4
      this.transactionDto.amount = this.order.totalPrice
      this.order.transactionDto = this.transactionDto
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
