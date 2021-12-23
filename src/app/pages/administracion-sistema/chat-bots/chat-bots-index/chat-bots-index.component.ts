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

  constructor( standardService: StandartSearchService, snackBar: MatSnackBar) {
    super(standardService, snackBar);
   }

  url: string = 'admin/chatbot';

  ngOnInit(): void {
  }

  getData(event): void {
    console.log(event);
    this.data = new Map<any, IChatbot>(event.map( (item: IChatbot) => [item._id, item]));

    
  }

}
