import { FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MethodsHttpService } from "../../services/methods-http.service";
import { StatusCreateOrEdit } from "../enums/status-create-or-edit";
import { CreateOrEditDialogData } from "../interfaces/create-or-edit-dialog-data";
import { ResponseApi } from "../interfaces/response-api";

export abstract class CreateOrEditDialog<T= any, R= any> {
    
    public status: StatusCreateOrEdit = StatusCreateOrEdit.Create;

    protected abstract title: string;
    protected abstract path: string;
    protected abstract methodHttp: MethodsHttpService;
    protected abstract form: FormGroup;
    protected abstract dialogRef: MatDialogRef<T, {response: ResponseApi<R>, sendData: R}>
    protected abstract createOrEditData: CreateOrEditDialogData
    isLoading: boolean = false;
    constructor() { }

    public init(loadCreate: boolean = false): void {
        this.status = this.createOrEditData.status;
        const path = this.generatePathGet();
        console.log(path);
        this.title = this.status === StatusCreateOrEdit.Create ? `Crear ${this.title}` : `Editar ${this.title}`;
        if (this.status === StatusCreateOrEdit.Edit || loadCreate) {
            this.loadData(path);
            return;
        }
    }

    public generatePathGet(): string {
        return this.status == StatusCreateOrEdit.Create ? `${this.path}/create`  : `${this.path}/${this.createOrEditData.id}/edit`;
    }

    public loadData(path: string): void {
        this.isLoading = true;
        this.methodHttp.methodGet(path)
        .subscribe(
            {
                next: (data: any) => {
                    this.setData(data.data);
                    this.isLoading = false;
                },
                error: () => {
                    this.isLoading = false;
                }
            }
        );
    }

    setData(data: any): void {
        this.form.patchValue(data)
    }

    getPath(): string {
        return this.path;
    }

    isFormValid(): boolean {
        return this.form.valid;
    }

    getData(): any {
        return this.form.value
    }

    saveInServer(): void {
        if(!this.isFormValid()) {
            this.form.markAllAsTouched();
            return;
        }
        this.isLoading = true;
        if (this.status === StatusCreateOrEdit.Create) {
            this.methodHttp.methodPost(this.path, this.getData())
            .subscribe(data => {
                this.dialogRef.close({response:data, sendData: this.getData()});
                this.isLoading = false;
            }, () => {
                this.isLoading = false;
            });
        } else {
            this.methodHttp.methodPut(`${this.path}/${this.createOrEditData.id}`, this.getData()).subscribe(data => {
                this.dialogRef.close({response:data, sendData: this.getData()});
                this.isLoading = false;
            }, () => {
                this.isLoading = false;
            });
        }
    }
}