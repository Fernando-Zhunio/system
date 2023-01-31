import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { Permission } from '../../interfaces-and-types/permission'
@Component({
  selector: 'app-create-or-edit-permission',
  templateUrl: './create-or-edit-permission.component.html',
  styleUrls: ['./create-or-edit-permission.component.css']
})
export class CreateOrEditPermissionComponent {
  public title: string;
  public urlSave: any;
  isLoading: boolean = false;
  currentForm: 'crud' | 'normal' = 'crud';
  inputsForm: string[] = []

  constructor(private methodsHttp: MethodsHttpService, @Inject(MAT_BOTTOM_SHEET_DATA) public data: { id: number, isEdit: boolean }, private sheet: MatBottomSheetRef) {
    this.isLoading = true;
    if (data.id) {
      const url = `admin/permissions/${data.id}/edit`;
      this.methodsHttp.methodGet(url).subscribe({
        next: (response: any) => {
          console.log(response);
          const permission = response.data.permission as Permission;
          this.convertForm(false);
          this.form.patchValue({
            group_permission_id: permission.group_permission_id,
            name: permission.name,
            title: permission.title,
            description: permission.description,
            guard_name: permission.guard_name,
          });
          this.groupsPermissions = response.data.groupsPermissions;
          this.isLoading = false;
        },
        error: err => {
          console.error(err);
        }
      }
      );
    } else {
      const url = `admin/permissions/create`;
      this.methodsHttp.methodGet(url).subscribe(
        (response: any) => {
          this.groupsPermissions = response.data;
          this.isLoading = false;

        }, err => {
          console.error(err);
        }
      );
    }
  }

  groupsPermissions = [];
  form: FormGroup = new FormGroup({
    group_permission_id: new FormControl(null),
    name: new FormControl(null, [Validators.required]),
    guard_name: new FormControl(null),

    // title: new FormControl(null, [Validators.required]),
    // description: new FormControl(null, [Validators.required]),

    // singular_name: new FormControl(null, [Validators.required]),
    // plural_name: new FormControl(null, [Validators.required]),
    // article: new FormControl(null, [Validators.required]),
  });

  // formCrud: FormGroup = new FormGroup({
  //   group_permission_id: new FormControl(null, [Validators.required]),
  //   name: new FormControl(null, [Validators.required]),
  //   guard_name: new FormControl(null, [Validators.required]),
  // });

  convertForm(toCrud: boolean = true): void {
    const arrCrud = ['singular_name', 'plural_name', 'article'];
    const arr = ['title', 'description'];
    let auxArr = toCrud ? arr : arrCrud;
    for (let index = 0; index < auxArr.length; index++) {
      if (this.form.get(auxArr[index]))
      this.form.removeControl(auxArr[index]);
    }

    auxArr = toCrud ? arrCrud : arr;
    for (let index = 0; index < auxArr.length; index++) {
      this.form.addControl(auxArr[index], new FormControl(null, [Validators.required]));
    }
    this.inputsForm = Object.keys(this.form.value).filter(key => key !== 'group_permission_id');
  }

  saveInServer() {
    if (this.form.valid) {
      switch (this.currentForm) {
        case 'crud':
          this.isLoading = true;
          if (!this.data.id) {
            const url = `admin/permissions`;
            this.methodsHttp.methodPost(url, { isCrud: true, ...this.form.value }).subscribe(
              (response: any) => {
                this.sheet.dismiss(response.data);
              }
            );
          }
          break;
        default:
          this.isLoading = true;
          if (!this.data.id) {
            const url = `admin/permissions`;
            this.methodsHttp.methodPost(url, this.form.value).subscribe(
              (response: any) => {
                this.sheet.dismiss(response.data);
              }
            );
          } else {
            const url = `admin/permissions/${this.data.id}`;
            this.methodsHttp.methodPut(url, this.form.value).subscribe(
              (response: any) => {
                this.sheet.dismiss(response.data);
              }
            );
          }
          break;
      }

    }

  }

  close() {
    this.sheet.dismiss();
  }

  changeForm(event: MatButtonToggleChange) {
    this.currentForm = event.value;
    this.convertForm(event.value === 'crud');
  }

}
