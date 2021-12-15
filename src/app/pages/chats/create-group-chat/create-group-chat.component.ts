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
  img: {file: File, base64: string} = {file: null, base64: null};
  nameGroup: string = '';
  isload: boolean = false;

  public urlSave: any = 'chats/groups';
  public params: any = '?page=&search=';
  public title: string = 'Chat grupal - ';

  isFormParams: boolean = true;
  ngOnInit(): void {
    // this.searchUser();
    this.init();
  }

  setData(data: any): void {
    if ( this.status != 'edit' ) {
      this.users = new Map<any, IuserSystem>( data.data.map((item) => [item.id, item]));
    } else {
      console.log(data);
      const _chat = data.chat as Ichats;
      this.nameGroup = _chat.name;
      this.img.base64 = _chat.img;
      const participants = _chat.participants.filter((item) => item.id != _chat.user.id);
      this.users = new Map<any, IuserSystem>( data.users.data.map((item) => [item.id, item]));
      this.usersSelect = new Map<any, any>( participants.map((item) => [item.id, {...this.users.get(item.id), isAdmin: _chat.admins.includes(item._id)} ]));
    }
  }

  searchUser(): void {
    // const search = this.firstFormGroup.get('search').value;
    this.isload = true;
    this.params = '?page=&search=' + this.searchText;
    this.create();
  }

  addUser(user_id): void {
    console.log(user_id);
    // const user = this.usersSelect.find((item) => item.id == user_id);
    if (!this.usersSelect.has(user_id)) {
      const userAdd = this.users.get(user_id);
      // this.firstFormGroup.get('users_id').value.push(user_id);
      // console.log(this.firstFormGroup.get('users_id').value);
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

    this.img = {file: null, base64: null};
    // this.fileImg = null;
  }
  callbackImg(e): void {
    // console.log(e);
    this.img.base64 = e.srcElement.result;
  }

  // saveInServer(): void {
  //   const data_send = this.getDataForSendServer();
  //   if (data_send) {
  //     this.isload = true;
  //     this.s_standard.uploadFormData(this.urlSave, data_send as FormData).subscribe((res) => {
  //       console.log(res);
  //       this.isload = false;
  //       SwalService.swalFire({icon: 'success', text: 'Grupo creado con exito', position: 'center'});
  //       this.router.navigate(['/home/inicio']);
  //     }, (err) => {
  //       this.isload = false;
  //       console.log(err);
  //     });
  //   }
  // }


  getDataForSendServer(): boolean|FormData {
    console.log(this.usersSelect);
    
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

  go(): void {
    this.router.navigate(['/home/inicio']);
  }
}
