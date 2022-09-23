import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrEdit } from '../../../../../class/create-or-edit';
import { IChatWebhook } from '../../../../../interfaces/ichatbot';
import { StandartSearchService } from '../../../../../services/standart-search.service';

@Component({
  selector: 'app-create-or-edit-chatbot-webhook',
  templateUrl: './create-or-edit-chatbot-webhook.component.html',
  styleUrls: ['./create-or-edit-chatbot-webhook.component.css']
})
export class CreateOrEditChatbotWebhookComponent extends CreateOrEdit<IChatWebhook> implements OnInit {
  public urlSave: any;

  constructor(public override act_router: ActivatedRoute, public override standard_service: StandartSearchService, public override router: Router, public override location: Location) {
    super(act_router, standard_service, router);
    this.urlSave = `admin/chatbot/${this.getId('chatbot_id')}/webhooks`;
  }

  override form: FormGroup = new FormGroup({
    endpoint: new FormControl(null, Validators.required)
  });
  title: string = 'Webhook - ';
  public override key_param: string = 'webhook_id';
  ngOnInit(): void {
    this.init();
  }

  override setData(data?: any): void {
    if (data) {
      this.form.patchValue({
        endpoint: data.endpoint
      });
    }
  }

  override getDataForSendServer() {
    // const formData: FormData = new FormData();
    if (this.form.valid) {
      return {url: this.form.get('endpoint')?.value};
    }
    return false;
  }

  override go(): void {
    this.location.back();
  }

}
