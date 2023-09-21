import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrEdit } from '../../../../../class/create-or-edit';
import { MethodsHttpService } from '../../../../../services/methods-http.service';

@Component({
  selector: 'app-create-or-edit-webhook-url',
  templateUrl: './create-or-edit-webhook-url.component.html',
  styleUrls: ['./create-or-edit-webhook-url.component.css']
})
export class CreateOrEditWebhookUrlComponent extends CreateOrEdit<any> implements OnInit {
  public title: string = 'Webhook URL ';
  public urlSave: any = 'admin/webhooks/webhooks-url';
  override key_param: string = 'webhook_url_id';

  constructor(
    protected route: ActivatedRoute, protected methodsHttpService: MethodsHttpService, protected router: Router,
    public override location: Location) {
    super();
  }

  types: { name: string, value: string }[] = [];
  override form: FormGroup = new FormGroup({
    url: new FormControl(null, [Validators.required]),
    suscriptions: new FormControl([], [Validators.required]),
  });
  ngOnInit(): void {
    this.init();
  }

  override setData(data?: any): void {
    if (this.status === 'edit') {
      this.form.setValue({ url: data.webhook.url, suscriptions: data.webhook.suscriptions });
      this.types = data.types;
    } else {
      this.types = data;
    }
  }

  override getDataForSendServer() {
    if (this.form.valid) {
      return this.form.value;
    } else {
      return false;
    }
  }

  override go(): void {
    this.router.navigate(['administracion-sistema/webhooks/webhooks-url']);
  }

}
