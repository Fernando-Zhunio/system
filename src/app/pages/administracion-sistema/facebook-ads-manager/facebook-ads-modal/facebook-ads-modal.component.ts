import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

interface IitemsTable{
  id:number,
  name:string,
  description:string,
  code:string,
  stock:number
}
@Component({
  selector: 'app-facebook-ads-modal',
  templateUrl: './facebook-ads-modal.component.html',
  styleUrls: ['./facebook-ads-modal.component.css']
})
export class FacebookAdsModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public ELEMENT_DATA: {products:IitemsTable[]}, private dialogRef: MatDialogRef<FacebookAdsModalComponent>) { }

  displayedColumns: string[] = [
    "id",
    "name",
    "description",
    "code",
    "stock",
  ];
  // ELEMENT_DATA: IitemsTable[] = [];
  dataSource = new MatTableDataSource<IitemsTable>(this.ELEMENT_DATA.products);
  ngOnInit(): void {
    console.log(this.ELEMENT_DATA);

  }

}
