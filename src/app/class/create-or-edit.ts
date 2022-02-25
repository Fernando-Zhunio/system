import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StandartSearchService } from '../services/standart-search.service';
import { SwalService } from '../services/swal.service';

export abstract class CreateOrEdit<T> {
    public status: 'create' | 'edit' = 'create';
    public abstract title: string;
    public data: T = null;
    public urlEdit = null;
    public abstract urlSave;
    public loadCreate: boolean = true;
    public form: FormGroup = null;
    isLoading: boolean = false;
    public params = null;
    public isFormParams: boolean = false;
    public key_param = 'id';
    public location: Location;
    constructor(public act_router: ActivatedRoute, public standard_service: StandartSearchService, public router: Router) {
    }

    init() {
        this.act_router.data.subscribe(data => {
            const isEdit = data.isEdit;
            this.title += isEdit ? 'Editando' : 'Creando';
            this.status = isEdit ? 'edit' : 'create';
            isEdit ? (this.edit()) : this.loaderDataForCreate();
            // if (data.isEdit) {
                // this.status = 'edit';
                // this.title += ' Editando';
                // this.edit();
            // } else {
                // this.status = 'create';
                // this.title += ' Creando';
            //     this.loaderDataForCreate();
            // }
        });
    }

    edit() {
        this.isLoading = true;
        this.standard_service.show(`${this.urlSave}/${this.getId()}/edit${this.params ? this.params : ''}`).subscribe(data => {
            this.setData(data?.data);
            this.isLoading = false;
        }, error => { this.isLoading = false; });
    }

    create() {
        this.isLoading = true;
        this.standard_service.show(`${this.urlSave}/create${this.params ? this.params : ''}`).subscribe(data => {
            this.setData(data?.data);
            this.isLoading = false;
        }, error => { this.isLoading = false; });
    }

    getId(key: string = this.key_param): any {
        return this.act_router.snapshot.params[key];
    }

    loaderDataForCreate() {
        this.isLoading = true;
        this.standard_service.show(`${this.urlSave}/create${this.params ? this.params : ''}`).subscribe(data => {
            this.setData(data?.data);
            this.isLoading = false;
        } , error => { this.isLoading = false; });
    }

    setData(data = null) {
        this.form.patchValue(data);
        // this.form.setValue(data);
    }

    saveInServer() {
        const data_send = this.getDataForSendServer();
        if (data_send) {
            this.isLoading = true;
            if (this.isFormParams){
                switch (this.status) {
                    case 'create':
                        this.standard_service.uploadFormData(this.urlSave, data_send).subscribe(data => {
                            this.isLoading = false;
                            this.go();
                        }, error => {
                            this.isLoading = false;
                            SwalService.swalFire({ text: 'Ocurrió un error al guardar', icon: 'error' });
                        });
                        break;
                    case 'edit':
                        this.standard_service.uploadFormData(`${this.urlSave}/${this.getId()}`, data_send).subscribe(data => {
                            this.isLoading = false;
                            this.go();
                        }, error => {
                            this.isLoading = false;
                            SwalService.swalFire({ text: 'Ocurrió un error al guardar', icon: 'error' });
                        });
                        break;
                    default:
                        break;
                }
            } else {
                switch (this.status) {
                    case 'create':
                        this.standard_service.store(this.urlSave, data_send).subscribe(data => {
                            this.isLoading = false;
                            this.go();
                        }, error => {
                            this.isLoading = false;
                            // SwalService.swalFire({ text: 'Ocurrio un error al guardar', icon: 'error' });
                        });
                        break;
                    case 'edit':
                        this.standard_service.updatePut(`${this.urlSave}/${this.getId()}`, data_send).subscribe(data => {
                            this.isLoading = false;
                            this.go();
                        }, error => {
                            this.isLoading = false;
                            // SwalService.swalFire({ text: 'Ocurrio un error al guardar', icon: 'error' });
                        });
                        break;
                    default:
                        break;
                }
            }
        }
    }

    go() { }
    getDataForSendServer(): any {
        if(this.form.valid) {
            return this.form.value;
        } else {
            SwalService.swalFire({ text: 'Por favor complete todos los campos', icon: 'error' });
        }
     }
    goBack() {
        this.location.back();
    }



}
