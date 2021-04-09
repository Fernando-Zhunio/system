import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  // @Output() edit:EventEmitter<number> = new EventEmitter();
  @Output() delete:EventEmitter<number> = new EventEmitter();

  // emitEdit():void{
  //   this.edit.emit(this.person.id);
  // }

  emitDelete():void{
    this.delete.emit(this.person.id);
  }



}
