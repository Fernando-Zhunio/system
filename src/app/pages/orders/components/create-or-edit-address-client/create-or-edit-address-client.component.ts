import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrEdit } from '../../../../class/create-or-edit';
import { StandartSearchService } from '../../../../services/standart-search.service';

@Component({
  selector: 'app-create-or-edit-address-client',
  templateUrl: './create-or-edit-address-client.component.html',
  styleUrls: ['./create-or-edit-address-client.component.scss']
})
export class CreateOrEditAddressClientComponent extends CreateOrEdit<any> implements OnInit {
  public title: string = 'Dirección ';
  public urlSave: any;

  form: FormGroup = new FormGroup({
    first_name: new FormControl(null, [Validators.required]),
    last_name: new FormControl(null, [Validators.required]),
    street: new FormControl(null, [Validators.required]),
    number: new FormControl(null),
    neighborhood: new FormControl(null),
    city: new FormControl(null, [Validators.required]),
    state: new FormControl(null, [Validators.required]),
    zip_code: new FormControl(null),
  });
  constructor(public dialogRef: MatDialogRef<CreateOrEditAddressClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {isEdit: boolean}, activated_route: ActivatedRoute, s_standard: StandartSearchService, router: Router) {
    super(activated_route, s_standard, router);
  }

  ngOnInit(): void {
      const isEdit = this.data.isEdit;
      if (isEdit) {
          this.status = 'edit';
          this.title += ' Editando';
          this.edit();
      } else {
          this.status = 'create';
          this.title += ' Creando';
      }

  }

  go(): void {
    this.dialogRef.close();
  }



}
