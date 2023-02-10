import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwalService } from '../../../../services/swal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrEdit2 } from '../../../../class/create-or-edit-2';
import { MethodsHttpService } from '../../../../services/methods-http.service';
import { convertFileToUrl } from '../../../../shared/class/tools';
import { User } from '../../../../shared/interfaces/user';

@Component({
  selector: 'app-create-group-chat',
  templateUrl: './create-group-chat.component.html',
  styleUrls: ['./create-group-chat.component.scss'],
})
export class CreateGroupChatComponent extends CreateOrEdit2 implements OnInit {

  constructor(protected act_router: ActivatedRoute, protected methodsHttp: MethodsHttpService, protected router: Router) {
    // super(active_router, s_standard, router);
    super()
  }

  override form = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    img: new FormControl<File | null>(null),
  });

  users: Map<any, User> = new Map();

  participants: Map<any, User> = new Map();
  participantsAdmins: Map<any, User> = new Map();

  // usersSelect: Map<any, any> = new Map<any, any>();
  secondFormGroup: FormGroup;
  isEditable = false;
  page: number = 1;
  searchText: string = '';
  // img: { file: File, base64OrUrl: string } = { file: , base64OrUrl: 'assets/img/user_group.png' };
  // nameGroup: string = '';
  override isLoading: boolean = false;

  public urlSave: any = 'chats/groups';
  public override params: any = '?page=&search=';
  public title: string = 'Chat grupal -';

  base64OrUrl: any = 'assets/img/user_group.png';

  // get image(): any {
  //   return convertFileToUrl(this.form.get('img')!.value)
  // }

  set image(value: File | null) {
    if (value === null) {
      this.base64OrUrl = 'assets/img/user_group.png';
      this.form.get('img')!.setValue(null);
      return;
    }
 
    this.base64OrUrl = convertFileToUrl(value).then((res) => {
      this.base64OrUrl = res;
    });
    this.form.get('img')!.setValue(value);
  }

  override isFormParams: boolean = true;
  ngOnInit(): void {
    this.init();
  }

  override setData(data: any): void {
    if (this.status != 'edit') {
      this.users = new Map<any, User>(data.data.map((item) => [item.id, item]));
    } else {
      // const chatInfo = data.chat as Ichats;
      const {name, admins, img } = data.chat
      //  chatInfo.name;
      this.form.get('name')!.setValue(name);
      this.base64OrUrl = img!;
      const participants = data.participants;
      this.users = new Map<any, User>(data.users.data.map((item) => [item.id, item]));
      this.participants = new Map<any, any>(participants.map((item) => [item.id, item]));
      // { ...item, isAdmin: chatInfo.admins.includes(item._id) }
      this.participantsAdmins = new Map<any, any>(participants.map((item) => [item.id, { ...item, isAdmin: admins.includes(item.id) }]));
    }
  }

  searchUser(): void {
    this.isLoading = true;
    this.params = '?page=&search=' + this.searchText;
    this.methodsHttp.methodGet(`${this.urlSave}/create${this.params}`).subscribe(
      {
        next: res => {
          this.users = new Map<any, User>(res.data.data.map((item) => [item.id, item]));
          this.isLoading = false;
        }, error: () => { this.isLoading = false; }
      });
  }

  addParticipant(id): void {
    if (this.users.has(id)) {
      return;
    }
    this.participants.set(id, this.users.get(id)!);
  }

  removeParticipant(id): void {
    this.participants.delete(id);
  }

  addParticipantAdmin(id): void {
    if (this.users.has(id)) {
      return;
    }
    this.participantsAdmins.set(id, this.users.get(id)!);
  }

  removeParticipantAdmin(id): void {
    this.participantsAdmins.delete(id);
  }


  // getPhoto(url): string {
  //   return SharedService.rediredImageNull(url, 'assets/img/user.png');
  // }

  uploadPhoto(event): void {
    this.image = event.target.files[0];
    // this.img.base64OrUrl = SharedService.getBase64(event, this.callbackImg.bind(this));
  }

  removeImg(): void {
    this.image = null;
  }

  // callbackImg(e): void {
  //   this.image.base64OrUrl = e.srcElement.result;
  // }

  override getDataForSendServer(): boolean | FormData {
    if (this.form.invalid && this.participants.size < 3) {
      SwalService.swalFire({ icon: 'error', text: 'Faltan campos por llenar \n 1. Debe tener un mínimo de dos usuarios para ser un chat grupal\n 2. Debe tener un nombre de grupo', position: 'center' });
      return false;
    }

    const formData: FormData = new FormData();
    const { name, img } = this.form.value;
    formData.append('name', name!);
    this.participants?.forEach((item) => {
      formData.append('participants[]', item.id.toString());
    });
    this.participantsAdmins?.forEach((item) => {
      formData.append('admins[]', item.toString());
    });

    if (img) {
      formData.append('img', img);
    }
    // formData.append('name', this.nameGroup);

    // this.usersSelect.forEach((item) => {
    //   formData.append('participants[]', item.id);
    //   if (item.isAdmin) {
    //     formData.append('admins[]', item.id);
    //   }
    // });

    // if (this.image.base64OrUrl && this.image.file) {
    //   formData.append('img', this.image.file);
    // }
    return formData;

  }

  override go(): void {
    this.router.navigate(['/home/inicio']);
  }
}
