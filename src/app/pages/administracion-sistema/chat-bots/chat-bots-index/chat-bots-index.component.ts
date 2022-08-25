import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Crud } from '../../../../class/crud';
import { IChatbot } from '../../../../interfaces/ichatbot';
import { StandartSearchService } from '../../../../services/standart-search.service';


@Component({
  selector: 'app-chat-bots-index',
  templateUrl: './chat-bots-index.component.html',
  styleUrls: ['./chat-bots-index.component.css']
})
export class ChatBotsIndexComponent extends Crud<IChatbot> implements OnInit {

    constructor(protected standardService: StandartSearchService, protected snackBar: MatSnackBar,  private clipboard: Clipboard) {
      super();
   }

  url: string = 'admin/chatbot';

  ngOnInit(): void {
  }

  override getData(event): void {
    console.log(event);
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
