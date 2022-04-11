import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Crud } from '../../../../../class/crud';
import { StandartSearchService } from '../../../../../services/standart-search.service';

@Component({
  selector: 'app-webhook-url-index',
  templateUrl: './webhook-url-index.component.html',
  styleUrls: ['./webhook-url-index.component.css']
})
export class WebhookUrlIndexComponent extends Crud<any> implements OnInit {
  url: string = 'admin/webhooks/webhooks-url';

  constructor( protected standardService: StandartSearchService, protected snackBar: MatSnackBar) {
    super();
  }

  ngOnInit(): void {
  }

}
