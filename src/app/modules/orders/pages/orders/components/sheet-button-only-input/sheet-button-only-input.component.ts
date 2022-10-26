import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-sheet-button-only-input',
  templateUrl: './sheet-button-only-input.component.html',
  styleUrls: ['./sheet-button-only-input.component.scss']
})
export class SheetButtonOnlyInputComponent   {

  @Output() data: EventEmitter<any> = new EventEmitter<any>();
  value: string
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public externalData: 
  {placeholder: string, title: string, sendUrl: string}, public sheetRef: MatBottomSheetRef<SheetButtonOnlyInputComponent>) { }


  saveInServer(): void {
    this.sheetRef.dismiss(this.value);
  }
}
