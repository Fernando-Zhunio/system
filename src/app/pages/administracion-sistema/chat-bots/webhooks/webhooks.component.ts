import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { title } from 'process';
import { Crud } from '../../../../class/crud';
import { IChatWebhook } from '../../../../interfaces/ichatbot';
import { StandartSearchService } from '../../../../services/standart-search.service';

@Component({
  selector: 'app-webhooks',
  templateUrl: './webhooks.component.html',
  styleUrls: ['./webhooks.component.css']
})
export class WebhooksComponent extends Crud<IChatWebhook> implements OnInit {

  constructor(protected activated_route: ActivatedRoute, protected standardService: StandartSearchService, protected snackBar: MatSnackBar)  {
    super( standardService, snackBar);
    this.url = `admin/chatbot/${this.getParam('chatbot_id')}/webhooks`;
    this.title = this.getQueryParams('name');
  }

  title: string = 'Webhooks';

  ngOnInit(): void {
  }

  getParam(key): string {
    return this.activated_route.snapshot.paramMap.get(key);
  }

  getQueryParams(key) {
    return this.activated_route.snapshot.queryParamMap.get(key);
  }

  getData(data) {
    console.log(data);
    this.data = new Map<any, IChatWebhook>(data.map((item: IChatWebhook) => [item._id, item]));
  }
}
