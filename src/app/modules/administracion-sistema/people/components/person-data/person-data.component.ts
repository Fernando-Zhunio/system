import { OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Person } from '../../../../../shared/interfaces/person';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { ResponseApi } from '../../../../../shared/interfaces/response-api';
import { ContactInfo } from '../../interface-and-types/contact-info';

@Component({
  selector: 'app-person-data',
  templateUrl: './person-data.component.html',
  styleUrls: ['./person-data.component.scss']
})
export class PersonDataComponent implements OnInit {
  protected title: string;
  protected path: string;

  constructor(
    protected methodHttp: MethodsHttpService,
    protected dialogRef: MatDialogRef<any, { response: ResponseApi<any>; sendData: any; }>,
    @Inject(MAT_DIALOG_DATA) protected createOrEditData: { id: number },
  ) {
    this.path = `admin/people/${this.createOrEditData.id}}/contact-info`;
  }
  ngOnInit(): void {
    this.getInfo();
  }
  person: Person;
  types: { [key: string]: string } = {};
  contactInfos: ContactInfo[] = [];
  status: 'create' | 'edit' = 'create';
  contact: ContactInfo | null = null;
  isLoading = false;

  form = new FormGroup({
    type: new FormControl('', Validators.required),
    value: new FormControl('', Validators.required),
  });

  getInfo(): void {
    this.methodHttp.methodGet(this.path).subscribe((response: ResponseApi<{
      info: ContactInfo[],
      person: Person,
      types: { [key: string]: string }
    }>) => {
      this.person = response.data.person;
      this.types = response.data.types;
      this.contactInfos = response.data.info;
    });
  }

  saveInServer(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    if (this.status === 'create') {
      this.methodHttp.methodPost(this.path, this.form.value).subscribe(
        {
          next: (response: ResponseApi<ContactInfo>) => {
            this.isLoading = false;
            this.contactInfos.push(response.data);
            this.form.reset();
          },
          error: () => { this.isLoading = false; }
        })
    } else {
      this.methodHttp.methodPut(`${this.path}/${this.contact!.id}`, this.form.value).subscribe(
        {
          next: (response: ResponseApi<ContactInfo>) => {
            this.isLoading = false;
            const index = this.contactInfos.findIndex((contact: ContactInfo) => contact.id === this.contact!.id);
            this.contactInfos[index] = response.data;
            this.form.reset();
          }, error: () => { this.isLoading = false; }
        });
    }

  }

  changeStatus(id: number | null = null): void {
    this.status = id ? 'edit' : 'create';
    this.contact = id ? this.contactInfos.find((contact: ContactInfo) => contact.id === id)! : null;
    if (this.contact) {
      this.form.patchValue({
        type: this.contact.type,
        value: this.contact.value,
      });
    } else {
      this.form.reset();
    }
  }

  deleteItem(id: number): void {
    this.isLoading = true;
    this.methodHttp.methodDelete(`${this.path}/${id}`).subscribe(() => {
      this.isLoading = false;
      const index = this.contactInfos.findIndex((contact: ContactInfo) => contact.id === id);
      this.contactInfos.splice(index, 1);
    });
  }


}
