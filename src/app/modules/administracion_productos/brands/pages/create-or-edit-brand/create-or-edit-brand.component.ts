// import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { CreateOrEditDialog } from '../../../../../shared/class/create-or-edit-dialog';
import { CreateOrEditDialogData } from '../../../../../shared/interfaces/create-or-edit-dialog-data';

@Component({
  selector: 'app-marcas-create-or-edit',
  templateUrl: './create-or-edit-brand.component.html',
  styleUrls: ['./create-or-edit-brand.component.css'],
})
export class CreateOrEditBrandComponent extends CreateOrEditDialog implements OnInit {
  protected path = 'products-admin/brands';
  public title: string = 'Marca';

  constructor(
    protected methodHttp: MethodsHttpService,

    @Inject(MAT_DIALOG_DATA) public createOrEditData: CreateOrEditDialogData,
    protected dialogRef: MatDialogRef<CreateOrEditBrandComponent>
  ) {
    super();
  }

  override form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.max(200)]),
    sort_name: new FormControl('', [Validators.max(200)]),
  });

  ngOnInit(): void {
    this.init(false);
  }

  public override loadData(_path: string): void {
    this.setData(this.createOrEditData.info);
  }
}
