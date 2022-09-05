import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import * as moment from 'moment';
import { animationShowHidden } from '../../../../animations/animate_leave_enter';
import { Crud } from '../../../../class/crud';
import { HeaderSearchComponent } from '../../../../components/header-search/header-search.component';
import { Irequest, Iwork } from '../../../../interfaces/JobNovicompu/interfaces-jobNovicompu';
import { IPaginate, IResponse, MethodsHttpService } from '../../../../services/methods-http.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: animationShowHidden
})
export class IndexComponent extends Crud<Irequest> implements OnInit {


  constructor(protected methodsHttp: MethodsHttpService,
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
  idWork: number | null = null;
  url: string = 'rrhh/requests';
  isOpenCv: boolean = false;
  _workSelected: Iwork| null = null;
  set workSelected(work: Iwork | null) {
    this._workSelected = work;
    this.filters.work_id = work?.id || null;
  }

  cv: string = '';
  statuses: any[] = ['request_postulate', 'request_cv_viewed', 'request_in_process', 'request_finalist'];
  currentUserDetail: Irequest | null = null;

  detailPaginator = {
    current_page: 1,
    per_page: 10,
    total: 0
  }

  filters: {isWishlist: boolean, work_id: number | null} = {
    isWishlist : false,
    work_id: null,
  }
  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columnsToDisplay, event.previousIndex, event.currentIndex);
  }

  // goAppointmentCreate(id: number): void {
  //   // const request = this.products.find(x => x.id === id);
  //   // this.s_shared.requestWork = request;
  //   // this.router.navigate([`recursos-humanos/appointments/request/${id}/create`]);
  // }

  openCv(id: number) {
    this.isOpenCv = true;
    const url = `rrhh/requests/${id}/statuses`;
    this.methodsHttp.methodPost(url, { status: 'request_cv_viewed' }).subscribe(() => {

    });
    const cv = this.dataSource.find((x: any) => x.id === id)?.user?.resume?.attachment?.real_permalink;
    if (cv) {
      this.cv = cv;
    }
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
    const work: any = this.works.find(x => x.id === id);
    this.workSelected = work;
    this.animateShowHidden = 'hidden';
  }



  removeWorkFilter(): void {
    this.workSelected = null;
  }

  doFavorite(id: number, isFavorite: boolean): void {
    const url = `rrhh/requests/${id}/mark-favorite`;
    this.methodsHttp.methodPut(url, { mark: !isFavorite }).subscribe(res => {
      if (res.hasOwnProperty('success') && res.success) {
        let favorite = this.dataSource.find(x => x.id === id);
        if (favorite?.favorite) {
          favorite.favorite = !isFavorite;
        }
        this.table.renderRows();
      }
    });
  }

  override getData($event: IResponse<IPaginate<any>>): void {
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
    const data = this.dataSource.find(x => x.id === id);
    if (data) {
      this.currentUserDetail = data;
    }

  }

  convertArrayToStringProfession(array: any[]): string {
    const professions = array.map(x => x.name);
    return professions.join(', ');
  }

  changePaginator(event: PageEvent | null = null): void {
    this.headerComponent.searchBar(event);
  }
}
