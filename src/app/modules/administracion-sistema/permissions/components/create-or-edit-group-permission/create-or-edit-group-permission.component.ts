import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { CreateOrEditDialog } from '../../../../../shared/class/create-or-edit-dialog';
import { CreateOrEditDialogData } from '../../../../../shared/interfaces/create-or-edit-dialog-data';
import { ResponseApi } from '../../../../../shared/interfaces/response-api';

@Component({
  selector: 'app-create-or-edit-group-permission',
  templateUrl: './create-or-edit-group-permission.component.html',
  styleUrls: ['./create-or-edit-group-permission.component.scss']
})
export class CreateOrEditGroupPermissionComponent extends CreateOrEditDialog implements OnInit {
  protected title: string = 'Grupo de permisos';
  protected path: string = 'admin/groups-permissions';

  constructor(
    protected methodHttp: MethodsHttpService,
    protected dialogRef: MatDialogRef<any, { response: ResponseApi<any>; sendData: any; }>,
    @Inject(MAT_DIALOG_DATA) protected createOrEditData: CreateOrEditDialogData,
  ) { 
    super();
  }

  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    slug: new FormControl(null, [Validators.required]),
    position: new FormControl(null, [Validators.required]),
  })

  ngOnInit() {
    this.init();
  }

  override loadData(): void {
    this.form.patchValue(this.createOrEditData.info);
  }



}
