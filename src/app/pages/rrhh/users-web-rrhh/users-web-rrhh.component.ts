import { Component, OnInit } from '@angular/core';
import { CTemplateSearch } from '../../../class/ctemplate-search';
import { Iuser } from '../../../interfaces/JobNovicompu/interfaces-jobNovicompu';
import { StandartSearchService } from '../../../services/standart-search.service';
import { FormGroup, FormControl } from '@angular/forms';
import { animation_conditional } from '../../../animations/animate_leave_enter';

@Component({
  selector: 'app-users-web-rrhh',
  templateUrl: './users-web-rrhh.component.html',
  styleUrls: ['./users-web-rrhh.component.css'],
  animations: animation_conditional

})
export class UsersWebRrhhComponent extends CTemplateSearch<Iuser> implements OnInit {

  constructor( private s_standard: StandartSearchService) {
    super();
  }

  isOpenCv: boolean = false;
  cv: string = '';
  url: string = 'rrhh/users';
  // filter_data = {sex: 'all', birth_city: 'all', resident_city: 'all', identification_number: 'all'};
  form: FormGroup = new FormGroup({
    sex: new FormControl('all'),
    birth_city: new FormControl(''),
    resident_city: new FormControl(''),
    identification_number: new FormControl(''),
    profession: new FormControl('')
  });
  ngOnInit(): void {
  }

  getDataPaginate(event: Iuser[]): void {
    this.products = event;
  }

  openCv(id: number) {
    this.isOpenCv = true;
    this.cv = this.products.find((x) => x.id === id)?.resume?.attachment?.real_permalink;
  }




}
