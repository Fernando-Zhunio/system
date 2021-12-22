import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
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
  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;
  @ViewChild('workInput') inputWork: ElementRef;

  searchJob: string = '';
  works: Iwork[] = [];
  idWork: number = null;
  url: string = 'rrhh/requests';
  isOpenCv: boolean = false;
  form: FormGroup = new FormGroup({
    isWishlist: new FormControl(false),
    work_id: new FormControl(null),
  });
  workText: string = null;
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

    });
    this.cv = this.products.find((x) => x.id === id).user?.resume?.attachment?.real_permalink;
  }

  getWorks(): void {
    const url = `rrhh/works`;
    const searchText = this.inputWork.nativeElement.value;
    this.s_standard.index(`${url}?search=${searchText}`).subscribe(res => {
      if (res.hasOwnProperty('success') && res.success) {
        this.works = res.data.data;
      }
    }
    );
  }

  addWorkFilter(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;
    const input = event.option.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.workText = value.trim();
    }

    // Reset the input value
    // if (input) {
    //   input.value = '';
    // }
    this.form.get('work_id').setValue(input);
  }

  getDataPaginate(event: Irequest[]): void {
    this.products = event;
  }

  removeWorkFilter(): void {
    this.workText = null;
    this.form.get('work_id').setValue(null);
  }

  // clearFilterJob(): void {
  //   this.filters.job.name = '';
  //   this.filters.job.value = null;
  //   this.idWork = null;
  //   this.searchJob = '';
  //   this.headerComponent.filter_data = {work_id: this.filters?.job.value, isWishlist: this.filters?.isWishlist};
  //   this.headerComponent.searchBar();
  // }

  // clearFilterWishlist(): void {
  //   this.filters.isWishlist = false;
  //   this.isWishlist = false;
  //   this.headerComponent.filter_data = {work_id: this.filters?.job.value, isWishlist: this.filters?.isWishlist};
  //   this.headerComponent.searchBar();
  // }

  getRequestOfWork(id: number): void {
    // this.filters.job.name = this.searchJob;
    // this.idWork = id;
    this.form.get('work_id').setValue(id);
  }

  // applyFilter(): void {
  //   this.filters = { job: {name: this.filters.job.name, value: this.idWork}, isWishlist: this.isWishlist };
  //   this.headerComponent.filter_data = {work_id: this.filters?.job.value, isWishlist: this.filters?.isWishlist};
  //   this.headerComponent.searchBar();
  // }

  doFavorite(id: number, isFavorite): void {
    const url = `rrhh/requests/${id}/mark-favorite`;
    this.s_standard.updatePut(url, {mark: !isFavorite}).subscribe(res => {
      if (res.hasOwnProperty('success') && res.success) {
        this.products.find(x => x.id === id).favorite = !isFavorite;
      }
    });
  }
}
