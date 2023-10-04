import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { CreateOrEdit } from '../../../../../class/create-or-edit';
import { IDepartment } from '../../../../../interfaces/idepartment';
import { IPosition } from '../../../../../interfaces/iposition';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SwalService } from '../../../../../services/swal.service';

@Component({
  selector: 'app-create-or-edit-position',
  templateUrl: './dialog-create-or-edit-position.component.html',
  styleUrls: ['./dialog-create-or-edit-position.component.css']
})
export class DialogCreateOrEditPositionComponent implements OnInit {
  // public urlSave: any;

  constructor( 
    // protected route: ActivatedRoute, 
    protected methodsHttpService: MethodsHttpService,
    private dialogRef: MatDialogRef<DialogCreateOrEditPositionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {companyId: number, department: IDepartment, position: IPosition}
    ) {
    // this.urlSave = `admin/companies/${this.getId('company_id')}/departments/${this.getId('department_id')}/positions`;
  }

  title: string = 'Posición';
  hierarchy_types: {[key: string]: string}[] = [];
  employe_types: any = null;
  department: IDepartment | null = null;
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    hierarchy_type: new FormControl('', [Validators.required]),
    employe_type: new FormControl('', [Validators.required]),
  });
  // public key_param: string = 'position_id';
  isLoading = false;
  ngOnInit(): void {
    // this.init();
    this.initialData();
  }

  initialData(): void {
    const path = this.data.position ? `admin/companies/${this.data.companyId}/departments/${this.data.department.id}/positions/create` 
    : `admin/companies/${this.data.companyId}/departments/${this.data.department.id}/positions/create`
    this.methodsHttpService.methodGet(path).subscribe((res: any) => {
      this.setData(res.data);
    })
  }

  setData(data: any): void {
      this.hierarchy_types = data.hierarchy_types;
      this.employe_types = data.employe_types;
      this.department = data.department;
      if (this.data.position) {
        this.form.setValue({
          name: this.data.position.name,
          hierarchy_type: this.data.position.hierarchy_type,
          employe_type: this.data.position.employe_type,
        });
      }
  }

   getDataForSendServer() {
      if (this.form.valid) {
        return this.form.value;
      }
      return false;
  }

  saveInServer() {
    const sendData = this.getDataForSendServer();
    if (!sendData) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    const path = this.data.position ? `admin/companies/${this.data.companyId}/departments/${this.data.department.id}/positions/${this.data.position.id}` 
    : `admin/companies/${this.data.companyId}/departments/${this.data.department.id}/positions`;
    const observable = this.data.position ? this.methodsHttpService.methodPut(path, sendData) : this.methodsHttpService.methodPost(path, sendData);
    observable.subscribe(
      {
        next: (data) => {
          this.isLoading = false;
          this.dialogRef.close(data);
        }, error: (err) => {
          console.log(err);
          this.isLoading = false;
          SwalService.swalToast(err.error.data, 'error');
        }
      })
  }


}
