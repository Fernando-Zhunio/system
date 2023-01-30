import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { SwalService } from '../../../../../services/swal.service';

@Component({
  selector: 'app-mercado-libre-create-or-edit',
  templateUrl: './create-or-edit-mercado-libre-admin.component.html',
  styleUrls: ['./create-or-edit-mercado-libre-admin.component.css'],
})
export class CreateOrEditMercadoLibreAdminComponent implements OnInit {
  constructor(
    private location: Location,
    private active_route: ActivatedRoute,
    private methodsHttp: MethodsHttpService
  ) {}

  window_ml: any;
  window_ml2: any;

  form_ml: FormGroup = new FormGroup({
    status: new FormControl(null, [Validators.required]),
    user_name: new FormControl({ value: null, disabled: true }, [
      Validators.required,
    ]),
    user_id: new FormControl({ value: null, disabled: true }, [
      Validators.required,
    ]),
    server_code: new FormControl({ value: null, disabled: true }, [
      Validators.required,
    ]),
    access_token: new FormControl({ value: null, disabled: true }, [
      Validators.required,
    ]),
    refresh_token: new FormControl({ value: null, disabled: true }, [
      Validators.required,
    ]),
    city_id: new FormControl(null, [Validators.required]),
  });
  title: string = 'Creando Cuenta de mercado libre';
  cities: any = {};
  companies: any = {};
  login_url: string;
  statuses: any = {};
  isLoad: boolean = false;
  id: number;
  state: 'create'|'edit' = 'create';
  observerWindow: Observable<boolean>;


  ngOnInit(): void {
    this.active_route.data.subscribe((data) => {
      if (data['isEdit']) {
        this.state = 'edit';
        this.title = 'Editando Mercado Libre';
        this.id = Number.parseInt(this.active_route.snapshot.paramMap.get('id')!);
        const url = 'admin/ml/accounts/' + this.id + '/edit';
        this.methodsHttp.methodGet(url).subscribe((res) => {
          if (res?.success) {
            this.cities = res.data.cities;
            this.companies = res.data.companies;
            this.statuses = res.data.statuses;
            this.companies = res.data.companies;
            this.login_url = res.data.login_url;
            this.isLoad = false;
            const {status, user_name, user_id, server_code, access_token, refresh_token, city_id} = res.data.account
            this.form_ml.setValue({status, user_name, user_id, server_code, access_token, refresh_token, city_id: city_id.toString()});
          }
        });
      } else {
        const url = 'admin/ml/accounts/create';
        this.isLoad = true;
        this.methodsHttp.methodGet(url).subscribe((res) => {
          if (res && res.hasOwnProperty('success') && res.success) {
            this.cities = res.data.cities;
            this.companies = res.data.companies;
            this.statuses = res.data.statuses;
            this.companies = res.data.companies;
            this.login_url = res.data.login_url;
            this.isLoad = false;
          } else {
            SwalService.swalToast(
              'A ocurrido un error, recargue la pagina',
              'error'
              );
            }
          });
      }
    });
  }

  openDialog(): void {
    const w = 500, h = 600;
    const dualScreenLeft =
      window.screenLeft != undefined ? window.screenLeft : window.screenX;
    const dualScreenTop =
      window.screenTop != undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth
      ? window.innerWidth
      : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width;
    const height = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height;

    const left = width / 2 - w / 2 + dualScreenLeft;
    const top = height / 2 - h / 2 + dualScreenTop;

     this.window_ml = window.open(
      this.login_url,
      'login ml',
      'scrollbars=yes, width=500, height=600, top=' + top + ', left=' + left
    );

      this.window_ml.onunload = () => {
      const urlOutHash = this.window_ml.location.href.replace('#', 'fz');
      const url = new URL(urlOutHash);
      const params = new URLSearchParams(url.search);
      if (params.get('code')) {
        this.isLoad = true;
        this.methodsHttp.methodGet('admin/ml/accounts/callback?code=' + params.get('code')).subscribe((res) => {
          if (res && res.hasOwnProperty('success') && res.success) {
            this.form_ml.get('user_name')?.setValue(res.data.user_name);
            this.form_ml.get('user_id')?.setValue(res.data.user_id);
            this.form_ml.get('server_code')?.setValue(res.data.server_code);
            this.form_ml.get('access_token')?.setValue(res.data.access_token);
            this.form_ml.get('refresh_token')?.setValue(res.data.refresh_token);
          }
          this.isLoad = false;
        }, () => this.isLoad = false);
      }
    };
  }

  saveInServer(): void {
    if (this.form_ml.valid) {
      this.isLoad = true;
      if (this.state == 'create') {
        this.methodsHttp.methodPost('admin/ml/accounts', this.form_ml.getRawValue()).subscribe(res => {
          if (res && res.hasOwnProperty('success') && res.success) {
            this.goBack();
          }
          this.isLoad = false;
        }, () => this.isLoad = false)
      } else if (this.state == 'edit') {
        this.methodsHttp.methodPut('admin/ml/accounts/' + this.id, this.form_ml.getRawValue()).subscribe(res => {
          if (res && res.hasOwnProperty('success') && res.success) {
            this.goBack();
          }
          this.isLoad = false;
        }, () => this.isLoad = false)
      }
    }
  }

  goBack(): void {
    this.location.back();
  }
}
