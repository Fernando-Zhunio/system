
// import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrEdit2 } from '../../../../../class/create-or-edit-2';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { Prefix } from '../../interfaces/prefix';

@Component({
  selector: 'app-create-or-edit-prefix',
  templateUrl: './create-or-edit-prefix.component.html',
  styleUrls: ['./create-or-edit-prefix.component.css'],
})
export class CreateOrEditPrefixComponent extends CreateOrEdit2<any> implements OnInit {

  public title: string = 'Marca ';
  public urlSave: any = 'products-admin/prefixes';
  override isEdit: boolean = false;
  override isDialog: boolean = true;
  constructor(
    protected router: Router,
    protected methodsHttp: MethodsHttpService,
    protected act_router: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public info: {id: string, isEdit},
    private dialogRef: MatDialogRef<CreateOrEditPrefixComponent>
  ) {
    super();
    this.isEdit = info.isEdit;
  }

  override form: FormGroup = new FormGroup({
    type: new FormControl('', [Validators.required, Validators.max(200)]),
    prefix: new FormControl('', [Validators.max(200)]),
  });

  ngOnInit(): void {
    this.init(false);
  }

  override getId(): any {
    return this.info.id;
  }

  override setData(data?:{prefix: Prefix}): void {
    this.form.patchValue({
      type: data?.prefix.type,
      prefix: data?.prefix.prefix,
    });
  }

  override go(data?: null): void {
    this.dialogRef.close(data);
  }
}
