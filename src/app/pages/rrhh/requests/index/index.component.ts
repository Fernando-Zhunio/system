import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CTemplateSearch } from '../../../../class/ctemplate-search';
import { HeaderSearchComponent } from '../../../../components/header-search/header-search.component';
import { Irequest, Iwork } from '../../../../interfaces/JobNovicompu/interfaces-jobNovicompu';
import { SharedService } from '../../../../services/shared/shared.service';
import { StandartSearchService } from '../../../../services/standart-search.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent extends CTemplateSearch<Irequest> implements OnInit {

  constructor(private router: Router, private s_shared: SharedService, private s_standard: StandartSearchService) {
    super();
  }
  @ViewChild('headerComponent') headerComponent: HeaderSearchComponent;

  searchJob: string = '';
  works: Iwork[] = [];
  url: string = 'rrhh/requests';
  isOpenCv: boolean = false;
  filtersJob: { name: string, value: string | number } = null;
  cv: string = '';
  statuses: any[] = ['request_postulate', 'request_cv_viewed', 'request_in_process', 'request_finalist'];
  ngOnInit(): void {
  }

  goAppointmentCreate(id: number): void {
    const request = this.products.find(x => x.id === id);
    this.s_shared.requestWork = request;
    this.router.navigate([`recursos-humanos/appointments/request/${id}/create`]);
  }

  openCv(id: number) {
    this.isOpenCv = true;
    const url = `rrhh/requests/${id}/statuses`;
    this.s_standard.store(url, { status: 'request_cv_viewed' }).subscribe(res => {
      if (res.hasOwnProperty('success') && res.success) {

      }
    });
    this.cv = this.products.find((x) => x.id === id).user?.resume?.attachment?.real_permalink;
  }

  getWorks(): void {
    const url = `rrhh/works`;
    this.s_standard.index(`${url}?search=${this.searchJob}`).subscribe(res => {
      console.log(res);
      if (res.hasOwnProperty('success') && res.success) {
        this.works = res.data.data;
      }
    }
    );
  }

  clearFilterJob(): void {
    this.filtersJob = null;
    this.searchJob = '';
    this.headerComponent.filter_data = null;
    this.headerComponent.searchBar();
  }

  getRequestOfWork(id: number): void {
    this.filtersJob = { name: this.searchJob, value: id };
    this.s_standard.index(`${this.url}?work_id=${id}`).subscribe(res => {
      console.log(res);
      if (res.hasOwnProperty('success') && res.success) {
        this.products = res.data.data;
      }
    });
  }

}
