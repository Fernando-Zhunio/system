import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor( public act_router: ActivatedRoute, public standard_service: StandartSearchService, public router: Router) {
    super( act_router, standard_service, router);
    this.urlSave = `admin/companies/${this.getId()}/departments`;
  }

  title: string = 'Departamento';
  // url: string = '';
  departments: IDepartment[] = [];
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  treeControl = new FlatTreeControl<any>(
    node => node.level, node => node.expandable);
  // tslint:disable-next-line: member-ordering
  private _transformer = (node: ITreeDepartment, level: number) => {
    return {
      expandable: !!node.childs && node.childs.length > 0,
      name: node.name,
      level: level,
      id: node.id,
      selected: false
    };
  }
  // tslint:disable-next-line: member-ordering
  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.childs);
  // tslint:disable-next-line: member-ordering
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  apartments_selected: Map<number, number> = new Map<number, number>();

  ngOnInit(): void {
    this.init();
  }

  setData(data: any): void {
    console.log(data);
    this.dataSource.data = data.tree;
  }
  hasChild = (_: number, node: any) => node.expandable;

  changeValueSelectDepartment($event: MatCheckboxChange, node) {
    if ($event.checked) {
      this.apartments_selected.set(node.id, node.id);
    } else {
      this.apartments_selected.delete(node.id);
    }
    console.log(this.apartments_selected.values());
  }

  getDataForSendServer(): any {
    if (this.form.valid && this.apartments_selected.size > 0) {
      return {
        ...this.form.value,
        parent_department_id: this.apartments_selected.values().next().value,
        company_id: this.getId()
      };
    } else {
      SwalService.swalToast('Faltan datos por llenar', 'error');
      return false;
    }
   }

   go(): void {
    this.router.navigate(['/administracion-sistema/companies/', this.getId(), 'departments']);
   }





}
