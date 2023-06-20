import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
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
