import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Inewsletter } from '../../../../interfaces/inewsletter';
import { IrolSystem } from '../../../../interfaces/irol-system';
import { SharedService } from '../../../../services/shared/shared.service';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { SwalService } from '../../../../services/swal.service';
import { CreateOrEdit } from './../../../../class/create-or-edit';

@Component({
  selector: 'app-create-or-edit-newsletter',
  templateUrl: './create-or-edit-newsletter.component.html',
  styleUrls: ['./create-or-edit-newsletter.component.css']
})
export class CreateOrEditNewsletterComponent extends CreateOrEdit<Inewsletter> implements OnInit {

  constructor(actived_router: ActivatedRoute, standard_service: StandartSearchService, router: Router) {
    super(actived_router, standard_service, router);
  }

  // urlEdit = 'admin/newsletter/edit/';
  urlSave = 'admin/newsletter';
  title = 'Novedad del sistema';
  expandQuill = false;
  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl(null),
    roles: new FormControl([]),
    end_date: new FormControl('', [Validators.required]),
  });
  roles: IrolSystem[] = [];
  editorStyle = {
    height: '100%'
  };


  ngOnInit(): void {
    this.init();
  }

  expandQuillEditor() {
    this.expandQuill = !this.expandQuill;
  }

  loaderDataForCreate(): void {
    this.standard_service.index('admin/newsletter/create').subscribe((res) => {
      this.roles = res.data;
    });
  }

  getDataForSendServer() {
    if (this.form.valid) {
      const data = this.form.value;
      // data.start_date = SharedService.convertDateForLaravelOfDataPicker(data.start_date);
      data.end_date = SharedService.convertDateForLaravelOfDataPicker(data.end_date);
      return data;
    } else {
      SwalService.swalFire({ text: 'Debe completar todos los campos', icon: 'warning' });
      return null;
    }
  }

  getNameWareHouse(id) {
    const warehouse = this.roles.find((x) => x.id == id);
    return warehouse ? warehouse.name : 'Todas las bodegas';
  }

  setData(res) {
    const data = res.newsletter;
    this.roles = res.roles;
    this.form.setValue({
      title: data.title,
      description: data.description,
      image: data.image,
      roles: data.roles.map(x => x.id),
      end_date: new Date(SharedService.convertDateForLaravelOfDataPicker(data.end_date)),
    });
  }


  go() {
    this.router.navigate(['/administracion-sistema/newsletter']);
  }

  removeRol(id): void {
    const value = this.form.get('roles').value as [];
    console.log({ value, id });

    const index = value.findIndex(x => x === id);
    value.splice(index, 1);

    this.form.get('roles').setValue(value);

  }

  getNameRol(id): string {
    return this.roles.find((x) => x.id == id).name;
  }

  // selectAllWarehouse($event) {
  //   const index = $event.value.findIndex((x) => x == 'all');
  // }

  // removeWarehouse(id) {
  //   const index = this.data.findIndex((x) => x == id);
  //   if (index != -1) {
  //     this.roles.splice(index, 1);
  //     this.select_warehouse.writeValue(this.warehouse_ids);
  //   }
  // }

}
