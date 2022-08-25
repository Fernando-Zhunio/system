import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cperson } from '../../class/cperson';
import { IpermissionStandart } from '../../interfaces/ipermission-standart';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  ngOnInit(): void {

  }

  @Input() permission:IpermissionStandart;
  @Input() person:Cperson;
  @Output() delete:EventEmitter<number> = new EventEmitter();


  emitDelete():void{
    this.delete.emit(this.person.id);
  }



}
