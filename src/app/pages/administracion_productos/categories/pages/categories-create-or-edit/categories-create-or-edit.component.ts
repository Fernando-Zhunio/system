// import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrEdit2 } from '../../../../../class/create-or-edit-2';
// import { CategoriasService } from '../../../../../services/categorias.service';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { Category } from '../interfaces/category';
// import { SwalService } from '../../../../../services/swal.service';

@Component({
  selector: 'app-categorias-create-or-edit',
  templateUrl: './categories-create-or-edit.component.html',
  styleUrls: ['./categories-create-or-edit.component.css'],
})
export class CategoriesCreateOrEditComponent extends CreateOrEdit2<any> implements OnInit {
  public title: string = 'Categoría ';
  public urlSave: any = 'products-admin/categories';
  override isEdit: boolean = false;
  override isDialog: boolean = true;
  constructor(
    protected router: Router,
    protected methodsHttp: MethodsHttpService,
    protected act_router: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public info: {id: string, isEdit},
    private dialogRef: MatDialogRef<CategoriesCreateOrEditComponent>
  ) {
    super();
    this.isEdit = info.isEdit;
  }

  override form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.max(200)]),
    sort_name: new FormControl('', [Validators.max(200)]),
  });

  ngOnInit(): void {
    this.init();
  }

  override getId(): any {
    console.log(this.info);
    return this.info.id;
  }

  override setData(data?:{category: Category}): void {
    this.form.patchValue({
      name: data?.category.name,
      sort_name: data?.category.sort_name,
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }

  override go(data?: null): void {
    this.dialogRef.close(data);
  }
}
