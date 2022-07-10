import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { animation_conditional } from '../../../../animations/animate_leave_enter';
import { Crud } from '../../../../class/crud';
import { CTemplateSearch } from '../../../../class/ctemplate-search';
import { HeaderSearchComponent } from '../../../../components/header-search/header-search.component';
import { Irequest, Iwork } from '../../../../interfaces/JobNovicompu/interfaces-jobNovicompu';
import { IPaginate, IResponse } from '../../../../services/methods-http.service';
import { SharedService } from '../../../../services/shared/shared.service';
import { StandartSearchService } from '../../../../services/standart-search.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: animation_conditional
})
export class IndexComponent extends Crud<Irequest> implements OnInit {


  constructor(protected standardService: StandartSearchService,
    protected snackBar: MatSnackBar,
    private router: Router,
    private s_shared: SharedService) {
    super();
  }
  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;
  @ViewChild('workInput') inputWork: ElementRef;

  dataSource: Irequest[] = [];
  columnsToDisplay = ['favorite', 'photo', 'names', 'work', 'age', 'professions', 'created_at', 'actions'];
  @ViewChild(MatTable) table: MatTable<Irequest>;

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
  currentUserDetail: Irequest = null;

  detailPaginator = {
    current_page: 1,
    per_page: 10,
    total: 0
  }
  ngOnInit(): void {
  }

  changeSort(event: any): void {
    // console.log(event);
    // this.filters.orderBy = event.direction;
    // this.filters.orderByColumn = event.active;
    // this.headerComponent.searchBar();
  }

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
    // let html: string = years + " yr ";
    return years + " años";
  }

  getWorks(): void {
    const url = `rrhh/works`;
    const searchText = this.inputWork.nativeElement.value;
    this.standardService.methodGet(`${url}?search=${searchText}`).subscribe(res => {
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
    // this.products = event;
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
