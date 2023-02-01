import { MethodsHttpService } from './../../../../../services/methods-http.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-or-edit-vtex-warehouses',
  templateUrl: './create-or-edit-vtex-warehouses.component.html',
  styleUrls: ['./create-or-edit-vtex-warehouses.component.css'],
})
export class CreateOrEditVtexWarehousesComponent implements OnInit {
  constructor(
    private methodsHttp: MethodsHttpService,
    private active_route: ActivatedRoute,
    private router: Router
  ) { }
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    warehouse_id: new FormControl('', [Validators.required]),
  });
  state: 'create' | 'edit' = 'create';
  title: string = 'Creando Bodega Vtex';
  idSite: number;
  idWarehouse: any;
  warehouses: any = [];
  isLoading: boolean = false;
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.active_route.data.subscribe((data) => {
      const id = this.active_route.parent?.snapshot.paramMap.get('id')!;
      this.idSite = Number.parseInt(id, 10);
      this.isLoading = true;
      if (data['isEdit']) {
        this.idWarehouse =
          this.active_route.snapshot.paramMap.get('id');
        this.state = 'edit';
        this.title = 'Editando Bodega Vtex';
        this.methodsHttp
          .methodGet(`admin/vtex/${id}/warehouses/${this.idWarehouse}/edit`)
          .subscribe({
            next: (res) => {
              if (res && res.hasOwnProperty('success') && res.success) {
                this.assignDataForm(res.data.vtexWarehouse);
                this.warehouses = res.data.warehouses;
                this.isLoading = false;
              }
            }
          });
      } else {
        this.methodsHttp
          .methodGet(`admin/vtex/${id}/warehouses/create`)
          .subscribe({
            next: (res) => {
              if (res && res.hasOwnProperty('success') && res.success) {
                this.isLoading = false;
                this.warehouses = res.data;
              }
            }
          });
      }
    });
  }

  assignDataForm(data: any) {
    this.form.patchValue(data);
  }

  saveInServer(): void {
    if (this.form.valid) {
      this.isLoading = true;
      if (this.state === 'create') {
        this.methodsHttp
          .methodPost(`admin/vtex/${this.idSite}/warehouses`, this.form.value)
          .subscribe({
            next: (res) => {
              if (res?.success) {
                this.router.navigate([
                  '/administracion-sistema/vtex-sites/', this.idSite, 'vtex-warehouses',
                ]);
              }
            }, error: err => {
              console.error(err);
              this.isLoading = false;
            }
          });
      } else {
        this.methodsHttp
          .methodPut(`admin/vtex/${this.idSite}/warehouses/${this.idWarehouse}`, this.form.value)
          .subscribe({
            next: (res) => {
              if (res && res.hasOwnProperty('success') && res.success) {
                this.router.navigate([
                  '/administracion-sistema/vtex-sites',
                  this.idSite,
                  'vtex-warehouses',
                ]);
              }
            }, error: err => {
              console.error(err);
              this.isLoading = false;
            }
          });
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
}
