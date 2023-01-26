import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrEdit } from '../../../../../class/create-or-edit';
import { IDepartment } from '../../../../../interfaces/idepartment';
import { StandartSearchService } from '../../../../../services/standart-search.service';
import { IPosition } from '../../../../../interfaces/iposition';

@Component({
  selector: 'app-create-or-edit-position',
  templateUrl: './create-or-edit-position.component.html',
  styleUrls: ['./create-or-edit-position.component.css']
})
export class CreateOrEditPositionComponent extends CreateOrEdit<IPosition> implements OnInit {
  public urlSave: any;

  constructor( public override act_router: ActivatedRoute, public override standard_service: StandartSearchService, public override router: Router) {
    super( act_router, standard_service, router);
    this.urlSave = `admin/companies/${this.getId('company_id')}/departments/${this.getId('department_id')}/positions`;
  }

  title: string = 'Posición';
  hierarchy_types: {[key: string]: string}[] = [];
  employe_types: any = null;
  department: IDepartment | null = null;
  override form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    hierarchy_type: new FormControl('', [Validators.required]),
    employe_type: new FormControl('', [Validators.required]),
  });
  public override key_param: string = 'position_id';
  ngOnInit(): void {
    this.init();
  }

  override setData(data: any): void {
      this.hierarchy_types = data.hierarchy_types;
      this.employe_types = data.employe_types;
      this.department = data.department;
      if (this.status === 'edit') {
        this.form.setValue({
          name: data.position.name,
          hierarchy_type: data.position.hierarchy_type,
          employe_type: data.position.employe_type,
        });
      }
  }

  override getDataForSendServer() {
      if (this.form.valid) {
        return this.form.value;
      }
      return false;
  }

  override go() {
    this.router.navigate(['/administracion-sistema/companies/' + this.getId('company_id') + '/departments/' + this.getId('department_id') + '/positions']);
  }

}
