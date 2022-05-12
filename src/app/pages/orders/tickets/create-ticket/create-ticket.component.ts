import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MethodsHttpService } from '../../../../services/methods-http.service';
import { SharedService } from '../../../../services/shared/shared.service';

@Component({
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {

  constructor(private router: Router, private methodsHttp: MethodsHttpService, private activatedRoute: ActivatedRoute) { }
  departments: any = [];
  form = new FormGroup({
    order_id: new FormControl({value: null, disabled: true}, [Validators.required]),
    department_id: new FormControl(null, [Validators.required]),
    subject: new FormControl(null, [Validators.required]),
    message: new FormControl(null, [Validators.required]),
    file: new FormControl(null),
  });
  fileUrl = {
    url: null};
  isLoading = false;

  ngOnInit(): void {
    this.methodsHttp.methodGet('system-orders/tickets/create').subscribe(res => {
      this.departments = res.data.departments;
    });
    this.getOrderId();
  }

  getOrderId(): void {
    console.log(SharedService.getParametersUrl('order_id', this.activatedRoute));
    this.form.get('order_id').setValue(SharedService.getParametersUrl('order_id', this.activatedRoute));
  }

  onFileChange(event) {
    SharedService.getBase64(event, (e) => {
      // this.form.get('file').setValue(null) = event.target.files[0];
      this.fileUrl.url = e.srcElement.result;
    })
  }

  removeImage() {
    this.fileUrl.url = null;
    this.form.get('file').setValue(null);
  }

  saveInServer(): void {
    if (this.form.valid) {
      this.isLoading = true;
      const formData = new FormData();
      formData.append('order_id', this.form.getRawValue().order_id);
      formData.append('department_id', this.form.value.department_id);
      formData.append('subject', this.form.value.subject);
      formData.append('message', this.form.value.message);
      if (this.form.get('file').value) {
        formData.append('file', this.form.get('file').value);
      }
      this.methodsHttp.methodPost('system-orders/tickets', formData).subscribe(res => {
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
