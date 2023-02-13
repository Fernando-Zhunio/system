import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwalService } from '../../../../services/swal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrEdit2 } from '../../../../class/create-or-edit-2';
import { MethodsHttpService } from '../../../../services/methods-http.service';
import { convertFileToUrl } from '../../../../shared/class/tools';
import { UserChatGroup } from '../../types/user-chat-group';
import { debounceTime, switchMap, Observable } from 'rxjs';
// import { User } from '../../../../shared/interfaces/user';

@Component({
  selector: 'app-create-group-chat',
  templateUrl: './create-group-chat.component.html',
  styleUrls: ['./create-group-chat.component.scss'],
})
export class CreateGroupChatComponent extends CreateOrEdit2 implements OnInit {

  constructor(protected act_router: ActivatedRoute, protected methodsHttp: MethodsHttpService, protected router: Router) {
    super()
  }

  override form = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    img: new FormControl<File | null>(null),
  });

  imageUndefined = 	'https://ui-avatars.com/api/?background=random&name=NN'
  users: Map<any, UserChatGroup> = new Map();
  formSearch = new FormControl<string>('');

  participants: Map<any, UserChatGroup> = new Map();
  participantsAdmins: Map<any, UserChatGroup> = new Map();

  searchText: string = '';

  public urlSave: any = 'chats/groups';
  public override params: any = '?page=&search=';
  public title: string = 'Chat grupal -';

  base64OrUrl: any = 'assets/img/user_group.png';


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
    this.subscriptionSearchParticipant();
  }

  subscriptionSearchParticipant(): void {
    this.formSearch.valueChanges
    .pipe(
      debounceTime(500),
      switchMap(value => this.searchParticipants(value || ''))
    )
    .subscribe(
      {
        next: res => {
          this.users = new Map<any, UserChatGroup>(res.data.data.map((item) => [item.id, item]));
          this.isLoading = false;
        }, error: () => { this.isLoading = false; }
      }
    );
  }

  override setData(data: any): void {
    if (this.status != 'edit') {
      this.users = new Map<any, UserChatGroup>(data.data.map((item) => [item.id, item]));
      console.log(this.users);
    } else {
      const {name, admins, img } = data.chat
      this.form.get('name')!.setValue(name);
      this.base64OrUrl = img!;
      const participants = data.participants;
      this.users = new Map<any, UserChatGroup>(data.users.data.map((item) => [item.id, item]));
      this.participants = new Map<any, any>(participants.map((item) => [item.id, item]));
      this.participantsAdmins = new Map<any, any>(participants.map((item) => [item.id, { ...item, isAdmin: admins.includes(item.id) }]));
    }
  }

  searchParticipants(text: string): Observable<any> {
    this.isLoading = true;
    this.params = '?page=&search=' + text;
    return this.methodsHttp.methodGet(`${this.urlSave}/create${this.params}`)
  }

  addParticipant(id): void {
    if (this.participants.has(id)) {
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

  uploadPhoto(event): void {
    this.image = event.target.files[0];
  }

  removeImg(): void {
    this.image = null;
  }

  override getDataForSendServer(): boolean | FormData {
    if (this.form.invalid || this.participants.size < 2) {
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
    return formData;
  }

  override go(): void {
    this.router.navigate(['/home/inicio']);
  }
}