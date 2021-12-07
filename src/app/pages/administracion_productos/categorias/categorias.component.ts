import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../../services/categorias.service';


declare let Swal: any;
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  constructor(private s_categories: CategoriasService) { }
  categories: any;
  pageCurrent: number = 1;
  perPage: number = 10;
  totalItem: number = 0;
  permission_edit = ['super-admin', 'products-admin.categories.edit']
  permission_destroy = ['super-admin', 'products-admin.categories.destroy']
  permission_create = ['super-admin', 'products-admin.categories.create']
  ngOnInit(): void {
   this.nextPage();
  }

  nextPage(pageNumber= 1): void{
    this.s_categories.index(pageNumber).subscribe(
      (response: any) => {
        this.categories = response.data.data;
        this.totalItem = response.data.total;
        this.perPage = response.data.per_page;
        this.pageCurrent =  response.data.current_page;
      }
    );
  }

  destroyCategory(id): void {
    const index = this.categories.findIndex((x) => x.id === id);
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mr-1',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Seguro que quieres eliminar esta Categoria ?',
        text: this.categories[index].name,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        // reverseButtons: true
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.s_categories.destroy(id).subscribe((res) => {
            // let index:number = this.categories.findIndex((x) => x.id === id);
            if (index != -1) { this.categories.splice(index, 1); }
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'Eliminado con exito.',
              'success'
            );
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Tu accion a sido cancelada :)',
            'error'
          );
        }
      });
  }
}
