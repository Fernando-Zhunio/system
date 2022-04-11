import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '../../../../../../../environments/environment';
// import { CreateOrEditModal } from '../../../../../../class/create-or-edit-modal';
import { IAttachmentPaymentOrder } from '../../../../../../interfaces/iorder';
import { ViewDocComponent } from '../../../../../../Modulos/tools/view-doc/view-doc.component';
import { SharedService } from '../../../../../../services/shared/shared.service';
import { StandartSearchService } from '../../../../../../services/standart-search.service';
import { SwalService } from '../../../../../../services/swal.service';

@Component({
  selector: 'app-filesPaymentsOrder',
  templateUrl: './filesPaymentsOrder.component.html',
  styleUrls: ['./filesPaymentsOrder.component.scss']
})
export class FilesPaymentsOrderComponent implements OnInit {
  title: any = 'Archivos de pago';
  isOpenCreate = false;
  isLoading = false;
  urlServer = environment.server;
  files: IAttachmentPaymentOrder[] = [];
  formControlDescription = new FormControl();
  re = /(?:\.([^.]+))?$/;

  fileSend: { base64: string, file: File } = { file: null, base64: null };
  @ViewChild(ViewDocComponent) viewDoc: ViewDocComponent;
  constructor(public dialogRef: MatDialogRef<FilesPaymentsOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public dataExternal: { order_id: number, payment_id?: number }, public standard: StandartSearchService) { }

  ngOnInit() {
    this.getFiles();
  }

  getFiles(): void {
    this.isLoading = true;
    this.standard.methodGet(`system-orders/orders/${this.dataExternal.order_id}/payments/${this.dataExternal.payment_id}/attachments`).subscribe(
      (response: any) => {
        if (response.success) {
          this.files = response.data;
        }
        this.isLoading = false;
      },
      (error: any) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  openDoc(): void {
    this.viewDoc.openFile();
  }

  openCreate(): void {
    this.isOpenCreate = true;
  }


  onFileSelected(event) {
    this.fileSend.file = event.target.files[0];
    this.fileSend.base64 = SharedService.getBase64(event, this.callbackImg.bind(this));
  }

  callbackImg(e): void {
    this.fileSend.base64 = e.srcElement.result;
  }

  saveFileInServer(): void {
    if (this.fileSend.file) {
      this.isLoading = true;
      const form: FormData = new FormData();
      form.append('file', this.fileSend.file);
      if (this.formControlDescription.value) {
        form.append('description', this.formControlDescription.value);
      }
      this.standard.methodPost(`system-orders/orders/${this.dataExternal.order_id}/payments/${this.dataExternal.payment_id}/attachments`, form).subscribe(
        (response: any) => {
          if (response.success) {
            this.getFiles();
            this.isOpenCreate = false;
          }
          this.isLoading = false;
        },
        (error: any) => {
          console.log(error);
          this.isLoading = false;
        }
      );
    } else {
      SwalService.swalFire({ title: 'Error', text: 'Debe seleccionar un archivo', icon: 'error' });
    }
  }

  removeFile(file_id: number){
    SwalService.swalFire({title: 'Eliminar archivo', text: '¿Está seguro de eliminar el archivo?', icon: 'warning', confirmButtonText: 'SI, eliminar', cancelButtonText: 'NO, cancelar', showCancelButton: true }).then(
      (result) => {
        if (result.isConfirmed) {
          this.isLoading = true;
          this.standard.methodDelete(`system-orders/orders/${this.dataExternal.order_id}/payments/${this.dataExternal.payment_id}/attachments/${file_id}`).subscribe(
            (response: any) => {
              if (response?.success) {
                this.getFiles();
              }
              this.isLoading = false;
            },
            (error: any) => {
              console.log(error);
              this.isLoading = false;
            }
          );
        }
      }
    );
  }




}
