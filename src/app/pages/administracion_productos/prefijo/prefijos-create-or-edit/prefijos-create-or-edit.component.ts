import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iresponse } from '../../../../interfaces/Imports/invoice-item';
import { PrefijoService } from '../../../../services/prefijo.service';
import { SwalService } from '../../../../services/swal.service';

@Component({
  selector: 'app-prefijos-create-or-edit',
  templateUrl: './prefijos-create-or-edit.component.html',
  styleUrls: ['./prefijos-create-or-edit.component.css'],
})
export class PrefijosCreateOrEditComponent implements OnInit {
  constructor(
    private location: Location,
    private s_prefijos: PrefijoService,
    private act_router: ActivatedRoute,
    private router: Router
  ) {}

  formCreateOrEdit: FormGroup = new FormGroup({
    type: new FormControl('', [Validators.required, Validators.max(200)]),
    prefix: new FormControl('', [Validators.max(200)]),
  });

  title: string = '';
  // categories=[];
  // brands=[];
  // prefixes=[];
  isSend = false;
  product_name = '';

  id: any= null;
  ngOnInit(): void {
    this.act_router.data.subscribe((res) => {
      if (res['isEdit']) {
        this.title = 'Editando Prefijo';
        this.id = this.act_router.snapshot.paramMap.get('id');
        this.s_prefijos.edit(this.id).subscribe((response: Iresponse) => {
          if (response.success) {
            this.product_name = response.data.prefix;
            this.formCreateOrEdit.controls['type'].setValue(response.data.type);
            this.formCreateOrEdit.controls['prefix'].setValue(
              response.data.prefix
            );
          }
        });
      } else {
        this.title = 'Creando Prefijo';
      }
    });
  }

  sendData(): void {
    if (this.formCreateOrEdit.valid) {
      this.isSend = !this.isSend;
      if (!this.id) {
        this.s_prefijos.store(this.formCreateOrEdit.value).subscribe(
          (res) => {
            if (res.hasOwnProperty('success') && res.success) {
              SwalService.swalToast('Prefijo creado con exito', 'success');
            } else {
              SwalService.swalToast(res.errors, 'warning');
            }
            this.isSend = !this.isSend;
          },
          (error) => {
            console.log({ error });
            this.isSend = !this.isSend;
          }
        );
      } else {
        this.s_prefijos.update(this.id, this.formCreateOrEdit.value).subscribe(
          (res) => {
            if (res.success) {
              SwalService.swalToast('Prefijo editado con exito', 'success');
              this.router.navigate(['admin-products/prefijos'])
            }
            this.isSend = !this.isSend;
          },
          (error) => {
            console.log({ error });
            this.isSend = !this.isSend;
          }
        );
      }
    }
  }

  goBack(){
    this.location.back();
  }
}
