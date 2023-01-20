import { Clipboard } from '@angular/cdk/clipboard';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Crud } from '../../../../class/crud';
import { IChatbot } from '../../../../interfaces/ichatbot';
import { MethodsHttpService } from '../../../../services/methods-http.service';


@Component({
  selector: 'app-chat-bots-index',
  templateUrl: './chat-bots-index.component.html',
  styleUrls: ['./chat-bots-index.component.css']
})
export class ChatBotsIndexComponent extends Crud<IChatbot> {

    constructor(protected methodsHttp: MethodsHttpService, protected snackBar: MatSnackBar,  private clipboard: Clipboard) {
      super();
   }

  url: string = 'admin/chatbot';

  override getData(event): void {
    this.data = new Map<any, IChatbot>(event.map( (item: IChatbot) => [item._id, item]));
  }

  copyToken(code: string) {
    this.clipboard.copy(code);
    this.snackBar.open('Codigo copiado', 'OK', {
      duration: 2000,
    });
    return code;
  }

}
