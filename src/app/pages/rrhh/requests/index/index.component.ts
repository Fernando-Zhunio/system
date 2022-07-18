import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { animationShowHidden, animation_conditional } from '../../../../animations/animate_leave_enter';
import { Crud } from '../../../../class/crud';
// import { CTemplateSearch } from '../../../../class/ctemplate-search';
import { HeaderSearchComponent } from '../../../../components/header-search/header-search.component';
import { Irequest, Iwork } from '../../../../interfaces/JobNovicompu/interfaces-jobNovicompu';
import { IPaginate, IResponse } from '../../../../services/methods-http.service';
import { SharedService } from '../../../../services/shared/shared.service';
import { StandartSearchService } from '../../../../services/standart-search.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
// import { TestRequest } from '@angular/common/http/testing';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: animationShowHidden
})
export class IndexComponent extends Crud<Irequest> implements OnInit {


  constructor(protected standardService: StandartSearchService,
    protected snackBar: MatSnackBar) {
    super();
  }
  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;
  @ViewChild('workInput') inputWork: ElementRef;
  @ViewChild(MatTable) table: MatTable<Irequest>;

  isSearchWork = false;
  animateShowHidden = 'hidden';

  set _animateShowHidden(value: 'hidden' | 'show') {
    this.animateShowHidden = value;
    this.isSearchWork = value === 'show';
  }
  dataSource: Irequest[] = [];
  columnsToDisplay = ['favorite', 'photo', 'names', 'work', 'age', 'professions', 'created_at', 'actions'];
  urlJob = `rrhh/works`;
  searchJob: string = '';
  works: Iwork[] = [];
  idWork: number = null;
  url: string = 'rrhh/requests';
  isOpenCv: boolean = false;
  // form: FormGroup = new FormGroup({
  //   isWishlist: new FormControl(false),
  //   work_id: new FormControl(null),
  // });
  _workSelected: Iwork = null;
  set workSelected(work: Iwork) {
    this._workSelected = work;
    this.filters.work_id = work?.id || null;
  }

  cv: string = '';
  statuses: any[] = ['request_postulate', 'request_cv_viewed', 'request_in_process', 'request_finalist'];
  currentUserDetail: Irequest = null;

  detailPaginator = {
    current_page: 1,
    per_page: 10,
    total: 0
  }

  filters = {
    isWishlist : false,
    work_id: null,
  }
  ngOnInit(): void {
  }

  // changeSort(event: any): void {
  //   // console.log(event);
  //   // this.filters.orderBy = event.direction;
  //   // this.filters.orderByColumn = event.active;
  //   // this.headerComponent.searchBar();
  // }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columnsToDisplay, event.previousIndex, event.currentIndex);
  }

  goAppointmentCreate(id: number): void {
    // const request = this.products.find(x => x.id === id);
    // this.s_shared.requestWork = request;
    // this.router.navigate([`recursos-humanos/appointments/request/${id}/create`]);
  }

  openCv(id: number) {
    this.isOpenCv = true;
    const url = `rrhh/requests/${id}/statuses`;
    this.standardService.methodPost(url, { status: 'request_cv_viewed' }).subscribe(res => {

    });
    this.cv = this.dataSource.find((x) => x.id === id).user?.resume?.attachment?.real_permalink;
  }

  age(date): string {
    let today = moment();
    let birthdate = moment(date);
    let years = today.diff(birthdate, 'years');
    return years + " años";
  }

  getWorks($event): void {
    console.log($event);
    this.works = $event.data;
  }

  selectedWork(id): void {
    const work = this.works.find(x => x.id === id);
    this.workSelected = work;
    // this.isSearchWork = false;
    this.animateShowHidden = 'hidden';
  }

  // getDataPaginate(event: Irequest[]): void {
  // }

  removeWorkFilter(): void {
    this.workSelected = null;
  }

  doFavorite(id: number, isFavorite: boolean): void {
    const url = `rrhh/requests/${id}/mark-favorite`;
    this.standardService.methodPut(url, { mark: !isFavorite }).subscribe(res => {
      if (res.hasOwnProperty('success') && res.success) {
        this.dataSource.find(x => x.id === id).favorite = !isFavorite;
        this.table.renderRows();
      }
    });
  }

  getData($event: IResponse<IPaginate<any>>): void {
    console.log($event);
    this.dataSource = $event.data.data;
    if ($event.data.data.length > 0) {
      this.currentUserDetail = $event.data.data[0];
    }
    this.detailPaginator.current_page = $event.data.current_page;
    this.detailPaginator.per_page = $event.data.per_page;
    this.detailPaginator.total = $event.data.total;
  }

  expandDetail(id: number): void {
    this.currentUserDetail = this.dataSource.find(x => x.id === id);
  }

  convertArrayToStringProfession(array: any[]): string {
    const professions = array.map(x => x.name);
    return professions.join(', ');
  }

  changePaginator(event: PageEvent | null): void {
    this.headerComponent.searchBar(event);
  }
}
