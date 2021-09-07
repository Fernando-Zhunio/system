import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-zoom',
  templateUrl: './modal-zoom.component.html',
  styleUrls: ['./modal-zoom.component.css']
})
export class ModalZoomComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public zoom) { }

  ngOnInit(): void {
    console.log(this.zoom);

  }

}
