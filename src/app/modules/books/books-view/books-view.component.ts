import { Component, Inject } from '@angular/core';
import { Book, BookOrder } from '../model';
import { BooksServiceService } from '../books-service.service';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  quantity: number;
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

  constructor(
    private bookService: BooksServiceService,
    public router: Router,
    public dialog: MatDialog
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

  ngOnInit() {
    this.bookService.getBooks().subscribe(response => this.books = response);
  }

  addToCart(item: Book):void{
    console.log(item.title)
    this.openDialog(item);
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