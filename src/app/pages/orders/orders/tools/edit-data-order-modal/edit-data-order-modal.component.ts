import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MethodsHttpService } from '../../../../../services/methods-http.service';

@Component({
  selector: 'app-edit-data-order-modal',
  templateUrl: './edit-data-order-modal.component.html',
  styleUrls: ['./edit-data-order-modal.component.scss']
})
export class EditDataOrderModalComponent implements OnInit {

  constructor(
    private methodsHttp: MethodsHttpService,
    @Inject(MAT_DIALOG_DATA) private dataExternal: {
      order_id: number,
      company_id: number,
      seller_code: string,
      channel_id: number,
      type: string
    }, private dialogRef: MatDialogRef<EditDataOrderModalComponent>) { }

  form: FormGroup = new FormGroup({
    type: new FormControl(null, [Validators.required]),
    channel_id: new FormControl(null, [Validators.required]),
    seller_code: new FormControl(null, [Validators.required]),
    company_id: new FormControl(null, [Validators.required])
  });
  types: any[] = [];
  channels: any[] = [];
  companies: any[] = [];
  isLoading: boolean = false;
  isLoadingFirstData: boolean = true;

  ngOnInit() {
    this.fillDataForm();
    this.getDataPerForm();
  }

  fillDataForm(): void {
    this.form.patchValue({
      type: this.dataExternal.type,
      channel_id: this.dataExternal.channel_id,
      seller_code: this.dataExternal.seller_code,
      company_id: this.dataExternal.company_id
    });
  }

  getDataPerForm(): void {

    const url = `system-orders/orders/create`;
    this.methodsHttp.methodGet(url).subscribe((res: any) => {
      if (res?.success) {
        this.types = res.data.types;
        this.channels = res.data.channels;
        this.companies = res.data.companies;
        this.isLoadingFirstData = false;
      }
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isLoading = true;
      const url = `system-orders/orders/${this.dataExternal.order_id}`;
      this.methodsHttp.methodPut(url, this.form.value).subscribe((res: any) => {
        this.isLoading = false;
        if (res?.success) {
          this.dialogRef.close({ success: true });
        }
      })
    }
  }

}
