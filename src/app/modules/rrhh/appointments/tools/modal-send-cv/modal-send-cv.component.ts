import { Component, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchTemplateComponent } from '../../../../../components/search-template/search-template.component';
import { Iuser, Iwork } from '../../../../../interfaces/JobNovicompu/interfaces-jobNovicompu';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { SwalService } from '../../../../../services/swal.service';

@Component({
  selector: 'app-modal-send-cv',
  templateUrl: './modal-send-cv.component.html',
  styleUrls: ['./modal-send-cv.component.css']
})
export class ModalSendCvComponent {

  constructor(private methodsHttp: MethodsHttpService) { }
  @ViewChild(SearchTemplateComponent) appFoo: SearchTemplateComponent;

  url: string = 'rrhh/users';
  placeholder = 'Buscador usuario';
  dataMap: Map<number, Iuser> = new Map<number, Iuser>();
  dataSelectMap: Map<number, Iuser> = new Map<number, Iuser>();
  form: FormGroup = new FormGroup({
    full_work: new FormControl(false, [Validators.required]),
    emails: new FormArray([]),
  });
  search_works: string = '';
  works: Iwork[] = [];
  isloadUser: boolean = false;
  isload: boolean = false;


  get emailsForm(): FormArray {
    return this.form.controls['emails'] as FormArray;
  }

  getDataPaginate(event: Iuser[]): void {
    this.dataMap = new Map<number, Iuser>(event.map(x => [x.id, x]));
  }

  addUserSelect(key: number): void {
    const value = Object.assign({}, this.dataMap.get(key));
    this.dataSelectMap.set(key, value);

  }

  removeUser(key: number): void {
    this.dataSelectMap.delete(key);
  }

  searchWorks(event): void {
    const search = event.target.value;
    const url = `rrhh/works`;
    this.isloadUser = true;
    this.methodsHttp.methodGet(url, search)
      .subscribe(
        {
          next: (res: any) => {
            this.isloadUser = false;
            this.works = res.data.data;
          },
          error: (err) => {
            console.error(err);
            this.isloadUser = false;
          }
        }
      );
  }

  captureUserFinalist(work_id: number): void {
    this.methodsHttp.methodGet(`rrhh/work/${work_id}/requests`).subscribe(res => {
      // this.dataSelectMap = res.data.map(x => {
      //   return x.user;
      // });
      this.dataSelectMap = new Map<number, Iuser>(res.data.map(x => [x.user.id, x.user]));
    });
  }

  saveInServer(): void {
    this.isload = true;
    const url = `rrhh/cv/users/emails`;
    const dataSend = this.getDataForSend();
    if (dataSend) {
      this.methodsHttp.methodPost(url, dataSend).subscribe(() => {
        SwalService.swalFire({ title: 'Enviado', text: 'Se ha enviado el correo', icon: 'success' });
      });
    }
  }

  getDataForSend(): boolean | any {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }
    const data = this.form.value;
    const data1: any[] = [];
    this.dataSelectMap.forEach((_value, key: any) => {
      data1.push(key);
    });
    if (data1.length === 0) {
      return false;
    }

    return { ...data, users: data1 };
  }

  addEmail(data = null): void {
    const skill = new FormControl(data, [Validators.required, Validators.email]);
    this.emailsForm.push(skill);
  }
  removeFormEmail(index): void {
    this.emailsForm.removeAt(index);
  }


}
