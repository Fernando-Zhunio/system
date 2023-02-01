import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrEdit } from '../../../../../class/create-or-edit';
import { Roles } from '../../../../../interfaces/iroles-and-permissions';
import { StandartSearchService } from '../../../../../services/standart-search.service';

@Component({
  selector: 'app-create-or-edit-price-group',
  templateUrl: './create-or-edit-price-group.component.html',
  styleUrls: ['./create-or-edit-price-group.component.css']
})
export class CreateOrEditPriceGroupComponent extends CreateOrEdit<any> implements OnInit {
  public title: string = 'Grupo de precios - ';

  constructor( standard: StandartSearchService, router: Router, activated_router: ActivatedRoute ) {
    super( activated_router, standard, router);
   }
  urlSave: any = 'admin/prices/groups';
  override form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    active: new FormControl(false, [Validators.required]),
    required: new FormControl(false, [Validators.required]),
    roles: new FormControl([], [Validators.required]),
  });
  roles: Roles[] = [];
  override key_param: string = 'price_group_id';

  ngOnInit(): void {
    this.init();
  }

  override setData(data?: any): void {
      if (this.status == 'edit') {
        data.price_group.roles = data.price_group.roles.map(role => role.id);
        this.form.patchValue(data.price_group);
        this.roles = data.roles;
      } else {
        this.roles = data;
      }
  }

  assignDataForm(data: any): void {
    this.form.get('name')?.setValue(data.name);
    this.form.get('type')?.setValue(data.type);
    this.form.get('active')?.setValue(data.active);
    this.form.get('required')?.setValue(data.required);
    this.form.get('roles')?.setValue(data.roles);
  }

  override getDataForSendServer() {
    if (this.form.valid) {
      return this.form.value;
    }
    return false;
  }

  override go(): void {
    this.router.navigate(['administracion-sistema/prices/groups']);
  }



}
