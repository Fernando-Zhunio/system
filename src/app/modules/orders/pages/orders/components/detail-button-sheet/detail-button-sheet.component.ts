import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-detail-button-sheet',
  templateUrl: './detail-button-sheet.component.html',
  styleUrls: ['./detail-button-sheet.component.scss']
})
export class DetailButtonSheetComponent {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public items: []) { }

}
