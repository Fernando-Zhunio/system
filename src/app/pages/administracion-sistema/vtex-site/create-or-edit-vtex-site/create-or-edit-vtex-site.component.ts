import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StandartSearchService } from '../../../../services/standart-search.service';

@Component({
  selector: 'app-create-or-edit-vtex-site',
  templateUrl: './create-or-edit-vtex-site.component.html',
  styleUrls: ['./create-or-edit-vtex-site.component.css']
})
export class CreateOrEditVtexSiteComponent implements OnInit {

  constructor(private router: Router, private active_route: ActivatedRoute, private s_standart: StandartSearchService) { }
  state: 'edit'|'create' = 'create';
  title: string = 'Creando Sitio Vtex';
  id: number;
  isload: boolean = false;
  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    vtex_api_id: new FormControl(null, [Validators.required]),
    friendly_name: new FormControl(null, [Validators.required]),
    url: new FormControl(null, [Validators.required]),
    app_key: new FormControl(null, [Validators.required]),
    app_token: new FormControl(null, [Validators.required]),

  });
  ngOnInit(): void {
    this.active_route.data.subscribe((data) => {
      if (data.isEdit) {
        this.state = 'edit';
        this.title = 'Editando Sitio Vtex';
        const id = this.active_route.snapshot.paramMap.get('id');
        this.id = Number.parseInt(id, 10);
        this.isload = true;
        this.s_standart.create(`admin/vtex/${id}/edit`).subscribe((res) => {
          if (res && res.hasOwnProperty('success') && res.success) {
            this.assignDataForEdit(res.data);
            this.isload = false;
          }
        });
      } else {
        this.state = 'create';
        this.title = 'Creando Sitio Vtex';
      }
    });
  }

  assignDataForEdit(data: any) {
    this.form.setValue({
      name: data.name,
      vtex_api_id: data.vtex_api_id,
      friendly_name: data.friendly_name,
      url: data.url,
      app_key: data.app_key,
      app_token: data.app_token,
    });
  }

  saveInServer(): void {
    if (this.form.valid) {
      this.isload = true;
      const data = this.form.value;
      if (this.state === 'edit') {
        this.s_standart.updatePut(`admin/vtex/${this.id}`, data).subscribe((res) => {
          if (res && res.hasOwnProperty('success') && res.success) {
            this.router.navigate(['/administracion-sistema/vtex-sites']);
          }
          this.isload = false;
        }, err => {
          console.log(err);
          this.isload = false;
        });
      } else {
        this.s_standart.store(`admin/vtex`, data).subscribe((res) => {
          if (res && res.hasOwnProperty('success') && res.success) {
            this.router.navigate(['/administracion-sistema/vtex-sites']);
          }
          this.isload = false;
        }, err => {
          console.log(err);
          this.isload = false;
        });
      }
    } else {
     this.form.markAllAsTouched();
    }
  }

}
