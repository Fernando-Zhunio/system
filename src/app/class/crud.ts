import { MatSnackBar } from '@angular/material/snack-bar';
import { StandartSearchService } from '../services/standart-search.service';
import { SwalService } from '../services/swal.service';

export class Crud {

    constructor( private standardService: StandartSearchService, private snackBar: MatSnackBar) {}
    url: string;
    isload: boolean = false;

    deleteData(id: number): void {
        SwalService.swalConfirmation('Eliminar', '¿Está seguro de eliminar el registro?')
        .then((result) => {
          if (result.isConfirmed) {
            this.isload = true;
            this.standardService.destory(`${this.url}/${id}`).subscribe(
              (response) => {
                this.isload = false;
                this.snackBar.open('Registro eliminado', 'OK', {duration: 1500});
                this.deleteItem(id);
              }
            );
          }
        });
      }

      deleteItem(id: number) {
        // this.newsletters.delete(id);
      }

}
