import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-zoom',
  templateUrl: './modal-zoom.component.html',
  styleUrls: ['./modal-zoom.component.css']
})
export class ModalZoomComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public zoom, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }

  urlJoinCopy():void{
    this.snackBar.open('URL copiada al portapapeles', 'Cerrar', {duration: 3000});
  }

}
