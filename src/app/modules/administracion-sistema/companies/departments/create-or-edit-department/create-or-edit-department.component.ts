import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute, Router } from '@angular/router';
import { Icompany } from '../../../../../interfaces/idashboard';
import { IDepartment } from '../../../../../interfaces/idepartment';
import { StandartSearchService } from '../../../../../services/standart-search.service';
import { SwalService } from '../../../../../services/swal.service';
import { CreateOrEdit } from './../../../../../class/create-or-edit';


export interface ITreeDepartment {
  id: number;
  name: string;
  company_id: number;
  parent_department_id: number;
  boss_person_id?: null;
  created_at: string;
  updated_at: string;
  deleted_at?: null;
  childs?: ITreeDepartment[];
}


@Component({
  selector: 'app-create-or-edit-department',
  templateUrl: './create-or-edit-department.component.html',
  styleUrls: ['./create-or-edit-department.component.css']
})
export class CreateOrEditDepartmentComponent extends CreateOrEdit<IDepartment> implements OnInit {
  urlSave: any;

  constructor(public override act_router: ActivatedRoute, public override standard_service: StandartSearchService, public override router: Router) {
    super(act_router, standard_service, router);
    this.urlSave = `admin/companies/${this.getId('company_id')}/departments`;
  }

  public override key_param: string = 'department_id';

  title: string = 'Departamento';
  departments: IDepartment[] = [];
  override form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  treeControl = new FlatTreeControl<any>(
    node => node.level, node => node.expandable);
  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.childs && node.childs.length > 0,
      name: node.name,
      level: level,
      id: node.id,
      selected: node?.selected || false
    };
  }
  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.childs);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  department_selected!: number ;
  company!: Icompany;

  ngOnInit(): void {
    this.init();
  }

  recursiveFind(node: any, id: number): ITreeDepartment {
    if (node.id === id) {
      node.selected = true;
    }
    if (node.childs.length > 0) {
      for (const child of node.childs) {
         this.recursiveFind(child, id);
      }
    }
    return node;
  }

  override setData(data: any): void {
    if (this.status === 'create') {
      this.dataSource.data = data.tree;
    } else {
      this.company = data.company;
      const department_parent = data.department.parent_department_id;
      const tree = data.tree.map(value => {
        return this.recursiveFind(value, department_parent);
      });
      this.department_selected = department_parent;
      this.dataSource.data = tree;
      this.form.setValue({
        name: data?.department?.name
      });
    }
  }
  hasChild = (_: number, node: any) => node.expandable;

  changeValueSelectDepartment($event: MatRadioChange) {
    this.department_selected = $event.value;
  }

  override getDataForSendServer(): any {
    if (this.form.valid && Number.isInteger(this.department_selected)) {
      return {
        ...this.form.value,
        parent_department_id: this.department_selected,
        company_id: this.getId('company_id')
      };
    } else {
      SwalService.swalToast('Faltan datos por llenar', 'error');
      return false;
    }
  }

  override go(): void {
    this.router.navigate(['/administracion-sistema/companies/', this.getId('company_id'), 'departments']);
  }





}
