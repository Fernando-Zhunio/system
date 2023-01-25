import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { CreateOrEdit } from '../../../../../class/create-or-edit';
import { CreateOrEdit2 } from '../../../../../class/create-or-edit-2';
import { IChatbot } from '../../../../../interfaces/ichatbot';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { SharedService } from '../../../../../services/shared/shared.service';
// import { StandartSearchService } from '../../../../../services/standart-search.service';
import { SwalService } from '../../../../../services/swal.service';

@Component({
  selector: 'app-chat-bots-create-or-edit',
  templateUrl: './chat-bots-create-or-edit.component.html',
  styleUrls: ['./chat-bots-create-or-edit.component.css']
})
export class ChatBotsCreateOrEditComponent extends CreateOrEdit2<IChatbot> implements OnInit {
  // protected act_router: ActivatedRoute;
  // protected methodsHttp: MethodsHttpService;
  public urlSave: string = 'admin/chatbot';

  constructor(protected act_router: ActivatedRoute, protected methodsHttp: MethodsHttpService, protected router: Router) {
    super();
  }

  public title: string = 'Chatbot';
  override isFormParams: boolean = true;
  override key_param: string = 'chatbot_id';
  override form: FormGroup = new FormGroup(
    {
      name: new FormControl(null, Validators.required),
    }
  );
  img: {file: File | null, base64: string | null} = {file: null, base64: 'assets/img/img_not_available.png'};

  ngOnInit(): void {
    this.init();
  }

  getBase64(event): void {
    this.img.file =  event.target.files[0];
    this.img.base64 = SharedService.getBase64(event, this.callbackImg.bind(this));
  }

  callbackImg(e): void {
    this.img.base64 = e.srcElement.result;
  }

  removeImg(): void {
    this.img = {file: null, base64: 'assets/img/img_not_available.png'};
  }

  override getDataForSendServer() {
    let formData: FormData = new FormData();
    if (this.form.valid) {
      if (this.img.base64 && this.img.file) {
        formData.append('photo', this.img.file);
      }
      formData.append('name', this.form.get('name')?.value);
      formData.append('_method', 'PUT');
      return formData;
    }
      SwalService.swalToast('Faltan datos por llenar', 'error');
      return false;
  }

  override go(): void {
    this.router.navigate(['administracion-sistema/chatbot']);
  }

  override setData(data: any): void {
      if (this.status === 'edit') {
        this.form.get('name')?.setValue(data.info.name);
        this.img.base64 = data.info.photo || 'assets/img/img_not_available.png';
      }
  }

  override saveInServer() {
    const data_send = this.getDataForSendServer();
    if (data_send) {
        this.isLoading = true;
        let url = this.urlSave;
        let observable: Observable<any>;
        if (this.status === 'edit') {
            url += `/${this.getId()}`;
            observable = this.methodsHttp.methodPost(url, data_send);
        } else {
            observable = this.methodsHttp.methodPost(url, data_send);
        }
        observable.subscribe(() => {
            this.isLoading = false;
            this.go();
        }, error => {
            console.error(error);
            this.isLoading = false;
        });
        return;
    }
}




}
