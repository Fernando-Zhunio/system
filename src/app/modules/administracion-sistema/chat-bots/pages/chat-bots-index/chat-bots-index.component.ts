import { Clipboard } from '@angular/cdk/clipboard';
import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../shared/class/mat-table-helper';
import { MatDialog } from '@angular/material/dialog';
import { ChatBotsCreateOrEditComponent } from '../../components/dialog-chat-bots-create-or-edit/dialog-chat-bots-create-or-edit.component';
import { NgxSearchBarComponent } from 'ngx-search-bar-fz';


@Component({
  selector: 'app-chat-bots-index',
  templateUrl: './chat-bots-index.component.html',
  styleUrls: ['./chat-bots-index.component.css']
})
export class ChatBotsIndexComponent extends MatTableHelper<any> {
  protected columnsToDisplay: string[] = ['img', 'api_token', 'id', 'name', 'status', 'type', 'actions'];
  protected table: MatTable<any>;
  @ViewChild(NgxSearchBarComponent) searchBar: NgxSearchBarComponent 

    constructor(protected mhs: MethodsHttpService, 
      protected snackBar: MatSnackBar,  
      private clipboard: Clipboard,
      private dialog: MatDialog,
      ) {
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

  openDialog(id?: number): void {
    const item = id ? this.dataSource.find(x => x._id === id) : null;
    this.dialog.open(ChatBotsCreateOrEditComponent, {
      width: '400px',
      data: item,
    }).beforeClosed().subscribe(res => {
      if (!res) {
        return;
      }
      this.searchBar.search();
    });
  }

}
