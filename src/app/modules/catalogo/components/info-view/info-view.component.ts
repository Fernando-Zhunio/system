import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-view',
  templateUrl: './info-view.component.html',
  styleUrls: ['./info-view.component.css']
})
export class InfoViewComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data) { }

}
