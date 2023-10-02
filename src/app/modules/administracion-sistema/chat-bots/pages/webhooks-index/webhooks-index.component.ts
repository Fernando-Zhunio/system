import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Crud } from '../../../../../class/crud';
import { IChatWebhook } from '../../../../../interfaces/ichatbot';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateOrEditChatbotWebhookComponent } from '../../components/dialog-create-or-edit-chatbot-webhook/dialog-create-or-edit-chatbot-webhook.component';

@Component({
  selector: 'app-webhooks',
  templateUrl: './webhooks-index.component.html',
  styleUrls: ['./webhooks-index.component.css']
})
export class WebhooksIndexComponent extends Crud<IChatWebhook> {
  url: string;

  constructor(
    protected activated_route: ActivatedRoute, 
    protected methodsHttp: MethodsHttpService, 
    protected snackBar: MatSnackBar,
    private dialog: MatDialog,
    )  {
    super();
    this.url = `admin/chatbot/${this.getParam('chatbot_id')}/webhooks`;
    this.title = this.getQueryParams('name')!;
  }

  title: string = 'Webhooks';


  getParam(key): string {
    return this.activated_route.snapshot.paramMap.get(key)!;
  }

  getQueryParams(key) {
    return this.activated_route.snapshot.queryParamMap.get(key);
  }

  override getData(data) {
    this.data = new Map<any, IChatWebhook>(data.map((item: IChatWebhook) => [item._id, item]));
  }

  openDialog(id: number | null = null): void {
    const item = id ? this.data.get(id) : null;
    this.dialog.open(DialogCreateOrEditChatbotWebhookComponent, {
      width: '400px',
      data: item,
    }).beforeClosed().subscribe(res => {
      if (!res) {
        return;
      }
      // this.searchBar.search();
    });
  }
}
