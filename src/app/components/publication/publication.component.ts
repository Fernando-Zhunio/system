import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Ipublication } from "../../interfaces/ipublication";
import { CatalogoService } from "../../services/catalogo.service";
import { MercadoLibreService } from "../../services/mercado-libre.service";
import { StandartSearchService } from "../../services/standart-search.service";
import { InfoViewComponent } from "../modals/info-view/info-view.component";

@Component({
  selector: "app-publication",
  templateUrl: "./publication.component.html",
  styleUrls: ["./publication.component.css"],
})
export class PublicationComponent implements OnInit {
  constructor(private s_standart:StandartSearchService, private s_mercado_libre:MercadoLibreService, private dialog: MatDialog,private snack_bar:MatSnackBar) {}

  isLoader: boolean = false;
  permission_show = ["super-admin", "catalogs.publications.show"];
  permission_create = ["super-admin", "catalogs.publications.create"];
  permission_edit = ["super-admin", "catalogs.publications.edit"];
  permission_destroy = ["super-admin", "catalogs.publications.destroy"];
  @Input() publication:Ipublication;
  @Output() delete:EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {}

  openDescription(): void {
    this.dialog.open(InfoViewComponent, {
      data: {
        name: this.publication.name,
        title: "Descripcion",
        info: this.publication.description,
      },
    });
  }



  deletePublication(idPublication):void{
    const snack = this.snack_bar.open('Eliminando espere ...')
    this.isLoader = true;
    // this.s_catalogo.destroyPublications(idPublication).subscribe(
      this.s_standart.destory('catalogs/publications/'+idPublication).subscribe(
      res=>{
        snack.dismiss();
        this.isLoader = false;
        console.log(res);
        if(res.success){
          this.delete.emit(res.data);
          this.snack_bar.open('Eliminado con exito', 'OK', {duration:2000})
        }
        else {
          this.snack_bar.open('Error al eliminar', 'Error', {duration:2000})
        }
      },err=>{
        console.log(err);
        this.snack_bar.open('Error al eliminar', 'Error', {duration:2000})
        this.isLoader = false;
        snack.dismiss();
      }
    )
  }

  executeMenu(event ): void {
    console.log(event);
    this.s_mercado_libre.updateStatus(event.id, event.type).subscribe((res) => {
      console.log(res);
      if (res.success) {
        // const indice = this.products.findIndex((x) => x.id == event.id);
        this.publication = res.ml;
      }
    });
  }
}
