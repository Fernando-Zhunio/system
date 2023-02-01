
// import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CreateOrEdit2 } from '../../../../../class/create-or-edit-2';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { CreateOrEditDialog } from '../../../../../shared/class/create-or-edit-dialog';
import { CreateOrEditDialogData } from '../../../../../shared/interfaces/create-or-edit-dialog-data';

@Component({
  selector: 'app-create-or-edit-prefix',
  templateUrl: './create-or-edit-prefix.component.html',
  styleUrls: ['./create-or-edit-prefix.component.css'],
})
export class CreateOrEditPrefixComponent extends CreateOrEditDialog implements OnInit {
  protected path: string = 'products-admin/prefixes';
  public title: string = 'Marca ';
  constructor(
    protected methodHttp: MethodsHttpService,
    @Inject(MAT_DIALOG_DATA) protected createOrEditData: CreateOrEditDialogData,
    protected dialogRef: MatDialogRef<CreateOrEditPrefixComponent>
  ) {
    super();
  }

  override form: FormGroup = new FormGroup({
    type: new FormControl('', [Validators.required, Validators.max(200)]),
    prefix: new FormControl('', [Validators.max(200)]),
  });

  ngOnInit(): void {
    this.init();
  }

  override loadData(_path: string): void {
    this.setData(this.createOrEditData.info);
  }

  // override setData(data?:{prefix: Prefix}): void {
  //   this.form.patchValue({
  //     type: data?.prefix.type,
  //     prefix: data?.prefix.prefix,
  //   });
  // }

}
