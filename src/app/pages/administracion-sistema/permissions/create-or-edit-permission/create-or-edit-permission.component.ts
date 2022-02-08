import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrEdit } from '../../../../class/create-or-edit';
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
          // this.form.patchValue(response.data.permission);
          this.groupsPermissions = response.data;
          console.log(response);
          this.isLoading = false;

        }, err => {
          console.log(err);
        }
      );
    }
  }

  private url: string = 'admin/permissions';
  groupsPermissions = [];
  form: FormGroup = new FormGroup({
    group_permission_id: new FormControl(null),
    name: new FormControl(null, [Validators.required]),
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    guard_name: new FormControl(null),
  });

  saveInServer() {
    if (this.form.valid) {
      this.isLoading = true;
      if (!this.data.isEdit) {
        const url = `admin/permissions`;
        this.s_standard.store(url, this.form.value).subscribe(
          (response: any) => {
            this.sheet.dismiss(response.data.permission);
          }
        );
      } else {
        const url = `admin/permissions/${this.data.id}`;
        this.s_standard.updatePut(url, this.form.value).subscribe(
          (response: any) => {
            this.sheet.dismiss(response.data.permission);
          }
        );
      }
    }
  }

  close() {
    this.sheet.dismiss();
  }

}
