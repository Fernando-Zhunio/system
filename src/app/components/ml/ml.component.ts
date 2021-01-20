import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoViewComponent } from '../modals/info-view/info-view.component';

@Component({
  selector: 'app-ml',
  templateUrl: './ml.component.html',
  styleUrls: ['./ml.component.css']
})
export class MlComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  @Input() ml;
  @Output() click_menu:EventEmitter<object> = new EventEmitter();
  // @Output() close: EventEmitter<any> = new EventEmitter();

  // @Output addModel = new EventEmitter<{make: string, name: string}>();
  ngOnInit(): void {
    console.log(this.ml);
  }

  public executeMenu(type,id){
    this.click_menu.emit({type,id})
  }

  openDescription(): void {
     this.dialog.open(InfoViewComponent, { 
      data: {name: this.ml.name, title:"Descripcion",info:this.ml.description,isHtml:true},
    });
  }

  // executeMenu(event ): void {
  //   console.log(event);
    
  //   // active,paused,closed,deleted,relist_forever_on,relist_forever_off
  //   // switch (type) {
  //   //   case "active":
  //   //     break;
  //   //   case "paused":
  //   //     break;
  //   //   case "closed":
  //   //     break;
  //   //   case "deleted":
  //   //     break;
  //   //   case "relist_forever_on":
  //   //     break;
  //   //   case "relist_forever_off":
  //   //     break;

  //   //   default:
  //   //     break;
  //   // }
  //   this.s_mercado_libre.updateStatus(event.id, event.type).subscribe((res) => {
  //     console.log(res);
  //     if (res.success) {
  //       const indice = this.products.findIndex((x) => x.id == event.id);
  //       this.products[indice] = res.ml;
  //     }
  //   });
  // }



}
