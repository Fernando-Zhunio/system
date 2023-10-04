import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Country } from '../../../../../class/country';
// import { CreateOrEditModal } from '../../../../../class/create-or-edit-modal';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { CreateOrEditDialog } from '../../../../../shared/class/create-or-edit-dialog';
import { CreateOrEditDialogData } from '../../../../../shared/interfaces/create-or-edit-dialog-data';

@Component({
  selector: 'app-create-or-edit-country',
  templateUrl: './dialog-create-or-edit-country.component.html',
  styleUrls: ['./dialog-create-or-edit-country.component.css']
})
export class DialogCreateOrEditCountryComponent extends CreateOrEditDialog implements OnInit {
  protected title: string = 'País';
  protected path: string = 'admin/countries';
  

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required)
  })

  state: "create" | "edit";
  country: Country = new Country();
  constructor(
    protected methodHttp: MethodsHttpService,
    protected dialogRef: MatDialogRef<DialogCreateOrEditCountryComponent>,
    @Inject(MAT_DIALOG_DATA) protected createOrEditData: CreateOrEditDialogData) {
    super();
  }

  ngOnInit(): void {
    this.init();
  }

  override loadData(_data: any): void {
    
    this.form.patchValue(this.createOrEditData.info);
  }
}
