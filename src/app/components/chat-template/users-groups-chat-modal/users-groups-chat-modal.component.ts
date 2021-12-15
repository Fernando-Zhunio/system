import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IparticipantChat } from '../../../interfaces/chats/ichats';
import { StandartSearchService } from '../../../services/standart-search.service';
import { SwalService } from '../../../services/swal.service';


interface ImodalChatInfo {
  title: string;
  participants: IparticipantChat[];
  img: string;
  isGroup: boolean;
  myId: any;
  id_chat: any;
  admins: IparticipantChat[];
  is_admin: boolean;
}

@Component({
  selector: 'app-users-groups-chat-modal',
  templateUrl: './users-groups-chat-modal.component.html',
  styleUrls: ['./users-groups-chat-modal.component.css']
})
export class UsersGroupsChatModalComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<UsersGroupsChatModalComponent>, private s_standart: StandartSearchService, @Inject(MAT_DIALOG_DATA) public data: ImodalChatInfo) { }

  ngOnInit(): void {
  }

  deleteChat() {
    this.s_standart.destory(`chats/users/${this.data.id_chat}`).subscribe(res => {
      // console.log(res);
      SwalService.swalFire({ icon: 'success', title: 'Eliminado', text: 'Esta Chat a sido eliminado con exito' });
      this.dialogRef.close({ state: 'deleted' });
    });
  }

  deleteParticipants(participant_id): void {
    this.s_standart.destory(`chats/groups/${this.data.id_chat}/participants/${participant_id}`).subscribe(res => {
      // console.log(res);
      if (res && res.hasOwnProperty('success') && res.success){
        this.data.participants = this.data.participants.filter(p => p.id != participant_id);
        SwalService.swalFire({ icon: 'success', title: 'Eliminado', text: 'Esta participante a sido eliminado con exito' });
      }
      // this.dialogRef.close({ state: 'deleted' });
    });
  }

}
