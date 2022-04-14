import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { StandartSearchService } from '../../../../services/standart-search.service';

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

  constructor(private s_standard: StandartSearchService, @Inject(MAT_BOTTOM_SHEET_DATA) public data: { id: number, isEdit: boolean }, private sheet: MatBottomSheetRef) {
    this.isLoading = true;
    if (data.isEdit) {
      const url = `admin/permissions/${data.id}/edit`;
      this.s_standard.index(url).subscribe(
        (response: any) => {
          this.form.patchValue(response.data.permission);
          this.groupsPermissions = response.data.groupsPermissions;
          console.log(response);
          this.isLoading = false;
        }, err => {
          console.log(err);
        }
      );
    } else {
      const url = `admin/permissions/create`;
      this.s_standard.index(url).subscribe(
        (response: any) => {
          this.groupsPermissions = response.data;
          console.log(response);
          this.isLoading = false;

        }, err => {
          console.log(err);
        }
      );
    }
  }

  groupsPermissions = [];
  form: FormGroup = new FormGroup({
    group_permission_id: new FormControl(null),
    name: new FormControl(null, [Validators.required]),
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    guard_name: new FormControl(null),
  });

  formCrud: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    singular_name: new FormControl(null, [Validators.required]),
    plural_name: new FormControl(null, [Validators.required]),
    article: new FormControl(null, [Validators.required]),
    guard_name: new FormControl(null, [Validators.required]),
    group_permission_id: new FormControl(null, [Validators.required]),
  });


  saveInServer() {
    switch (this.currentForm) {
      case 'crud':
        if (this.formCrud.valid) {
          this.isLoading = true;
          if (!this.data.isEdit) {
            const url = `admin/permissions`;
            this.s_standard.store(url, {isCrud: true, ...this.formCrud.value}).subscribe(
              (response: any) => {
                this.sheet.dismiss(response.data);
              }
            );
          }
        }
        break;
      default:
        if (this.form.valid) {
          this.isLoading = true;
          if (!this.data.isEdit) {
            const url = `admin/permissions`;
            this.s_standard.store(url, this.form.value).subscribe(
              (response: any) => {
                this.sheet.dismiss(response.data);
              }
            );
          } else {
            const url = `admin/permissions/${this.data.id}`;
            this.s_standard.updatePut(url, this.form.value).subscribe(
              (response: any) => {
                console.log(response);
                this.sheet.dismiss(response.data);
              }
            );
          }
        }
        break;
    }

  }

  close() {
    this.sheet.dismiss();
  }

  changeForm(event: MatButtonToggleChange) {
    this.currentForm = event.value;
  }

}
