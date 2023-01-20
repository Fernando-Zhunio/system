import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Permission_categories } from '../../../../../class/permissions-modules';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../shared/class/mat-table-helper';
import { CategoriesCreateOrEditComponent } from '../categories-create-or-edit/categories-create-or-edit.component';

@Component({
  selector: 'app-categories-index',
  templateUrl: './categories-index.component.html',
  styleUrls: ['./categories-index.component.css']
})
export class CategoriesIndexComponent extends MatTableHelper<any> {
  protected columnsToDisplay: string[] = ['id', 'name', 'code', 'products_count', 'actions'];
  protected url: string = 'products-admin/categories';
  
  @ViewChild(MatTable) table: MatTable<any>;
  

  constructor(protected mhs: MethodsHttpService, private dialog: MatDialog) {
    super();
  }

  permissions = Permission_categories.categories;

  createOrEdit(isEdit = true, id =null ): void {
    this.dialog.open(CategoriesCreateOrEditComponent, {
      data: {id, isEdit},
      disableClose: true,
    }).beforeClosed().subscribe((data) => {
      if (data) {
        if(isEdit) {
        this.updateItemInTable(data.id, data);
        } else {
          this.addItemInTable(data);
        }
      }
    });
  }

  // destroyCategory(id): void {
  //   const index = this.categories.findIndex((x) => x.id === id);
  //   const swalWithBootstrapButtons = Swal.mixin({
  //     customClass: {
  //       confirmButton: 'btn btn-success mr-1',
  //       cancelButton: 'btn btn-danger',
  //     },
  //     buttonsStyling: false,
  //   });

  //   swalWithBootstrapButtons
  //     .fire({
  //       title: 'Seguro que quieres eliminar esta Categoria ?',
  //       text: this.categories[index].name,
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonText: 'Si, eliminar!',
  //       cancelButtonText: 'No, cancelar!',
  //       // reverseButtons: true
  //     })
  //     .then((result) => {
  //       if (result.isConfirmed) {
  //         this.methodsHttp.methodDelete('products-admin/categories/'+id).subscribe(() => {
  //           if (index != -1) { this.categories.splice(index, 1); }
  //           swalWithBootstrapButtons.fire(
  //             'Eliminado!',
  //             'Eliminado con éxito.',
  //             'success'
  //           );
  //         });
  //       } else if (
  //         result.dismiss === Swal.DismissReason.cancel
  //       ) {
  //         swalWithBootstrapButtons.fire(
  //           'Cancelled',
  //           'Tu acción a sido cancelada :)',
  //           'error'
  //         );
  //       }
  //     });
  // }
}
