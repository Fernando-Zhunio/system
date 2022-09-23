
// import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrEdit2 } from '../../../../../class/create-or-edit-2';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { Prefix } from '../../interfaces/prefix';
// import { Iresponse } from '../../../../interfaces/Imports/invoice-item';
// import { PrefijoService } from '../../../../services/prefijo.service';
// import { SwalService } from '../../../../services/swal.service';

@Component({
  selector: 'app-create-or-edit-prefix',
  templateUrl: './create-or-edit-prefix.component.html',
  styleUrls: ['./create-or-edit-prefix.component.css'],
})
export class CreateOrEditPrefixComponent extends CreateOrEdit2<any> implements OnInit {
  // constructor(
  //   private location: Location,
  //   private s_prefijos: PrefijoService,
  //   private act_router: ActivatedRoute,
  //   private router: Router
  // ) {}

  // formCreateOrEdit: FormGroup = new FormGroup({
  //   type: new FormControl('', [Validators.required, Validators.max(200)]),
  //   prefix: new FormControl('', [Validators.max(200)]),
  // });

  // title: string = '';
  // // categories=[];
  // // brands=[];
  // // prefixes=[];
  // isSend = false;
  // product_name = '';

  // id: any= null;
  // ngOnInit(): void {
  //   this.act_router.data.subscribe((res) => {
  //     if (res['isEdit']) {
  //       this.title = 'Editando Prefijo';
  //       this.id = this.act_router.snapshot.paramMap.get('id');
  //       this.s_prefijos.edit(this.id).subscribe((response: Iresponse) => {
  //         if (response.success) {
  //           this.product_name = response.data.prefix;
  //           this.formCreateOrEdit.controls['type'].setValue(response.data.type);
  //           this.formCreateOrEdit.controls['prefix'].setValue(
  //             response.data.prefix
  //           );
  //         }
  //       });
  //     } else {
  //       this.title = 'Creando Prefijo';
  //     }
  //   });
  // }

  // sendData(): void {
  //   if (this.formCreateOrEdit.valid) {
  //     this.isSend = !this.isSend;
  //     if (!this.id) {
  //       this.s_prefijos.store(this.formCreateOrEdit.value).subscribe(
  //         (res) => {
  //           if (res.hasOwnProperty('success') && res.success) {
  //             SwalService.swalToast('Prefijo creado con exito', 'success');
  //           } else {
  //             SwalService.swalToast(res.errors, 'warning');
  //           }
  //           this.isSend = !this.isSend;
  //         },
  //         (error) => {
  //           console.log({ error });
  //           this.isSend = !this.isSend;
  //         }
  //       );
  //     } else {
  //       this.s_prefijos.update(this.id, this.formCreateOrEdit.value).subscribe(
  //         (res) => {
  //           if (res.success) {
  //             SwalService.swalToast('Prefijo editado con exito', 'success');
  //             this.router.navigate(['admin-products/prefijos'])
  //           }
  //           this.isSend = !this.isSend;
  //         },
  //         (error) => {
  //           console.log({ error });
  //           this.isSend = !this.isSend;
  //         }
  //       );
  //     }
  //   }
  // }

  // goBack(){
  //   this.location.back();
  // }

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

  ngOnDestroy(): void {
  }

  override go(data?: null): void {
    this.dialogRef.close(data);
  }
}
