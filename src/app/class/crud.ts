import { MatSnackBar } from '@angular/material/snack-bar';
import { MethodsHttpService } from '../services/methods-http.service';
import { SwalService } from '../services/swal.service';

export abstract class Crud<T> {
  // router: Router;
  protected abstract methodsHttp: MethodsHttpService;
  protected abstract snackBar: MatSnackBar;
  constructor() { }
  abstract url: string;
  isLoading: boolean = false;
  data: Map<any, T> = new Map<any, T>();
  key: string = 'id';

  deleteData(id: number): void {
    SwalService.swalConfirmation('Eliminar', '¿Está seguro de eliminar el registro?', 'warning')
      .then((result) => {
        if (result.isConfirmed) {
          this.isLoading = true;
          this.methodsHttp.methodDelete(`${this.url}/${id}`).subscribe(
            () => {
              this.isLoading = false;
              this.snackBar.open('Registro eliminado', 'OK', { duration: 1500 });
              this.customDeleteItem(id);
            }
          );
        }
      });
  }

  customDeleteItem(id: number) {
    this.data.delete(id);
  }

  index() {
    this.isLoading = true;
    this.methodsHttp.methodGet(this.url).subscribe(
      (response) => {
        this.isLoading = false;
        this.getData(response);
      }, () => {
        this.isLoading = false;
        this.snackBar.open('Error al cargar datos', 'OK', { duration: 1500 });
      }
    );
  }

  getData(data) {
    this.data = new Map<any, T>(data.map((item: T) => [item[this.key], item]));
  }

}
