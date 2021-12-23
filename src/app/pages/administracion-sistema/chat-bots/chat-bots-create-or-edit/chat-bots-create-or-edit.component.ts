import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrEdit } from '../../../../class/create-or-edit';
import { IChatbot } from '../../../../interfaces/ichatbot';
import { StandartSearchService } from '../../../../services/standart-search.service';

@Component({
  selector: 'app-chat-bots-create-or-edit',
  templateUrl: './chat-bots-create-or-edit.component.html',
  styleUrls: ['./chat-bots-create-or-edit.component.css']
})
export class ChatBotsCreateOrEditComponent extends CreateOrEdit<IChatbot> implements OnInit {

  constructor( activated_route: ActivatedRoute, standardService: StandartSearchService, snackBar: MatSnackBar, router: Router) {
    super(activated_route, standardService, router);
    // this.url = 'admin/chatbot';
  }

  ngOnInit(): void {
  }

}
