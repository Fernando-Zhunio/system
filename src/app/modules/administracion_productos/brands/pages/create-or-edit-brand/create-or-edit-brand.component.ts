// import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrEdit2 } from '../../../../../class/create-or-edit-2';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { Brand } from '../../interfaces/brand';
// import { MarcasService } from '../../../../services/marcas.service';
// import { SwalService } from '../../../../services/swal.service';

@Component({
  selector: 'app-marcas-create-or-edit',
  templateUrl: './create-or-edit-brand.component.html',
  styleUrls: ['./create-or-edit-brand.component.css'],
})
export class CreateOrEditBrandComponent extends CreateOrEdit2<any> implements OnInit {
  public title: string = 'Marca ';
  public urlSave: any = 'products-admin/brands';
  override isEdit: boolean = false;
  override isDialog: boolean = true;
  constructor(
    protected router: Router,
    protected methodsHttp: MethodsHttpService,
    protected act_router: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public info: {id: string, isEdit},
    private dialogRef: MatDialogRef<CreateOrEditBrandComponent>
  ) {
    super();
    this.isEdit = info.isEdit;
  }

  override form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.max(200)]),
    sort_name: new FormControl('', [Validators.max(200)]),
  });

  ngOnInit(): void {
    this.init(false);
  }

  override getId(): any {
    return this.info.id;
  }

  override setData(data?:{brand: Brand}): void {
    this.form.patchValue({
      name: data?.brand.name,
      sort_name: data?.brand.sort_name,
    });
  }

  override go(data?: null): void {
    this.dialogRef.close(data);
  }
}
