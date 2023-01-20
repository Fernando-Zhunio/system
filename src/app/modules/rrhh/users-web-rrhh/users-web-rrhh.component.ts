import { Component, ViewChild } from '@angular/core';
import { CTemplateSearch } from '../../../class/ctemplate-search';
import { Iuser } from '../../../interfaces/JobNovicompu/interfaces-jobNovicompu';
import { FormGroup, FormControl } from '@angular/forms';
import { animation_conditional } from '../../../animations/animate_leave_enter';
import { HeaderSearchComponent } from '../../../components/header-search/header-search.component';

@Component({
  selector: 'app-users-web-rrhh',
  templateUrl: './users-web-rrhh.component.html',
  styleUrls: ['./users-web-rrhh.component.css'],
  animations: animation_conditional

})
export class UsersWebRrhhComponent extends CTemplateSearch<Iuser> {

  constructor() {
    super();
  }
  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;


  isOpenCv: boolean = false;
  cv: string = '';
  url: string = 'rrhh/users';
  form: FormGroup = new FormGroup({
    sex: new FormControl('all'),
    birth_city: new FormControl(''),
    resident_city: new FormControl(''),
    identification_number: new FormControl(''),
    profession: new FormControl('')
  });

  getDataPaginate(event: Iuser[]): void {
    this.products = event;
  }

  openCv(id: number) {
    this.isOpenCv = true;
    const cv = this.products.find((x) => x.id === id)?.resume?.attachment?.real_permalink;
    if (cv) {
      this.cv = cv;
    }
  }
}
