import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchTemplateComponent } from '../../../../../components/search-template/search-template.component';
import { Iuser, Iwork } from '../../../../../interfaces/JobNovicompu/interfaces-jobNovicompu';
import { StandartSearchService } from '../../../../../services/standart-search.service';

@Component({
  selector: 'app-modal-send-cv',
  templateUrl: './modal-send-cv.component.html',
  styleUrls: ['./modal-send-cv.component.css']
})
export class ModalSendCvComponent implements OnInit {

  constructor(private s_standart: StandartSearchService) { }
  @ViewChild(SearchTemplateComponent) appFoo: SearchTemplateComponent<Iuser>;

  url: string = 'rrhh/users';
  placeholder = 'Buscador usuario';
  data: Iuser[] = [];
  selectUsers: Iuser[] = [];
  form: FormGroup = new FormGroup({
    // email: new FormControl('', [Validators.required, Validators.email]),
    full_work: new FormControl(false, [Validators.required]),
    emails: new FormArray([]),
  });
  search_works: string = '';
  works: Iwork[] = [];
  isloadUser: boolean = false;
  isload: boolean = false;

  ngOnInit(): void {
  }

  get emailsForm(): FormArray {
    return this.form.controls['emails'] as FormArray;
  }

  getDataPaginate(event): void {
    this.data = event;
    console.log(this.data);
  }

  addUser(user_id: number): void {
    const index = this.selectUsers.findIndex(x => x.id === user_id);
    if (index !== -1) {
      return;
    }
    const user = this.data.find(x => x.id === user_id);
    if (user) {
      user['selected'] = true;
      this.selectUsers.push(user);
    }
  }

  removeUser(user_id: number): void {
    const index = this.data.findIndex(x => x.id === user_id);
    this.data[index]['selected'] = false;
    this.selectUsers.splice(index, 1);
  }

  searchWorks(event): void {
    const search = event.target.value;
    console.log(search);
    const url = `rrhh/works`;
    this.isloadUser = true;
    this.s_standart.index(url, search).subscribe( res =>{
      console.log(res);
      this.isloadUser = false;
      this.works = res.data.data;
    }, err => {
      console.log(err);
      this.isloadUser = false;
    });
  }

  captureUserFinalist(work_id: number): void {
    this.s_standart.index(`rrhh/work/${work_id}/requests`).subscribe( res => {
      console.log(res);
      this.selectUsers = res.data.map(x => {
        return x.user;
      });
    });
  }

  saveInServer(): void {
    this.isload = true;
    const url = `rrhh/cv/users/emails`;
    console.log(this.getDataForSend());
    const dataSend = this.getDataForSend();
    if (dataSend) {
      this.s_standart.store(url, dataSend).subscribe( res => {
        console.log(res);
      });
    }
  }

  getDataForSend(): boolean | any {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }
    const data = this.form.value;
    const data1 = this.selectUsers.map(x => {
      return x.id;
    });
    if (data1.length === 0) {
      return false;
    }

    return {...data, users: data1};
  }

  addEmail(data = null): void {
    const skill = new FormControl(data, [Validators.required, Validators.email]);
    this.emailsForm.push(skill);
  }
  removeFormEmail(index): void {
    this.emailsForm.removeAt(index);
  }


}
