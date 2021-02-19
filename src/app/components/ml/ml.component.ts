import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MercadoLibreService } from '../../services/mercado-libre.service';
import { InfoViewComponent } from '../modals/info-view/info-view.component';
import { SearchProductModalComponent } from '../modals/search-product-modal/search-product-modal.component';

@Component({
  selector: 'app-ml',
  templateUrl: './ml.component.html',
  styleUrls: ['./ml.component.css']
})
export class MlComponent implements OnInit {

  constructor(private s_mercado_libre:MercadoLibreService, public dialog: MatDialog,private snack_bar:MatSnackBar) { }
  @Input() ml;
  // @Output() click_menu:EventEmitter<object> = new EventEmitter();
  // @Output() close: EventEmitter<any> = new EventEmitter();

  // @Output addModel = new EventEmitter<{make: string, name: string}>();
  ngOnInit(): void {
    // console.log(this.ml);
  }

  // public executeMenu(type,id){
  //   this.click_menu.emit({type,id})
  // }

  openDescription(): void {
     this.dialog.open(InfoViewComponent, { 
      data: {name: this.ml.name, title:"Descripcion",info:this.ml.description,isHtml:true},
    });
  }


  executeMenu(type,id,index): void {
    // console.log(event);
    // active,paused,closed,deleted,relist_forever_on,relist_forever_off
    switch (type) {
      case "assign":
          this.dialog.open(SearchProductModalComponent,{
            data:{ml:this.ml}
          }).beforeClosed().subscribe(res=>{
            if(res){
            const snack = this.snack_bar.open("Cambiando estado espere...")
              this.s_mercado_libre.assingProduct('catalogs/ml-products/'+this.ml.id+'/assign',{product_id:res.id_product}).subscribe(res=>{
                console.log(res);
                snack.dismiss();
                if (res.success) {
                  this.snack_bar.open("Estado cambiado con exito","Exito",{duration :2000})
                  this.ml = res.data;
                }
                else{
                  this.snack_bar.open("Ups! Ocurrio un error","Error",{duration :2000})
                }
              },err=>{
                console.log(err);
                snack.dismiss();
                this.snack_bar.open("Ups! Ocurrio un error","Error",{duration :2000})
              })
            }
          })

        break;
      // case "paused":
      //   break;
      // case "closed":
      //   break;
      // case "deleted":
      //   break;
      // case "relist_forever_on":
      //   break;
      // case "relist_forever_off":
      //   break;

      default:
        const snack = this.snack_bar.open("Cambiando estado espere...")
        this.s_mercado_libre.updateStatus(id,type).subscribe((res) => {
          console.log(res);
          snack.dismiss();
          if (res.success) {
            this.snack_bar.open("Estado cambiado con exito","Exito",{duration :2000})
            // const indice = this.products.findIndex((x) => x.id == id);
            this.ml = res.ml;
            // this.products[indice] = res.ml;
            // console.log(this.products[indice]);
            
          }
          else{
            this.snack_bar.open("Ups! Ocurrio un error","Error",{duration :2000})
    
          }
        },err=>{
          snack.dismiss();
          this.snack_bar.open("Ups! Ocurrio un error","Error",{duration :2000})
        });
        break;
    }

   
  }

  assignProducts():void{

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
