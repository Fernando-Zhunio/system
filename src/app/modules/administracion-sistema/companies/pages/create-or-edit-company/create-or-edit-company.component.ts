import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateOrEditDialog } from '../../../../../shared/class/create-or-edit-dialog';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { CreateOrEditDialogData } from '../../../../../shared/interfaces/create-or-edit-dialog-data';
import { StatusCreateOrEdit } from '../../../../../shared/enums/status-create-or-edit';

@Component({
  selector: 'app-create-or-edit-company',
  templateUrl: './create-or-edit-company.component.html',
  styleUrls: ['./create-or-edit-company.component.css']
})
export class CreateOrEditCompanyComponent extends CreateOrEditDialog implements OnInit {
  public path: string = 'admin/companies';
  constructor(
    @Inject(MAT_DIALOG_DATA) protected createOrEditData: CreateOrEditDialogData,
    protected methodHttp: MethodsHttpService,
    protected dialogRef: MatDialogRef<CreateOrEditCompanyComponent>
    ) {
    super();
  }

  ngOnInit(): void {
   this.init(true);
  }

  override form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    country_id: new FormControl('', Validators.required),
  });

  public title: string = 'Compañía';
  // urlSave: any = 'admin/companies';
  countries: {id: number, name: string}[] = [];

  override setData(data: any): void {
    if (this.status === StatusCreateOrEdit.Create) {
      this.countries = data.countries;
      return;
    }
    this.countries = data.countries;
    const company = this.createOrEditData.info || data.companies;
    this.form.setValue({
      name: company.name,
      country_id: company.country_id
    });
  }

}
