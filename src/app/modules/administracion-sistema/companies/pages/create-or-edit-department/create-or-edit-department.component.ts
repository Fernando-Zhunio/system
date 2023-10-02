import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute, Router } from '@angular/router';
import { Icompany } from '../../../../../interfaces/idashboard';
import { IDepartment } from '../../../../../interfaces/idepartment';
import { SwalService } from '../../../../../services/swal.service';
// import { CreateOrEdit } from '../../../../../class/create-or-edit';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


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
export class CreateOrEditDepartmentComponent implements OnInit {
  // urlSave: any;
  isLoading = false;

  constructor(
    protected route: ActivatedRoute, 
    protected methodsHttpService: MethodsHttpService, 
    protected router: Router,
    private dialogRef: MatDialogRef<CreateOrEditDepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDepartment
    ) {
    // this.urlSave = `admin/companies/${this.getId('company_id')}/departments`;
  }

  // public override key_param: string = 'department_id';

  title: string = 'Departamento';
  departments: IDepartment[] = [];
  form: FormGroup = new FormGroup({
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
    this.title+= this.data ? `Editando` : 'Creando';
    // this.init();
    if (this.data) {
      this.setData(this.data);
    }
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

  setData(data: any): void {
    if (!this.data) {
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

  getDataForSendServer(): any {
    if (this.form.valid && Number.isInteger(this.department_selected)) {
      return {
        ...this.form.value,
        parent_department_id: this.department_selected,
        company_id: this.data.id
      };
    } else {
      SwalService.swalToast('Faltan datos por llenar', 'error');
      return false;
    }
  }

  saveInServer() {
    const sendData = this.getDataForSendServer();
    if (!sendData) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    const path = this.data ? `admin/companies/${this.company.id}/departments/${this.data.id}` : `admin/companies/${this.company.id}/departments`;
    const observable = this.data ? this.methodsHttpService.methodPut(path, sendData) : this.methodsHttpService.methodPost(path, sendData);
    observable.subscribe(
      {
        next: (data) => {
          this.isLoading = false;
          this.dialogRef.close(data);
        }, error: (err) => {
          this.isLoading = false;
          SwalService.swalToast(err.error.message, 'error');
        }
      }
    )
  }

  // go(): void {
  //   this.router.navigate(['/administracion-sistema/companies/', this.getId('company_id'), 'departments']);
  // }





}
