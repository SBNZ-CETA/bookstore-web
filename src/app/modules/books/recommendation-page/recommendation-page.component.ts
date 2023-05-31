import { Component } from '@angular/core';
import { BooksServiceService } from '../books-service.service';
import { Book, BookOrder, CreateOrderDto, PaymentType } from '../model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from '../books-view/books-view.component';

export interface DialogData {
  quantity: number;
}

@Component({
  selector: 'app-recommendation-page',
  templateUrl: './recommendation-page.component.html',
  styleUrls: ['./recommendation-page.component.css']
})
export class RecommendationPageComponent {
  public books: BookOrder[] = [];
  public quantity: number = 1;
  public booksToOrder: BookOrder[] = [];

  constructor(private route: ActivatedRoute,
    public router: Router,
    private bookService: BooksServiceService,
    private userService:UserService,
    public dialog: MatDialog,
    public dialogRate: MatDialog) {}

  openDialog(item: BookOrder): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {quantity: this.quantity},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(item)
      this.quantity = result;
      this.booksToOrder = JSON.parse(localStorage.getItem("items") || "[]")

      const index = this.booksToOrder.findIndex(elem => elem.title === item.title)

      if(index != -1)
        this.booksToOrder[index].quantity += this.quantity;
      else
        this.booksToOrder.push({...item, bookId:item.bookId, quantity: this.quantity})

      console.log(this.booksToOrder)
      localStorage.setItem("items", JSON.stringify(this.booksToOrder))
      this.router.navigate(['./order'])
    });
  }

  ngOnInit() {
    this.bookService.getRecommendedBooks().subscribe(response => this.books = response);
  }

  addToCart(item: BookOrder):void{
    console.log(item.title)
    this.openDialog(item);
  }

}
