import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrEdit } from '../../../../../class/create-or-edit';
import { StandartSearchService } from '../../../../../services/standart-search.service';

@Component({
  selector: 'app-create-or-edit-webhook-url',
  templateUrl: './create-or-edit-webhook-url.component.html',
  styleUrls: ['./create-or-edit-webhook-url.component.css']
})
export class CreateOrEditWebhookUrlComponent extends CreateOrEdit<any> implements OnInit {
  public title: string = 'Webhook URL ';
  public urlSave: any = 'admin/webhooks/webhooks-url';
  key_param: string = 'webhook_url_id';

  constructor(activated_router: ActivatedRoute, s_standard: StandartSearchService, router: Router, public location: Location) {
    super(activated_router, s_standard, router);
  }

  types: { name: string, value: string }[] = [];
  form: FormGroup = new FormGroup({
    url: new FormControl(null, [Validators.required]),
    suscriptions: new FormControl([], [Validators.required]),
  });
  ngOnInit(): void {
    this.init();
  }

  setData(data?: any): void {
    if (this.status === 'edit') {
      this.form.setValue({ url: data.webhook.url, suscriptions: data.webhook.suscriptions });
      this.types = data.types;
    } else {
      this.types = data;
    }
  }

  getDataForSendServer() {
    if (this.form.valid) {
      return this.form.value;
    } else {
      return false;
    }
  }

  go(): void {
    this.router.navigate(['administracion-sistema/webhooks/webhooks-url']);
  }

}
