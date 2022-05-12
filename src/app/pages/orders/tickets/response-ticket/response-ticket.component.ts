import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ITicketOrder } from '../../../../interfaces/iorder';
import { MethodsHttpService } from '../../../../services/methods-http.service';
import { SharedService } from '../../../../services/shared/shared.service';

@Component({
  templateUrl: './response-ticket.component.html',
  styleUrls: ['./response-ticket.component.scss']
})
export class ResponseTicketComponent implements OnInit {

  constructor(private methodsHttp: MethodsHttpService, private router: Router, private activatedRouter: ActivatedRoute) {}
  form = new FormGroup({
    message: new FormControl(null, [Validators.required]),
    file: new FormControl(null),
  });
  url: any = null;
  isLoading = false;
  ticket: ITicketOrder = null;
  ticket_id: string = null;

  ngOnInit(): void {
    this.ticket_id = SharedService.getParametersUrl('id', this.activatedRouter);
    this.methodsHttp.methodGet(`system-orders/tickets/${this.ticket_id}`).subscribe
    (res => {
      this.ticket = res.data;
    });
  }


  onFileChange(event) {
    SharedService.getBase64(event, (e) => {
      this.url = e.srcElement.result;
    });
  }

  removeImage() {
    this.url = null;
    this.form.get('file').setValue(null);
  }

  saveInServer(): void {
    if (this.form.valid) {
      this.isLoading = true;
      const formData = new FormData();
      formData.append('message', this.form.value.message);
      if (this.form.get('file').value) {
        formData.append('file', this.form.get('file').value);
      }
      this.methodsHttp.methodPost(`system-orders/tickets/${this.ticket_id}/messages`, formData).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.router.navigate(['/system-orders/tickets']);
      }, err => {this.isLoading = false; }
      );
    } else {
      console.log('Formulario invalido');
      this.form.markAllAsTouched();
    }
  }

}
