import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-info-person-modal',
  templateUrl: './add-info-person-modal.component.html',
  styleUrls: ['./add-info-person-modal.component.css']
})
export class AddInfoPersonModalComponent implements OnInit {

  constructor( private dialogRef: MatDialogRef<AddInfoPersonModalComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

}
