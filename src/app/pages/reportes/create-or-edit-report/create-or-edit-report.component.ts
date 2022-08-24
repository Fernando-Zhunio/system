import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import AirDatepicker from 'air-datepicker';
import * as moment from 'moment';
import { CreateOrEdit2 } from '../../../class/create-or-edit-2';
import { MethodsHttpService } from '../../../services/methods-http.service';
import localeEs from 'air-datepicker/locale/es';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-or-edit-report',
  templateUrl: './create-or-edit-report.component.html',
  styleUrls: ['./create-or-edit-report.component.scss']
})
export class CreateOrEditReportComponent extends CreateOrEdit2<any> implements OnInit, AfterViewInit {
  public title = 'Reportes - ';
  public urlSave = 'system-orders/reports';
  @ViewChild('filterOrderMin', { static: false }) dpMinDateElement: ElementRef;
  @ViewChild('filterOrderMax', { static: false }) dpMaxDateElement: ElementRef;
  override form = new FormGroup({
    name: new FormControl(null, Validators.required),
    format: new FormControl(null, Validators.required),
    start_date: new FormControl(null, Validators.required),
    end_date: new FormControl(null, Validators.required),
  });
  dpMin: any = null;
  dpMax: any = null;

  formats = [];
  reports = [];

  constructor(public act_router: ActivatedRoute,
    public methodsHttp: MethodsHttpService,
    public router: Router, public override location: Location) { super() }

  ngOnInit(): void {
    this.init(true);
  }

  ngAfterViewInit() {
    this.dpMin = new AirDatepicker(this.dpMinDateElement.nativeElement, {
      classes: 'z-indez-1020',
      position: 'bottom right',
      locale: localeEs,
      timepicker: true,
      dateFormat: 'yyyy/MM/dd',
      timeFormat: 'HH:mm',
      autoClose: true,
      onSelect: ({ date }) => {
        this.dpMax.update({
          minDate: date
        })
        this.form.get('start_date')?.setValue(moment(date as any, 'YYYY/MM/DD HH:mm').format('YYYY-MM-DD HH:mm'));
      }
    })
    this.dpMax = new AirDatepicker(this.dpMaxDateElement.nativeElement, {
      classes: 'z-indez-1020',
      locale: localeEs,
      position: 'bottom right',
      timepicker: true,
      autoClose: true,
      dateFormat: 'yyyy/MM/dd',
      timeFormat: 'HH:mm',
      onSelect: ({ date }) => {
        if (this.dpMin){
          this.dpMin.update({
            maxDate: date
          })
        }
        this.form.get('end_date')?.setValue(moment(date as any, 'YYYY/MM/DD HH:mm').format('YYYY-MM-DD HH:mm'));
      }
    })
  }

  override setData(data): void {
    this.formats = data.formats;
    this.reports = data.reports;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.saveInServer()
    } else {
      this.form.markAllAsTouched()
    }
    console.log(this.form);
  }

  override go(_data = null) {
    this.goBack();
   }

}
