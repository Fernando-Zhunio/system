import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Crud } from '../../../../class/crud';
import { IChatBot } from '../../../../interfaces/ichat-bot';
import { StandartSearchService } from '../../../../services/standart-search.service';


@Component({
  selector: 'app-chat-bots-index',
  templateUrl: './chat-bots-index.component.html',
  styleUrls: ['./chat-bots-index.component.css']
})
export class ChatBotsIndexComponent extends Crud<IChatBot> implements OnInit {

  constructor( standardService: StandartSearchService, snackBar: MatSnackBar) {
    super(standardService, snackBar);
   }

  url: string = 'admin/chatbot';

  ngOnInit(): void {
  }

}
