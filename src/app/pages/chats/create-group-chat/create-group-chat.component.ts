import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedService } from '../../../services/shared/shared.service';
import { SwalService } from '../../../services/swal.service';
import { StandartSearchService } from './../../../services/standart-search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrEdit } from './../../../class/create-or-edit';
import { Ichats } from '../../../interfaces/chats/ichats';
import { IuserSystem } from './../../../interfaces/iuser-system';

@Component({
  selector: 'app-create-group-chat',
  templateUrl: './create-group-chat.component.html',
  styleUrls: ['./create-group-chat.component.css'],
})
export class CreateGroupChatComponent extends CreateOrEdit<Ichats> implements OnInit {

  constructor( active_router: ActivatedRoute, public s_standard: StandartSearchService, router: Router) {
    super(active_router, s_standard, router);
  }

  users: Map<any, IuserSystem> = new Map<any, IuserSystem>();
  usersSelect: Map<any, any> = new Map<any, any>();
  secondFormGroup: FormGroup;
  isEditable = false;
  page: number = 1;
  searchText: string = '';
  img: {file: File | null, base64: string | null} = {file: null, base64: 'assets/img/user_group.png'};
  nameGroup: string = '';
  override isLoading: boolean = false;

  public urlSave: any = 'chats/groups';
  public override params: any = '?page=&search=';
  public title: string = 'Chat grupal - ';

  override isFormParams: boolean = true;
  ngOnInit(): void {
    this.init();
  }

  override setData(data: any): void {
    if ( this.status != 'edit' ) {
      this.users = new Map<any, IuserSystem>( data.data.map((item) => [item.id, item]));
    } else {
      const _chat = data.chat as Ichats;
      this.nameGroup = _chat.name;
      this.img.base64 = _chat.img!;
      const participants = data.participants;
      this.users = new Map<any, IuserSystem>( data.users.data.map((item) => [item.id, item]));
      this.usersSelect = new Map<any, any>( participants.map((item) => [item.id, {...item, isAdmin: _chat.admins.includes(item._id)} ]));
    }
  }

  searchUser(): void {
    this.isLoading = true;
    this.params = '?page=&search=' + this.searchText;
    this.standard_service.show(`${this.urlSave}/create${this.params}`).subscribe(data => {
      const res = data.data;
      this.users = new Map<any, IuserSystem>( res.data.map((item) => [item.id, item]));
      this.isLoading = false;
  }, () => { this.isLoading = false; });
  }

  addUser(user_id): void {
    if (!this.usersSelect.has(user_id)) {
      const userAdd = this.users.get(user_id)!;
      userAdd['isAdmin'] = false;
      this.usersSelect.set(user_id, userAdd);
    }
  }

  removeUser(user_id): void {
    this.usersSelect.delete(user_id);
  }

  getPhoto(url): string {
    return SharedService.rediredImageNull(url, 'assets/img/user.png');
  }

  getBase64(event): void {
    this.img.file =  event.target.files[0];
    this.img.base64 = SharedService.getBase64(event, this.callbackImg.bind(this));
  }

  removeImg(): void {

    this.img = {file: null, base64: 'assets/img/user_group.png'};
    // this.fileImg = null;
  }
  callbackImg(e): void {
    // console.log(e);
    this.img.base64 = e.srcElement.result;
  }

  override getDataForSendServer(): boolean|FormData {
    if (this.usersSelect.size < 2 || !this.nameGroup || this.nameGroup.length < 3) {
      SwalService.swalFire({icon: 'error', text: 'Faltan campos por llenar \n 1. Debe tener un minimo de dos usuarios para ser un chat grupal\n 2. Debe tener un nombre de grupo', position: 'center'});
      return false;
    } else {
      const formData: FormData = new FormData();
      formData.append('name', this.nameGroup);
      this.usersSelect.forEach((item) => {
        formData.append('participants[]', item.id);
        if (item.isAdmin) {
          formData.append('admins[]', item.id);
        }
      });

      if (this.img.base64 && this.img.file) {
        formData.append('img', this.img.file);
      }
      return formData;
    }
  }

  override go(): void {
    this.router.navigate(['/home/inicio']);
  }
}
