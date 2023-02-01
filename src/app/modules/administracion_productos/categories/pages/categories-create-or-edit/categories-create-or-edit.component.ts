import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { CreateOrEditDialog } from '../../../../../shared/class/create-or-edit-dialog';
import { CreateOrEditDialogData } from '../../../../../shared/interfaces/create-or-edit-dialog-data';
// import { Category } from '../interfaces/category';

@Component({
  selector: 'app-categorias-create-or-edit',
  templateUrl: './categories-create-or-edit.component.html',
  styleUrls: ['./categories-create-or-edit.component.css'],
})
export class CategoriesCreateOrEditComponent extends CreateOrEditDialog implements OnInit {
  protected path = 'products-admin/categories';
  public title: string = 'Categoría';
  constructor(
    protected methodHttp: MethodsHttpService,
    @Inject(MAT_DIALOG_DATA) protected createOrEditData: CreateOrEditDialogData,
    protected dialogRef: MatDialogRef<CategoriesCreateOrEditComponent>
  ) {
    super();
  }

  override form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]),
    sort_name: new FormControl('', [Validators.max(200)]),
  });

  ngOnInit(): void {
    this.init(true);
  }

  override loadData(_path: string): void {
    console.log(this.createOrEditData.info);
    this.setData(this.createOrEditData.info);
  }

  // override setData(data?: { category: Category }): void {
  //   this.form.patchValue({
  //     name: data?.category.name,
  //     sort_name: data?.category.sort_name,
  //   });
  // }
}
