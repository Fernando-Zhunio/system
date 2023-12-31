import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
  ],
  selector: 'app-view-corner',
  templateUrl: './view-corner.component.html',
  styleUrls: ['./view-corner.component.scss']
})
export class ViewCornerComponent {

  constructor() { }
  @Input() isOpen: boolean = false;
  @Output() close: EventEmitter<string> = new EventEmitter();
 

  closeEmit(){
    this.close.emit('close');
  }

}
