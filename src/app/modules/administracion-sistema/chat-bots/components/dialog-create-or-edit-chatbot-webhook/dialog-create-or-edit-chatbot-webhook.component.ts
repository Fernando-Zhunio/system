// import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { CreateOrEdit } from '../../../../../class/create-or-edit';
import { IChatWebhook } from '../../../../../interfaces/ichatbot';
// import { StandartSearchService } from '../../../../../services/standart-search.service';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-or-edit-chatbot-webhook',
  templateUrl: './dialog-create-or-edit-chatbot-webhook.component.html',
  styleUrls: ['./dialog-create-or-edit-chatbot-webhook.component.css']
})
export class DialogCreateOrEditChatbotWebhookComponent implements OnInit {
  // public urlSave: any;

  constructor(
    protected route: ActivatedRoute, 
    protected methodsHttpService: MethodsHttpService, 
    protected router: Router,
    @Inject(MAT_DIALOG_DATA) public data: IChatWebhook,
    private dialogRef: MatDialogRef<DialogCreateOrEditChatbotWebhookComponent>
    ) {
    // this.urlSave = `admin/chatbot/${this.getId('chatbot_id')}/webhooks`;
  }

  form: FormGroup = new FormGroup({
    endpoint: new FormControl(null, Validators.required)
  });
  title: string = 'Webhook - ';
  isLoading = false;
  // public override key_param: string = 'webhook_id';
  ngOnInit(): void {
    this.title += this.data ? 'Editando' : 'Creando';
    // this.init();
    if (this.data) {
      this.form.patchValue({
        endpoint: this.data.endpoint
      });
    }
  }

  //  setData(data?: any): void {
  //   if (data) {
  //     this.form.patchValue({
  //       endpoint: data.endpoint
  //     });
  //   }
  // }

  getDataForSendServer() {
    if (this.form.valid) {
      return {url: this.form.get('endpoint')?.value};
    }
    return false;
  }

   close(data?: any): void {
    this.dialogRef.close(data);
  }

  saveInServer() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
    }
    const observable = this.data ? this.methodsHttpService.methodPut(`admin/chatbot/${this.data._id}/webhooks`, this.form.value) : this.methodsHttpService.methodPost(`admin/chatbot/webhooks`, this.form.value);
    observable.subscribe( {
      next: (data: any) => {
        this.close(data);
      },
      error: () => {
        
      }
    })
  }

}
