import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { SwalService } from '../../../../../services/swal.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CreateOrEdit2 } from '../../../../../class/create-or-edit-2';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { convertFileToUrl } from '../../../../class/tools';
import { UserChatGroup } from '../../../../../modules/chats/types/user-chat-group';
import { debounceTime, switchMap, Observable } from 'rxjs';
import { CreateOrEditDialog } from '../../../../class/create-or-edit-dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateOrEditDialogData } from '../../../../interfaces/create-or-edit-dialog-data';
import { StatusCreateOrEdit } from '../../../../enums/status-create-or-edit';
// import { ResponseApi } from '../../../../interfaces/response-api';
// import { User } from '../../../../shared/interfaces/user';

@Component({
  selector: 'app-create-or-edit-chat-group',
  templateUrl: './create-or-edit-chat-group.component.html',
  styleUrls: ['./create-or-edit-chat-group.component.scss'],
})
export class CreateOrEditChatGroupComponent extends CreateOrEditDialog implements OnInit {
  protected path = 'chats/groups';
  // protected methodHttp: MethodsHttpService;
  // protected dialogRef: MatDialogRef<any, { response: ResponseApi<any>; sendData: any; }>;
  // protected createOrEditData: CreateOrEditDialogData;

  constructor(
    public dialogRef: MatDialogRef<CreateOrEditChatGroupComponent>, 
    @Inject(MAT_DIALOG_DATA) protected createOrEditData: CreateOrEditDialogData,
    protected methodHttp: MethodsHttpService) {
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
  // participantsAdmins: Map<any, UserChatGroup> = new Map();

  searchText: string = '';

  public urlSave: any = 'chats/groups';
  // public override params: any = '?page=&search=';
  public title: string = 'Chat Grupal';

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

  // override isFormParams: boolean = true;
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
          const  data = res.data.data
          this.users = new Map<any, UserChatGroup>(data.map((item) => [item.id, item]));
          this.isLoading = false;
        }, error: () => { this.isLoading = false; }
      }
    );
  }

  override setData(data: any): void {
    if (this.status === StatusCreateOrEdit.Create) {
      this.users = new Map<any, UserChatGroup>(data.data.map((item) => [item.id, item]));
    } else {
      const {name, img } = data.chat
      this.form.get('name')!.setValue(name);
      this.base64OrUrl = img!;
      const participants = data.participants;
      this.users = new Map<any, UserChatGroup>(data.users.data.map((item) => [item.id, item]));
      this.participants = new Map<any, any>(participants.map((item) => [item.id, item]));
      // this.participantsAdmins = new Map<any, any>(participants.map((item) => [item.id, { ...item, isAdmin: admins.includes(item.id) }]));
    }
  }

  searchParticipants(text: string): Observable<any> {
    this.isLoading = true;
    return this.methodHttp.methodGet(`${this.urlSave}/create`, {search: text})
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

  makeAdmin(id): void {
    this.participants.get(id)!['isAdmin'] = true;
  }

  removeAdmin(id): void {
    this.participants.get(id)!['isAdmin'] = false;
  }

  uploadPhoto(event): void {
    this.image = event.target.files[0];
  }

  removeImg(): void {
    this.image = null;
  }

  override isFormValid(): boolean {
    return this.form.valid && this.participants.size >= 2;
  }

  override getData(): boolean | FormData {
    const formData: FormData = new FormData();
    const { name, img } = this.form.value;
    formData.append('name', name!);
    this.participants?.forEach((item) => {
      formData.append('participants[]', item.id.toString());
    });
    console.log(Array.from(this.participants.values()))
    Array.from(this.participants.values()).filter(x => x.isAdmin).forEach((item) => {
      formData.append('admins[]', item.id.toString());
    });

    if (img) {
      formData.append('img', img);
    }
    return formData;
  }
}