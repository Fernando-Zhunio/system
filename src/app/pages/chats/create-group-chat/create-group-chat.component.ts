import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SharedService } from '../../../services/shared/shared.service';
import { SwalService } from '../../../services/swal.service';
import { StandartSearchService } from './../../../services/standart-search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-group-chat',
  templateUrl: './create-group-chat.component.html',
  styleUrls: ['./create-group-chat.component.css'],
})
export class CreateGroupChatComponent implements OnInit {
  constructor(private s_standart: StandartSearchService, private router: Router) {}
  // firstFormGroup: FormGroup = new FormGroup({
  //   users_id: new FormControl([], [Validators.required]),
  //   search: new FormControl(''),
  // });
  users = [];
  usersSelect = [];
  secondFormGroup: FormGroup;
  isEditable = false;
  page: number = 1;
  searchText: string = '';
  imgBase64: any = null;
  nameGroup: string = '';
  fileImg: File = null;
  isload: boolean = false;
  ngOnInit(): void {
    this.searchUser();
  }

  searchUser(): void {
    // const search = this.firstFormGroup.get('search').value;
    this.isload = true;
    this.s_standart
      .index(`user?search=${this.searchText}`, this.page.toString())
      .subscribe((res) => {
        this.users = res.data.data;
        console.log(this.users);
        this.isload = false;
      }, (err) => {
        this.isload = false;
        console.log(err);
      });
  }

  addUser(user_id): void {
    console.log(user_id);
    const user = this.usersSelect.find((item) => item.id == user_id);
    const userAdd = this.users.find((item) => item.id === user_id);
    if (user == undefined && userAdd !== undefined) {
      // this.firstFormGroup.get('users_id').value.push(user_id);
      // console.log(this.firstFormGroup.get('users_id').value);
      this.usersSelect.push(userAdd);
    }
  }

  removeUser(user_id): void {
    const usersIndex = this.usersSelect.findIndex(
      (item) => item.id === user_id
    );
    if (usersIndex !== -1) {
      // const form_user_id_index = this.firstFormGroup.get('users_id').value.findIndex(x => x == user_id);
      // this.firstFormGroup.get('users_id').value.splice(form_user_id_index, 1);
      this.usersSelect.splice(usersIndex, 1);
    }
  }

  getPhoto(url): string {
    return SharedService.rediredImageNull(url, 'assets/img/user.png');
  }

  getBase64(event): void {
    this.fileImg = event.target.files[0];
    this.imgBase64 = SharedService.getBase64(event, this.callbackImg.bind(this));
  }

  removeImg(): void {
    this.imgBase64 = null;
    this.fileImg = null;
  }
  callbackImg(e): void {
    console.log(e);
    this.imgBase64 = e.srcElement.result;
  }

  saveInServer(): void {
    const data_send = this.validationData();
    if (data_send) {
      this.isload = true;
      this.s_standart.uploadFormData('chats/group', data_send as FormData).subscribe((res) => {
        console.log(res);
        this.isload = false;
        SwalService.swalFire({icon: 'success', text: 'Grupo creado con exito', position: 'center'});
        this.router.navigate(['/home/inicio']);
      }, (err) => {
        this.isload = false;
        console.log(err);
      });
    }
  }

  validationData(): boolean|FormData {
    if (this.usersSelect.length < 2 || !this.nameGroup || this.nameGroup.length < 3) {
      SwalService.swalFire({icon: 'error', text: 'Faltan campos por llenar \n 1. Debe tener un minimo de dos usuarios para ser un chat grupal\n 2. Debe tener un nombre de grupo', position: 'center'});
      return false;
    } else {
      const formData: FormData = new FormData();
      formData.append('name', this.nameGroup);
      this.usersSelect.forEach((item) => {
        formData.append('participants[]', item.id);
      });
      if (this.imgBase64) {
        formData.append('img', this.imgBase64);
      }
      return formData;
    }
  }
}
