import { Component, Inject } from '@angular/core';
import { Book, BookOrder } from '../model';
import { BooksServiceService } from '../books-service.service';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  quantity: number;
}

export interface DialogRateData {
  rate: number;
}

@Component({
  selector: 'app-books-view',
  templateUrl: './books-view.component.html',
  styleUrls: ['./books-view.component.css']
})
export class BooksViewComponent {

  public books: Book[] = [];
  public booksToOrder: BookOrder[] = [];
  public quantity: number = 1;
  public rate: number = 5;
  public token: any = localStorage.getItem("token");

  constructor(
    private bookService: BooksServiceService,
    public router: Router,
    public dialog: MatDialog,
    public dialogRate: MatDialog
  ) {}

  openDialog(item: Book): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {quantity: this.quantity},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.quantity = result;
      this.booksToOrder = JSON.parse(localStorage.getItem("items") || "[]")

      const index = this.booksToOrder.findIndex(elem => elem.bookId === item.id)

      if(index != -1)
        this.booksToOrder[index].quantity += this.quantity;
      else
        this.booksToOrder.push({...item, bookId:item.id, quantity: this.quantity})

      console.log(this.booksToOrder)
      localStorage.setItem("items", JSON.stringify(this.booksToOrder))
      this.router.navigate(['./order'])
    });
  }

  openDialogRate(item: Book): void {
    const dialogRefRate = this.dialogRate.open(DialogRateABook, {
      data: {rate: this.rate},
    });

    dialogRefRate.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.rate = result;
      console.log(result, item.id);
      this.bookService.rateBook({bookId: item.id, rate: this.rate}).subscribe(response => console.log(response));
      this.bookService.getBooks().subscribe(response => this.books = response);
    });
  }

  ngOnInit() {
   this.bookService.getBooks().subscribe(response => {
      this.books = response
      console.log(response);
   });
  }

  addToCart(item: Book):void{
    console.log(item.title)
    this.openDialog(item);
  }

  rateBook(item: Book): void{
    this.openDialogRate(item);
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-rate-a-book',
  templateUrl: 'dialog-rate-a-book.html',
})
export class DialogRateABook {
  constructor(
    public dialogRefRate: MatDialogRef<DialogRateABook>,
    @Inject(MAT_DIALOG_DATA) public data: DialogRateData,
  ) {}

  onNoClick(): void {
    this.dialogRefRate.close();
  }
}
