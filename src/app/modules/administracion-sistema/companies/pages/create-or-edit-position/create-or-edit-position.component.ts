import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrEdit } from '../../../../../class/create-or-edit';
import { IDepartment } from '../../../../../interfaces/idepartment';
import { IPosition } from '../../../../../interfaces/iposition';
import { MethodsHttpService } from '../../../../../services/methods-http.service';

@Component({
  selector: 'app-create-or-edit-position',
  templateUrl: './create-or-edit-position.component.html',
  styleUrls: ['./create-or-edit-position.component.css']
})
export class CreateOrEditPositionComponent extends CreateOrEdit<IPosition> implements OnInit {
  public urlSave: any;

  constructor( 
    protected route: ActivatedRoute, protected methodsHttpService: MethodsHttpService, protected router: Router) {
    super();
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
