import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
// import { Observable } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { SimpleInputDialogData, SimpleInputDialogStruct } from './simple-input-dialog-data';
// import { MethodsHttpService } from '../../../services/methods-http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'simple-input-dialog',
  templateUrl: './simple-input-dialog.component.html',
  styleUrls: ['./simple-input-dialog.component.scss']
})
export class SimpleInputDialogComponent {

  constructor(private dialogRef: MatDialogRef<SimpleInputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: SimpleInputDialogData,
    private httpClient: HttpClient) {
    this.setData()
  }
  title = ''
  info: SimpleInputDialogStruct[] = []
  url: string
  method: 'post' | 'put' = 'post';
  isLoading = false;

  form = new FormGroup({})

  setData(): void {
    this.title = this.dialogData.title
    const structs = this.dialogData.structs
    structs.forEach(value => {
      this.form.addControl(value.name, value.formControl)
    })
    this.info = structs 
    this.url = this.dialogData.url
    this.method = this.dialogData?.method || 'post';
    console.log(this.form.value)
    if (this.dialogData?.isGetData) {
      this.getData()
    }
  }

  getData(): void {
    this.isLoading = true
    this.httpClient.get(environment.server+this.url).subscribe({
      next: (response) => {
        this.setDataForm(response);
        this.isLoading = false
      }, error: () => {
        this.isLoading = false
      }
    })
  }

  setDataForm(response: any) {
    if (this.dialogData.callbackFillForm) {
      this.dialogData.callbackFillForm.bind(this)(response, this.form)
      return
    }
    const info = response.data;
    this.form.patchValue(info)
  }

  saveInServer(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }
    this.dialogRef.disableClose = true
    this.isLoading = true

    this.httpClient[this.method](environment.server+this.url, this.form.value).subscribe({
      next: (response) => {
        this.dialogRef.close({ response, sendData: this.form.value })
      }, error: () => {
        this.dialogRef.disableClose = false;
        this.isLoading = false;
      }
    })
  }

}
