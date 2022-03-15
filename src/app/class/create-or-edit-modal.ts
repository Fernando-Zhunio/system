import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { StandartSearchService } from '../services/standart-search.service';
import { SwalService } from '../services/swal.service';

export abstract class CreateOrEditModal implements OnInit {

    abstract title;
    abstract urlCrud;
    abstract isEdit;
    abstract hasDataCreate: boolean;
    abstract form: FormGroup;

    abstract standard: StandartSearchService;
    public state: 'create' | 'edit' = 'create';
    public isLoading: boolean = false;
    abstract dialogRef: MatDialogRef<any>;

    ngOnInit(): void {
        this.state = this.isEdit ? 'edit' : 'create';
        this.init();
    }

    init() {
        let observable: Observable<any> = null;
        if (this.state === 'edit') {
            this.title += ' - Editando';
            observable = this.standard.methodGet(this.generateUrlEdit());
        } else if (this.hasDataCreate) {
            this.title += ' - Creando';
            observable = this.standard.methodGet(`${this.urlCrud}/create`);
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
    generateUrlUpdate(): string {
        return `${this.urlCrud}/${this.getId()}`;
    }

    initData(response) {
        console.log(response);
        this.form.patchValue(response.data);
    }

    saveInServer() {
        const { isValid, dataSend } = this.formIsValid();
        if (isValid) {
            this.isLoading = true;
            let observable: Observable<any> = null;
            if (this.state === 'edit') {
               observable = this.standard.methodPut(this.generateUrlUpdate(), dataSend );
            } else if (this.state === 'create') {
               observable = this.standard.methodPost(this.urlCrud, dataSend );
            }

            observable.subscribe(data => {
                this.isLoading = false;
                SwalService.swalFire({icon: 'success', title: 'Guardado', text: 'Se guardo correctamente'});
                this.closeModal(data);
            });
        }
    }

    formIsValid(): {isValid: boolean, dataSend: any} {
         return { isValid: this.form.valid, dataSend: this.form.value };
    }

    closeModal(data: any) {
        this.dialogRef.close(data);
    }

}
