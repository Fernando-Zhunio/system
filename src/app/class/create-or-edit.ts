import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StandartSearchService } from '../services/standart-search.service';
import { SwalService } from '../services/swal.service';

export class CreateOrEdit<T> {
    public status: 'create' | 'edit' = 'create';
    public title: string;
    public data: T = null;
    public urlEdit = null;
    public urlSave = null;
    public form: FormGroup = null;
    isLoading: boolean = false;

    constructor(public act_router: ActivatedRoute, public standard_service: StandartSearchService, public router: Router) {
    }

    init() {
        this.act_router.data.subscribe(data => {
            if (data.isEdit) {
                this.status = 'edit';
                this.title += ' Editando';
                this.standard_service.show(`${this.urlSave}/${this.getId()}/edit`).subscribe(data => {
                    this.setData(data.data);
                });
            } else {
                this.status = 'create';
                this.title += ' Creando';
            }
        });
    }

    getId() {
        return this.act_router.snapshot.params['id'];
    }

    setData(data) {
        this.form.setValue(data);
    }

    saveInServer() {
        this.isLoading = true;
        const data_send = this.getDataForSendServer();
        if (data_send) {
            switch (this.status) {
                case 'create':
                    this.standard_service.store(this.urlSave, data_send).subscribe(data => {
                        this.isLoading = false;
                        this.go();
                    }, error => {
                        SwalService.swalFire({ text: 'Ocurrio un error al guardar', icon: 'error' });
                    });
                    break;
                case 'edit':
                    this.standard_service.updatePut(`${this.urlSave}/${this.getId()}`, data_send).subscribe(data => {
                        this.isLoading = false;
                        this.go();
                    }, error => {
                        SwalService.swalFire({ text: 'Ocurrio un error al guardar', icon: 'error' });
                    });
                    break;
                default:
                    break;
            }
        }
    }

    go(){}

    getDataForSendServer(): any { }




}
