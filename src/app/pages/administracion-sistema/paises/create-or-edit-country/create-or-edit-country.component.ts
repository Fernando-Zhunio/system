import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Country } from '../../../../class/country';

@Component({
  selector: 'app-create-or-edit-country',
  templateUrl: './create-or-edit-country.component.html',
  styleUrls: ['./create-or-edit-country.component.css']
})
export class CreateOrEditCountryComponent implements OnInit {

  form_country:FormGroup = new FormGroup({
    name:new FormControl('',Validators.required),
    code:new FormControl('',Validators.required)
  })
  state:"create"|"edit";
  country:Country = new Country();
  constructor(
    // private snack: MatSnackBar,
    // private s_standart: StandartSearchService,
    private dialogRef: MatDialogRef<CreateOrEditCountryComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{action:{title:string,state:"create"|"edit"},country:Country}) {
      this.state = data.action.state;
     }

  ngOnInit(): void {
    if(this.state == "edit"){
      {
        this.country = this.data.country;
        this.form_country.setValue({name:this.country.name,code:this.country.code})
      }
    }
  }

  saveInServer():void{
      this.country.name =  this.form_country.get('name')?.value;
      this.country.code =  this.form_country.get('code')?.value;
      this.dialogRef.close({action:this.state,data:this.country});
  }



}
