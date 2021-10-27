import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css'],
  animations: [trigger('fade', [
    transition(
      ':leave', [
        style({ transform: 'scale(0)',opacity:'0' }),
        animate(400)
      ]
    )])],
})
export class ProveedoresComponent implements OnInit {

  constructor() { }

  imports = []
  isload:boolean=false;
  ngOnInit(): void {
  }

  loadData($event){
    this.imports = $event.data.data;
  }

  destroyImport(event):void{
    const index = this.imports.findIndex(x=>x.id==event.id);
    if(index != -1){
      this.imports.splice(index,1);
    }
  }


}
