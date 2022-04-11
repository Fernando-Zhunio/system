import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-view-corner',
  templateUrl: './view-corner.component.html',
  styleUrls: ['./view-corner.component.scss']
})
export class ViewCornerComponent implements OnInit {

  constructor() { }
  @Input() isOpen: boolean = false;
  @Output() close: EventEmitter<string> = new EventEmitter();
 
  ngOnInit() {
  }

  closeEmit(){
    this.close.emit('close');
  }

}
