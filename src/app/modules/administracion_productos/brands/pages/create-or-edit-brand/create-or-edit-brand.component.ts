// import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrEdit2 } from '../../../../../class/create-or-edit-2';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { Brand } from '../../interfaces/brand';
// import { MarcasService } from '../../../../services/marcas.service';
// import { SwalService } from '../../../../services/swal.service';

@Component({
  selector: 'app-marcas-create-or-edit',
  templateUrl: './create-or-edit-brand.component.html',
  styleUrls: ['./create-or-edit-brand.component.css'],
})
export class CreateOrEditBrandComponent extends CreateOrEdit2<any> implements OnInit {
  // constructor(
  //   private s_marcas: MarcasService,
  //   private act_router: ActivatedRoute,
  //   private location:Location,
  //   private router:Router
  // ) {}

  // formCreateOrEdit: FormGroup = new FormGroup({
  //   name: new FormControl('', [Validators.required, Validators.max(200)]),
  //   sort_name: new FormControl('', [Validators.max(200)]),
  // });

  // title: string = '';
  // isSend = false;
  // product_name = '';

  // id: any = null;
  // ngOnInit(): void {
  //   this.act_router.data.subscribe((res) => {
  //     if (res['isEdit']) {
  //       this.title = 'Editando Marca';
  //       this.id = this.act_router.snapshot.paramMap.get('id');
  //       this.s_marcas.edit(this.id).subscribe((response) => {
  //         this.product_name = response.data.name;
  //         this.formCreateOrEdit.controls['name'].setValue(response.data.name);
  //         this.formCreateOrEdit.controls['sort_name'].setValue(
  //           response.data.sort_name
  //         );
  //       });
  //     } else {
  //       this.title = 'Creando Marca';
  //     }
  //   });
  // }

  // sendData(): void {
  //   if (this.formCreateOrEdit.valid) {
  //     this.isSend = !this.isSend;
  //     if (!this.id) {
  //       this.s_marcas.store(this.formCreateOrEdit.value).subscribe(
  //         (res) => {
  //           if (res.success) {
  //             SwalService.swalToast('Marca creado con exito', 'success');
  //             this.router.navigate(['admin-products/marcas']);
  //           }
  //           this.isSend = !this.isSend;
  //         },
  //         (error) => {
  //           this.isSend = !this.isSend;
  //         }
  //       );
  //     } else {
  //       this.s_marcas.update(this.id, this.formCreateOrEdit.value).subscribe(
  //         (res) => {
  //           if ( res.success) {
  //             SwalService.swalToast('Marca actualizada con exito', 'success');
  //             this.router.navigate(['admin-products/marcas']);
  //           }
  //           this.isSend = !this.isSend;
  //         },
  //         (error) => {
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
  public urlSave: any = 'products-admin/brands';
  override isEdit: boolean = false;
  override isDialog: boolean = true;
  constructor(
    protected router: Router,
    protected methodsHttp: MethodsHttpService,
    protected act_router: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public info: {id: string, isEdit},
    private dialogRef: MatDialogRef<CreateOrEditBrandComponent>
  ) {
    super();
    this.isEdit = info.isEdit;
  }

  override form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.max(200)]),
    sort_name: new FormControl('', [Validators.max(200)]),
  });

  ngOnInit(): void {
    this.init(false);
  }

  override getId(): any {
    return this.info.id;
  }

  override setData(data?:{brand: Brand}): void {
    this.form.patchValue({
      name: data?.brand.name,
      sort_name: data?.brand.sort_name,
    });
  }

  override go(data?: null): void {
    this.dialogRef.close(data);
  }
}
