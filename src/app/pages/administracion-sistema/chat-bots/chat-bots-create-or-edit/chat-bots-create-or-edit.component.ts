import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CreateOrEdit } from '../../../../class/create-or-edit';
import { IChatbot } from '../../../../interfaces/ichatbot';
import { SharedService } from '../../../../services/shared/shared.service';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { SwalService } from './../../../../services/swal.service';

@Component({
  selector: 'app-chat-bots-create-or-edit',
  templateUrl: './chat-bots-create-or-edit.component.html',
  styleUrls: ['./chat-bots-create-or-edit.component.css']
})
export class ChatBotsCreateOrEditComponent extends CreateOrEdit<IChatbot> implements OnInit {
  public urlSave: any;

  constructor(activated_route: ActivatedRoute, standardService: StandartSearchService, snackBar: MatSnackBar, router: Router) {
    super(activated_route, standardService, router);
    this.urlSave = 'admin/chatbot';
  }

  public title: string = 'Chatbot';
  isFormParams: boolean = true;
  key_param: string = 'chatbot_id';
  // isFormParams: boolean = true;
  form: FormGroup = new FormGroup(
    {
      name: new FormControl(null, Validators.required),
    }
  );
  img: {file: File, base64: string} = {file: null, base64: 'assets/img/img_not_available.png'};

  ngOnInit(): void {
    this.init();
  }

  getBase64(event): void {
    this.img.file =  event.target.files[0];
    this.img.base64 = SharedService.getBase64(event, this.callbackImg.bind(this));
  }

  callbackImg(e): void {
    // console.log(e);
    this.img.base64 = e.srcElement.result;
  }

  removeImg(): void {
    this.img = {file: null, base64: 'assets/img/img_not_available.png'};
  }

  getDataForSendServer() {
    let formData: FormData = new FormData();
    if (this.form.valid) {
      if (this.img.base64 && this.img.file) {
        formData.append('photo', this.img.file);
      }
      formData.append('name', this.form.get('name').value);
      formData.append('_method', 'PUT');
      return formData;
    }
      SwalService.swalToast('Faltan datos por llenar', 'error');
      return false;
  }

  go(): void {
    this.router.navigate(['administracion-sistema/chatbot']);
  }

  setData(data: any): void {
    console.log({data});
      if (this.status === 'edit') {
        this.form.get('name').setValue(data.info.name);
        this.img.base64 = data.info.photo || 'assets/img/img_not_available.png';
      }
  }

  saveInServer() {
    const data_send = this.getDataForSendServer();
    if (data_send) {
        this.isLoading = true;
        let url = this.urlSave;
        let observable: Observable<any>;
        if (this.status === 'edit') {
            url += `/${this.getId()}`;
            observable = this.standard_service.methodPost(url, data_send);
        } else {
            observable = this.standard_service.methodPost(url, data_send);
        }
        observable.subscribe(data => {
            this.isLoading = false;
            this.go();
        }, error => {
            console.log(error);
            this.isLoading = false;
        });
        return;
    }
}




}
