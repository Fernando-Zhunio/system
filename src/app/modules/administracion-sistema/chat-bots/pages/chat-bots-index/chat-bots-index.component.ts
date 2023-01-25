import { Clipboard } from '@angular/cdk/clipboard';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
// import { Crud } from '../../../../../class/crud';
// import { IChatbot } from '../../../../../interfaces/ichatbot';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../shared/class/mat-table-helper';


@Component({
  selector: 'app-chat-bots-index',
  templateUrl: './chat-bots-index.component.html',
  styleUrls: ['./chat-bots-index.component.css']
})
export class ChatBotsIndexComponent extends MatTableHelper<any> {
  protected columnsToDisplay: string[] = ['img', 'api_token', 'id', 'name', 'status', 'type', 'actions'];
  protected table: MatTable<any>;
  // protected mhs: MethodsHttpService;

    constructor(protected mhs: MethodsHttpService, protected snackBar: MatSnackBar,  private clipboard: Clipboard) {
      super();
   }

  url: string = 'admin/chatbot';

  // override getData(event): void {
  //   this.data = new Map<any, IChatbot>(event.map( (item: IChatbot) => [item._id, item]));
  // }

  copyToken(code: string) {
    this.clipboard.copy(code);
    this.snackBar.open('Codigo copiado', 'OK', {
      duration: 2000,
    });
    return code;
  }

}
