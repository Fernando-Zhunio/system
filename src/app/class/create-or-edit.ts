import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { StandartSearchService } from '../services/standart-search.service';
import { SwalService } from '../services/swal.service';
import { MethodsHttpService } from '../services/methods-http.service';

export abstract class CreateOrEdit<T> {
    public status: 'create' | 'edit' = 'create';
    public abstract title: string;
    public data: T | null = null;
    public urlEdit = null;
    public abstract urlSave;
    public loadCreate: boolean = true;
    public form: FormGroup;
    isLoading: boolean = false;
    public params = null;
    public isFormParams: boolean = false;
    public key_param = 'id';
    public location: Location;
    protected abstract methodsHttpService: MethodsHttpService;
    protected abstract route: ActivatedRoute;
    protected abstract router: Router
    constructor() {
    }

    init(loadCreate: boolean = true) {
        this.route.data.subscribe(data => {
            const isEdit = data['isEdit'];
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
        this.methodsHttpService.methodGet(`${this.urlSave}/${this.getId()}/edit${this.params ? this.params : ''}`).subscribe(data => {
            this.setData(data?.data);
            this.isLoading = false;
        }, () => { this.isLoading = false; });
    }

    create() {
        this.isLoading = true;
        this.methodsHttpService.methodGet(`${this.urlSave}/create${this.params ? this.params : ''}`).subscribe(data => {
            this.setData(data?.data);
            this.isLoading = false;
        }, () => { this.isLoading = false; });
    }

    getId(key: string = this.key_param): any {
        return this.route.snapshot.params[key];
    }

    loaderDataForCreate() {
        this.isLoading = true;
        this.methodsHttpService.methodGet(`${this.urlSave}/create${this.params ? this.params : ''}`).subscribe(data => {
            this.setData(data?.data);
            this.isLoading = false;
        }, () => { this.isLoading = false; });
    }

    setData(data: any = null) {
        this.form.patchValue(data);
    }

    saveInServer() {
        const data_send = this.getDataForSendServer();
        if (data_send) {
            this.isLoading = true;
            let url = this.urlSave;
            let observable: Observable<any>;
            if (this.status === 'edit') {
                url += `/${this.getId()}`;
                observable = this.methodsHttpService.methodPut(url, data_send);
            } else {
                observable = this.methodsHttpService.methodPost(url, data_send);
            }
            observable.subscribe(data => {
                this.isLoading = false;
                this.go(data?.data);
            }, error => {
                console.error(error);
                this.isLoading = false;
            });
            return;
        }
    }

    go(_data = null) { }

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
