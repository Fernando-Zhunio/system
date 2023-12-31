import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { StandartSearchService } from '../services/standart-search.service';
import { SwalService } from '../services/swal.service';

export abstract class CreateOrEditModal {

    abstract title;
    abstract urlCrud;
    abstract isEdit;
    abstract hasDataCreate: boolean;
    abstract form: FormGroup;

    abstract standard: StandartSearchService;
    public state: 'create' | 'edit' = 'create';
    public isLoading: boolean = false;
    abstract dialogRef: MatDialogRef<any>;

    init() {
        let observable: Observable<any> | null = null;
        if (this.state === 'edit') {
            this.title += ' - Editando';
            observable = this.standard.methodGet(this.generateUrlEdit());
        } else if (this.hasDataCreate) {
            this.title += ' - Creando';
            observable = this.standard.methodGet(this.generateUrlCreate());
        }
        if (observable) {
            this.isLoading = true;
            observable.subscribe(data => {
                this.isLoading = false;
                this.initData(data);
            });
        }
    }

    abstract getId(): number;

    generateUrlEdit(): string {
        return `${this.urlCrud}/${this.getId()}/edit`;
    }

    generateUrlCreate(): string {
        return `${this.urlCrud}/create`;
    }
    generateUrlUpdate(): string {
        return `${this.urlCrud}/${this.getId()}`;
    }

    initData(response) {
        this.form.patchValue(response.data);
    }

    saveInServer() {
        const { isValid, dataSend } = this.formIsValid();
        if (isValid) {
            this.isLoading = true;
            let observable: Observable<any> | null = null;
            if (this.state === 'edit') {
               observable = this.standard.methodPut(this.generateUrlUpdate(), dataSend );
            } else if (this.state === 'create') {
               observable = this.standard.methodPost(this.urlCrud, dataSend );
            }

            observable!.subscribe(data => {
                this.isLoading = false;
                SwalService.swalFire({icon: 'success', title: 'Guardado', text: 'Se guardo correctamente'});
                this.closeModal(data);
            });
        }
    }

    formIsValid(): {isValid: boolean, dataSend: any} {
         if (this.form.invalid) {this.form.markAllAsTouched(); }
         return { isValid: this.form.valid, dataSend: this.form.value };
    }

    closeModal(data: any) {
        this.dialogRef.close(data);
    }

}
