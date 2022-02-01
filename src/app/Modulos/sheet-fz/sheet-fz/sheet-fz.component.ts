import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-sheet-fz',
  templateUrl: './sheet-fz.component.html',
  styleUrls: ['./sheet-fz.component.css']
})
export class SheetFzComponent implements OnInit {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: {id: number, icon: string, lines: string[]}[], private sheet: MatBottomSheetRef) { }


  ngOnInit(): void {
  }

}
