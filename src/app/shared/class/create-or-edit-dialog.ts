import { FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MethodsHttpService } from "../../services/methods-http.service";
import { StatusCreateOrEdit } from "../enums/status-create-or-edit";
import { CreateOrEditDialogData } from "../interfaces/create-or-edit-dialog-data";

export abstract class CreateOrEditDialog {
    
    public status: StatusCreateOrEdit = StatusCreateOrEdit.Create;

    protected abstract title: string;
    protected abstract path: string;
    protected abstract methodHttp: MethodsHttpService;
    protected abstract form: FormGroup;
    protected abstract dialogRef: MatDialogRef<any>
    protected abstract createOrEditData: CreateOrEditDialogData
    isLoading: boolean = false;
    constructor() { }

    public init(loadCreate: boolean = false): void {
        this.status = this.createOrEditData.status;
        const path = this.generatePathGet();
        this.title = this.status === StatusCreateOrEdit.Create ? `Crear ${this.title}` : `Editar ${this.title}`;
        if (this.status === StatusCreateOrEdit.Edit || loadCreate) {
            this.loadCreate(path);
            return;
        }
    }

    public generatePathGet(): string {
        return StatusCreateOrEdit.Create ? `${this.path}/create`  : `${this.path}/${this.createOrEditData.id}/edit`;
    }

    public loadCreate(path: string): void {
        this.isLoading = true;
        this.methodHttp.methodGet(path).subscribe(data => {
            this.setData(data.data);
            this.isLoading = false;
        }, () => {
            this.isLoading = false;
        });
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
            this.methodHttp.methodPost(this.path, this.getData()).subscribe(data => {
                this.dialogRef.close(data);
                this.isLoading = false;
            }, () => {
                this.isLoading = false;
            });
        } else {
            this.methodHttp.methodPut(`${this.path}/${this.createOrEditData.id}`, this.getData()).subscribe(data => {
                this.dialogRef.close(data);
                this.isLoading = false;
            }, () => {
                this.isLoading = false;
            });
        }
    }
}