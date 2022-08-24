import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import AirDatepicker, { AirDatepickerOptions } from 'air-datepicker';
import localeEs from 'air-datepicker/locale/es';
import * as moment from 'moment';
import { loadPreference } from '../../../../../redux/actions/preference.action';
import { SharedService } from '../../../../../services/shared/shared.service';
import { SwalService } from './../../../../../services/swal.service';

@Component({
  selector: 'app-select-dates-dashboard',
  templateUrl: './select-dates-dashboard.component.html',
  styleUrls: ['./select-dates-dashboard.component.css']
})
export class SelectDatesDashboardComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SelectDatesDashboardComponent>, private store: Store) { }
  airDate1: AirDatepicker | null = null;
  daysDate1: number = 0;
  isIntroRange: boolean = false;
  airDate2: AirDatepicker | null = null;
  daysDate2: number = 0;
  isActive: boolean = false;

  options1: AirDatepickerOptions | any = {
    classes: 'border-0 shadow rounded-fz',
    locale: localeEs,
    dateFormat: 'yyyy MMMM dd',
    range: true,
    maxDate: new Date(),
    multipleDatesSeparator: ' A ',
    onSelect: ({ datepicker, }) => {
      const dates = datepicker.selectedDates;
      if (dates.length == 2) {
        const days = Math.abs(moment(dates[0]).diff(moment(dates[1]), 'days'));
        this.daysDate1 = days;
        const old_date = new Date(moment(dates[0]).subtract(days + 1, 'days').format());
        const _date = new Date(moment(dates[0]).subtract(1, 'days').format());
        this.airDate2?.selectDate([old_date, _date]);
        this.airDate2?.update({
          maxDate: _date,
        });
        this.daysDate2 = days;
      }
    },
  };


  options2: AirDatepickerOptions | any = {
    classes: 'border-0 shadow rounded-fz',
    locale: localeEs,
    dateFormat: 'yyyy MMMM dd',
    range: true,
    multipleDatesSeparator: ' A ',
    onSelect: ({ datepicker }) => {
      const dates = datepicker.selectedDates;
      if (dates.length == 2) {
        this.daysDate2 = Math.abs(moment(dates[0]).diff(moment(dates[1]), 'days'));
      }
    },
  };

  ngOnInit(): void {
    this.airDate1 = new AirDatepicker('#date-dashboard-1', this.options1 as any);
    this.airDate2 = new AirDatepicker('#date-dashboard-2', this.options2 as any);
  }

  saveDates() {
    if (this.daysDate1 != this.daysDate2) {
      SwalService.swalFire({ title: 'Error de días', text: 'El numero de días de las fechas no coinciden', icon: 'warning' });
      return;
    }
    if (this.airDate1?.selectedDates.length == 2 && this.airDate2?.selectedDates.length == 2) {
      const datesAll = {
        dates: {
          to: SharedService.convertDateForLaravelOfDataPicker(this.airDate1.selectedDates[1]),
          from: SharedService.convertDateForLaravelOfDataPicker(this.airDate1.selectedDates[0])
        }, dates_compare: {
          to: SharedService.convertDateForLaravelOfDataPicker(this.airDate2.selectedDates[1]),
          from: SharedService.convertDateForLaravelOfDataPicker(this.airDate2.selectedDates[0])
        }
      };
      this.store.dispatch(loadPreference({ preferenceDateDashboard: datesAll }));
      this.dialogRef.close();
      this.dialogRef.close(datesAll);
    } else {
      SwalService.swalFire({ title: 'Error de selección de fechas', text: 'Seleccione fechas validas', icon: 'warning' });
    }
  }

}
