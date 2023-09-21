import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Inewsletter } from '../../../../../interfaces/inewsletter';
import { IrolSystem } from '../../../../../interfaces/irol-system';
import { SharedService } from '../../../../../services/shared/shared.service';
// import { StandartSearchService } from '../../../../../services/standart-search.service';
import { SwalService } from '../../../../../services/swal.service';
import { CreateOrEdit } from '../../../../../class/create-or-edit';
import { MethodsHttpService } from '../../../../../services/methods-http.service';

@Component({
  selector: 'app-create-or-edit-newsletter',
  templateUrl: './create-or-edit-newsletter.component.html',
  styleUrls: ['./create-or-edit-newsletter.component.css']
})
export class CreateOrEditNewsletterComponent extends CreateOrEdit<Inewsletter> implements OnInit {

  constructor(
    protected route: ActivatedRoute, protected methodsHttpService: MethodsHttpService, protected router: Router
    ) {
    super();
  }

  urlSave = 'admin/newsletter';
  title = 'Novedad del sistema';
  expandQuill = false;
  override form: FormGroup = new FormGroup({
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

  override loaderDataForCreate(): void {
    this.methodsHttpService.methodGet('admin/newsletter/create').subscribe((res) => {
      this.roles = res.data;
    });
  }

  override getDataForSendServer() {
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

  override setData(res) {
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


  override go() {
    this.router.navigate(['/administracion-sistema/newsletter']);
  }

  removeRol(id): void {
    const value = this.form.get('roles')?.value as [];

    const index = value.findIndex(x => x === id);
    value.splice(index, 1);

    this.form.get('roles')?.setValue(value);

  }

  getNameRol(id): string | undefined {
    return this.roles?.find((x) => x.id == id)?.name;
  }



}
