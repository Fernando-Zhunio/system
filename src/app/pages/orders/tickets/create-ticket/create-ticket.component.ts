import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionOrdersTickets } from '../../../../class/permissions-modules';
import { IOrder } from '../../../../interfaces/iorder';
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
    order_id: new FormControl(null, [Validators.required]),
    department_id: new FormControl(null, [Validators.required]),
    subject: new FormControl(null, [Validators.required]),
    message: new FormControl(null, [Validators.required]),
    file: new FormControl(null),
  });
  fileUrl = {
    url: null};
  isLoading = false;
  urlOrders = 'system-orders/orders';
  orders: IOrder[] = [];
  isOpenSearchOrder = false;
  permissions = PermissionOrdersTickets;

  ngOnInit(): void {
    this.methodsHttp.methodGet('system-orders/tickets/create').subscribe(res => {
      this.departments = res.data.departments;
    });
    this.getOrderId();
  }

  getOrderId(): void {
    console.log(SharedService.getQueryParametersUrl('order_id', this.activatedRoute));
    const queryParamOrder_id = SharedService.getQueryParametersUrl('order_id', this.activatedRoute);
    if (queryParamOrder_id) {
      this.form.get('order_id')?.setValue(queryParamOrder_id);
    }
  }

  getDataOrder(data): void {
    console.log(data);
    this.orders = data.data;
  }

  getOrder(order): void {
    this.form.get('order_id')?.setValue(order);
    this.isOpenSearchOrder = false;
  }

  onFileChange(event) {
    SharedService.getBase64(event, (e) => {
      this.fileUrl.url = e.srcElement.result;
    })
  }

  removeImage() {
    this.fileUrl.url = null;
    this.form.get('file')?.setValue(null);
  }

  saveInServer(): void {
    if (this.form.valid) {
      this.isLoading = true;
      const formData = new FormData();
      formData.append('order_id', this.form.value.order_id);
      formData.append('department_id', this.form.value.department_id);
      formData.append('subject', this.form.value.subject);
      formData.append('message', this.form.value.message);
      if (this.form.get('file')?.value) {
        formData.append('file', this.form.get('file')?.value);
      }
      this.methodsHttp.methodPost('system-orders/tickets', formData).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.router.navigate(['/system-orders/tickets']);
      }, () => {this.isLoading = false; }
      );
    } else {
      console.log('Formulario invalido');
      this.form.markAllAsTouched();
    }
  }

}
