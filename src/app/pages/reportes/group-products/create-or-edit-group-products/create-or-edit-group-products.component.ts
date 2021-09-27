import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import Spreadsheet from '/assets/spreadsheet_trial/codebase/spreadsheet.js';
// import  * as Spreadsheet from './../../../../../assets/spreadsheet_trial/codebase/spreadsheet.js';
// declare let Spreadsheet:any
@Component({
  selector: 'app-create-or-edit-group-products',
  templateUrl: './create-or-edit-group-products.component.html',
  styleUrls: ['./create-or-edit-group-products.component.css']
})
export class CreateOrEditGroupProductsComponent implements OnInit {

  constructor() { }

  form_group_product: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [Validators.required]),
      min_stock: new FormControl(1, [Validators.required])
    }
  )

  // @ViewChild('widget') container: ElementRef;
  // spreadsheet:any;
  state: string = 'Creando grupo de productos'
  ngOnInit(): void {
  //   this.spreadsheet = new Spreadsheet(this.container.nativeElement, {
  //     editLine: false
  // });
  }

  saveData(): void{
  }

  file_excel: any;
  uploadFile(event){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // this.src1 = reader.result;
      this.file_excel = reader.result;
    };
  }

}
