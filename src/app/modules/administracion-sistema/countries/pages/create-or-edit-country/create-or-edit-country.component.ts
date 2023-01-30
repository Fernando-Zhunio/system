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
  templateUrl: './create-or-edit-country.component.html',
  styleUrls: ['./create-or-edit-country.component.css']
})
export class CreateOrEditCountryComponent extends CreateOrEditDialog implements OnInit {
  protected title: string = 'País';
  protected path: string = 'admin/countries';
  
  // protected createOrEditData: CreateOrEditDialogData;

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required)
  })

  state: "create" | "edit";
  country: Country = new Country();
  constructor(
    protected methodHttp: MethodsHttpService,
    protected dialogRef: MatDialogRef<CreateOrEditCountryComponent>,
    @Inject(MAT_DIALOG_DATA) protected createOrEditData: CreateOrEditDialogData) {
    super();
  }

  ngOnInit(): void {
    // if (this.state == "edit") {
    //   {
    //     this.country = this.data.country;
    //     this.form.setValue({ name: this.country.name, code: this.country.code })
    //   }
    // }
    this.init();
  }

  override loadData(_data: any): void {
    
    this.form.patchValue(this.createOrEditData.info);
  }

  // saveInServer(): void {
  //   this.country.name = this.form_country.get('name')?.value;
  //   this.country.code = this.form_country.get('code')?.value;
  //   this.dialogRef.close({ action: this.state, data: this.country });
  // }



}
