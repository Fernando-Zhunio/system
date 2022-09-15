import { MatTable } from "@angular/material/table";
import { MethodsHttpService } from "../../services/methods-http.service";
import { SwalService } from "../../services/swal.service";

export abstract class MatTableHelper<T> {
    protected abstract columnsToDisplay: string[];
    protected abstract url: string;
    protected abstract table: MatTable<T>;
    protected abstract methodsHttp: MethodsHttpService;
    protected dataSource: any[];
    protected isLoading: boolean = false;
    getData($event: any): void {
        console.log($event);
        this.dataSource = $event;
    }

    deleteData(id: number): void {
        SwalService.swalConfirmation('Eliminar', '¿Está seguro de eliminar el registro?', 'warning')
            .then((result) => {
                if (result.isConfirmed) {
                    this.isLoading = true;
                    this.methodsHttp.methodDelete(`${this.url}/${id}`).subscribe(
                        () => {
                            this.isLoading = false;
                            SwalService.swalToast('Registro eliminado', 'success');
                            this.deleteItemInTable(id);
                        }
                    );
                }
            });
    }

    deleteItemInTable(id: number) {
        this.dataSource.splice(this.dataSource.findIndex(order => order.id === id), 1);
        this.table.renderRows();
    }
}

