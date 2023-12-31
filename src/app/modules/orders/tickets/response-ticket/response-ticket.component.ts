import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PermissionOrdersTickets } from '../../../../class/permissions-modules';
import { ITicketOrder } from '../../../../interfaces/iorder';
import { MethodsHttpService } from '../../../../services/methods-http.service';
import { SharedService } from '../../../../services/shared/shared.service';
import { Iswal } from '../../../../services/swal.service';
import { ChatTicketComponent } from '../components/chat-ticket/chat-ticket.component';

@Component({
  templateUrl: './response-ticket.component.html',
  styleUrls: ['./response-ticket.component.scss']
})
export class ResponseTicketComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private methodsHttp: MethodsHttpService, private router: Router, private activatedRouter: ActivatedRoute) {}
  @ViewChild(ChatTicketComponent) chatComponent: ChatTicketComponent;
  form = new FormGroup({
    message: new FormControl<string>('', [Validators.required]),
    file: new FormControl<any>(null),
  });
  fileUrl: {url: any, file: File | null} = {
    url: null,
    file: null,
  };
  isLoading = false;
  ticket: ITicketOrder | null = null;
  ticket_id: string | null = null;
  permissions = PermissionOrdersTickets;

  ngOnInit(): void {
    this.spinner.show();
    this.ticket_id = SharedService.getParametersUrl('id', this.activatedRouter);
    this.markAsRead();
    this.methodsHttp.methodGet(`system-orders/tickets/${this.ticket_id}`).subscribe
    (res => {
      this.ticket = res.data;
      this.spinner.hide();
    }, () => {
      this.spinner.hide();
    });
  }

  markAsRead(): void {
    this.methodsHttp.methodPut(`system-orders/tickets/${this.ticket_id}/messages/mark-as-read`)
    .subscribe((res: any) => {
      if (res.success) {
        console.log('marcado como leido');
      }
    });
  }

  closeTicket(): void {
    const swalOption:Iswal = {
      title: '¿Está seguro de cerrar el ticket?',
      text: 'Una vez cerrado no podrá responder al mismo',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Si,Cerrar ticket',
      cancelButtonText: 'No, Cancelar',
    };
    SharedService.swalResponse(swalOption, this.sendCloseTicket.bind(this));
  }

  sendCloseTicket(): void {
    this.methodsHttp.methodPut(`system-orders/tickets/${this.ticket_id}/close`).subscribe(() => {
      this.router.navigate(['/system-orders/tickets']);
    });
  }


  onFileChange(event) {
    SharedService.getBase64(event, (e) => {
      this.fileUrl.file = event.target.files[0];
      this.fileUrl.url = e.srcElement.result;
    });
  }

  removeImage() {
    this.fileUrl.url = null;
    this.fileUrl.file = null;
    this.form.get('file')?.setValue(null);
  }

  saveInServer(): void {
    if (this.form.valid) {
      this.isLoading = true;
      const formData = new FormData();
      formData.append('message', this.form.value.message!);
      if (this.fileUrl.file) {
        formData.append('file', this.fileUrl.file);
      }
      this.methodsHttp.methodPost(`system-orders/tickets/${this.ticket_id}/messages`, formData).subscribe(res => {
        this.isLoading = false;
        this.chatComponent.addMessage(res.data);
        if (this.ticket) {
          this.ticket.status = 'open';
        }
        this.form.reset();
      }, () => {this.isLoading = false; }
      );
    } else {
      this.form.markAllAsTouched();
    }
  }

}
