import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CTemplateSearch } from '../../../../class/ctemplate-search';
import { Irequest } from '../../../../interfaces/JobNovicompu/interfaces-jobNovicompu';
import { SharedService } from '../../../../services/shared/shared.service';
import { StandartSearchService } from '../../../../services/standart-search.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent  extends CTemplateSearch<Irequest> implements OnInit {

  constructor(private router: Router, private s_shared: SharedService, private s_standart :StandartSearchService ) {
    super();
  }

  url: string = 'rrhh/requests';
  isOpenCv: boolean = false;
  cv: string = '';
  statuses:any[] = ['request_postulate', 'request_cv_viewed', 'request_in_process','request_finalist']
  ngOnInit(): void {
  }

  goAppointmentCreate(id: number): void {
    const request = this.products.find(x => x.id === id);
    this.s_shared.requestWork = request;
    this.router.navigate([`recursos-humanos/appointments/request/${id}/create` ]);
  }

  openCv(id: number) {
    this.isOpenCv = true;
    const url = `rrhh/requests/${id}/statuses`
    this.s_standart.store(url,{status:'request_cv_viewed'}).subscribe(res=>{
      if(res.hasOwnProperty('success') && res.success){
        console.log(res);
      }
    })
    this.cv = this.products.find((x) => x.id === id).user?.resume?.attachment?.real_permalink;
  }




}
