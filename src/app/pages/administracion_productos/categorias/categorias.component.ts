import { Component, OnInit } from '@angular/core';
import { Permission_categories } from '../../../class/permissions-modules';
import { MethodsHttpService } from '../../../services/methods-http.service';


declare let Swal: any;
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  constructor(private methodsHttp: MethodsHttpService) { }
  categories: any;
  pageCurrent = 1;
  perPage = 10;
  totalItem = 0;

  permissions = Permission_categories.categories;
  ngOnInit(): void {
   this.nextPage();
  }

  nextPage(page= 1): void{
    this.methodsHttp.methodGet('products-admin/categories',{page}).subscribe(
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
          this.methodsHttp.methodDelete('products-admin/categories/'+id).subscribe(() => {
            if (index != -1) { this.categories.splice(index, 1); }
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'Eliminado con éxito.',
              'success'
            );
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Tu acción a sido cancelada :)',
            'error'
          );
        }
      });
  }
}
