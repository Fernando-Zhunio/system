import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MethodsHttpService } from '../services/methods-http.service';
import { StandartSearchService } from '../services/standart-search.service';
import { SwalService } from '../services/swal.service';

export abstract class CreateOrEdit2<T> {
    public status: 'create' | 'edit' = 'create';
    public data: T = null;
    public urlEdit = null;
    public loadCreate: boolean = true;
    public form: FormGroup = null;
    isLoading: boolean = false;
    public params = null;
    public isFormParams: boolean = false;
    public key_param = 'id';
    public location: Location;
    public abstract title: string;
    public abstract urlSave;
    abstract act_router: ActivatedRoute;
    abstract methodsHttp: MethodsHttpService;
    abstract router: Router
    constructor() {
    }

    init(loadCreate: boolean = true) {
        this.act_router.data.subscribe(data => {
            const isEdit = data.isEdit;
            if (isEdit) {
                this.status = 'edit';
                this.title += ' Editando';
                this.edit();
            } else {
                this.status = 'create';
                this.title += ' Creando';
                if (loadCreate) {
                    this.loaderDataForCreate();
                }
            }
        });
    }

    edit() {
        this.isLoading = true;
        const url = this.generateUrl();
        this.methodsHttp.methodGet(`${url}/${this.getId()}/edit${this.params ? this.params : ''}`).subscribe(data => {
            this.setData(data?.data);
            this.isLoading = false;
        }, error => { this.isLoading = false; });
    }

    create() {
        this.isLoading = true;
        const url = this.generateUrl();
        this.methodsHttp.methodGet(`${url}/create${this.params ? this.params : ''}`).subscribe(data => {
            this.setData(data?.data);
            this.isLoading = false;
        }, error => { this.isLoading = false; });
    }

    getId(key: string = this.key_param): any {
        return this.act_router.snapshot.params[key];
    }

    loaderDataForCreate() {
        this.isLoading = true;
        const url = this.generateUrl();
        this.methodsHttp.methodGet(`${url}/create${this.params ? this.params : ''}`).subscribe(data => {
            this.setData(data?.data);
            this.isLoading = false;
        }, error => { this.isLoading = false; });
    }

    setData(data = null) {
        this.form.patchValue(data);
    }

    generateUrl() {
        return this.urlSave;
    }

    saveInServer() {
        const data_send = this.getDataForSendServer();
        if (data_send) {
            this.isLoading = true;
            let url = this.generateUrl();
            let observable: Observable<any>;
            if (this.status === 'edit') {
                url += `/${this.getId()}`;
                observable = this.methodsHttp.methodPut(url, data_send);
            } else {
                observable = this.methodsHttp.methodPost(url, data_send);
            }
            observable.subscribe(data => {
                this.isLoading = false;
                this.go(data?.data);
            }, error => {
                console.log(error);
                this.isLoading = false;
            });
            return;
        }
    }

    go(data = null) { }

    getDataForSendServer(): any {
        if (this.form.valid) {
            return this.form.value;
        } else {
            SwalService.swalFire({ text: 'Por favor complete todos los campos', icon: 'error' });
        }
    }
    goBack() {
        this.location.back();
    }

}