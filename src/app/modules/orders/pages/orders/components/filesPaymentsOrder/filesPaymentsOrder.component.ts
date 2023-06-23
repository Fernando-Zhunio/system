import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { NgxFileDropEntry } from 'ngx-file-drop';
import { environment } from '../../../../../../../environments/environment';
import { PermissionOrdersPayments } from '../../../../../../class/permissions-modules';
import { IDocumentPaymentOrder } from '../../../../../../interfaces/iorder';
import { ViewDocComponent } from '../../../../../../Modulos/tools/view-doc/view-doc.component';
// import { SharedService } from '../../../../../../services/shared/shared.service';
import { StandartSearchService } from '../../../../../../services/standart-search.service';
import { SwalService } from '../../../../../../services/swal.service';
import { getBase64 } from '../../../../../../shared/helper/helper';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-filesPaymentsOrder',
  templateUrl: './filesPaymentsOrder.component.html',
  styleUrls: ['./filesPaymentsOrder.component.scss']
})
export class FilesPaymentsOrderComponent implements OnInit {
  title: any = 'Archivos de pago';
  isOpenCreate = true;
  isLoading = false;
  urlServer = environment.server;
  files: IDocumentPaymentOrder[] = [];
  form = new FormGroup({
    file: new FormControl<File | null>(null, [Validators.required]),
    code: new FormControl(null),
    description: new FormControl(null),
  });
  re = /(?:\.([^.]+))?$/;
  base64: string | null = null;
  isImageFile = false;
  set formControlFile(value: File | null) {
    this.form.get('file')?.setValue(value);
    if (value) {
      console.log(value.type)
      this.isImageFile = value.type.includes('image');
      getBase64(value).then((base64: string) => {
        this.base64 = base64;
      });
      return
    }
    this.isImageFile = false;
    this.base64 = value
  }

  permissionPayments = PermissionOrdersPayments;
  @ViewChild(ViewDocComponent) viewDoc: ViewDocComponent;
  constructor(public dialogRef: MatDialogRef<FilesPaymentsOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public dataExternal: { order_id: number, payment_id?: number }, public standard: StandartSearchService) { }
  ngOnInit() {
    this.getFiles();
  }

  getFiles(): void {
    this.isLoading = true;
    this.standard.methodGet(`system-orders/orders/${this.dataExternal.order_id}/payments/${this.dataExternal.payment_id}/documents`).subscribe(
      (response: any) => {
        if (response.success) {
          this.files = response.data;
        }
        this.isLoading = false;
      },
      (error: any) => {
        console.error(error);
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


  onFileSelected(event ) {
    this.formControlFile = event.target.files[0]
    // this.fileSend.file = ;
    // this.fileSend.base64 = SharedService.getBase64(event, this.callbackImg.bind(this));
  }

  // callbackImg(e): void {
  //   this.fileSend.base64 = e.srcElement.result;
  // }

  saveFileInServer(): void {
    if (this.form.valid) {
      this.isLoading = true;
      const form: FormData = new FormData();
      form.append('file', this.form.value.file as File);
      if (this.form.value.code) {
        form.append('code', this.form.value.code);
      }
      this.standard.methodPost(`system-orders/orders/${this.dataExternal.order_id}/payments/${this.dataExternal.payment_id}/documents`, form).subscribe(
        (response: any) => {
          if (response.success) {
            this.getFiles();
            this.isOpenCreate = false;
          }
          this.isLoading = false;
        },
        (error: any) => {
          console.error(error);
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
          this.standard.methodDelete(`system-orders/orders/${this.dataExternal.order_id}/payments/${this.dataExternal.payment_id}/documents/${file_id}`).subscribe(
            (response: any) => {
              if (response?.success) {
                this.getFiles();
              }
              this.isLoading = false;
            },
            (error: any) => {
              console.error(error);
              this.isLoading = false;
            }
          );
        }
      }
    );
  }

  // public files1: NgxFileDropEntry[] = [];

  // public dropped(files: NgxFileDropEntry[]) {
  //   const droppedFile = files[0];
  //   // for (const droppedFile of files) {

  //     // Is it a file?
  //     if (droppedFile.fileEntry.isFile) {
  //       const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
  //       fileEntry.file((file: File) => {
  //         this.onFileSelected({target:{files:[file]}},);
  //         // Here you can access the real file

  //         /**
  //         // You could upload it like this:
  //         const formData = new FormData()
  //         formData.append('logo', file, relativePath)

  //         // Headers
  //         const headers = new HttpHeaders({
  //           'security-token': 'mytoken'
  //         })

  //         this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
  //         .subscribe(data => {
  //           // Sanitized logo returned from backend
  //         })
  //         **/

  //       });
  //     } 
  //     // else {
  //     //   // It was a directory (empty directories are added, otherwise only files)
  //     //   const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
  //     // }
  //   // }
  // }
  // urlVisor: string | null = null;
  // isOpenVisor = false;
  // openVisor(url): void {
  //   this.urlVisor  = url;
  //   this.isOpenVisor = true
  // }

  isDraggingFile = false;
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragEnter(event: DragEvent) {
    event.preventDefault();
    this.isDraggingFile = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDraggingFile = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDraggingFile = false;
    console.log(event)
    if (event.dataTransfer?.files.length === 0) 
    this.formControlFile = event.dataTransfer?.files[0];

    // const _files = event.dataTransfer?.files;
    // Aquí puedes procesar los archivos soltados
  }
}
