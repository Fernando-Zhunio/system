import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../shared/class/mat-table-helper';

@Component({
  selector: 'app-webhook-url-index',
  templateUrl: './index-webhook-url.component.html',
  styleUrls: ['./index-webhook-url.component.css']
})
export class IndexWebhookUrlComponent extends MatTableHelper {
  protected columnsToDisplay = ['id', 'suscriptions', 'url', 'actions'];
  @ViewChild(MatTable) protected table: MatTable<any>;
  
  url: string = 'admin/webhooks/webhooks-url';

  constructor(protected mhs: MethodsHttpService,) {
    super();
  }

}
