import { MatTable } from "@angular/material/table";
import { MethodsHttpService } from "../../services/methods-http.service";
import { SwalService } from "../../services/swal.service";

export abstract class MatTableHelper<T = any> {
    protected abstract columnsToDisplay: string[];
    protected abstract url: string;
    protected abstract table: MatTable<T>;
    protected abstract methodsHttp: MethodsHttpService;
    protected dataSource: T[];
    protected isLoading: boolean = false;
    getData($event: any): void {
        console.log($event);
        this.dataSource = $event;
    }

    deleteData(id: number, url: string | null = null): void {
        SwalService.swalConfirmation('Eliminar', '¿Está seguro de eliminar el registro?', 'warning')
            .then((result) => {
                if (result.isConfirmed) {
                    this.isLoading = true;
                    this.methodsHttp.methodDelete(`${ url || this.getUrl()}/${id}`).subscribe(
                        () => {
                            this.isLoading = false;
                            SwalService.swalToast('Registro eliminado', 'success');
                            this.deleteItemInTable(id);
                        }
                    );
                }
            });
    }

    getUrl(_data: any = null): string {
        return this.url;
    }

    deleteItemInTable(id: number) {
        this.dataSource.splice(this.dataSource.findIndex((order: any) => order.id === id), 1);
        this.table.renderRows();
    }

    updateItemInTable(id: any, newData, key = 'id') {
        const index = this.dataSource.findIndex(order => order[key] === id);
        if (index !== -1) {
            this.dataSource[index] = {...this.dataSource[index],...newData};
            this.table.renderRows();
        }
    }
    addItemInTable(newData: T) {
        this.dataSource.unshift(newData);
        this.table.renderRows();
    }
}

