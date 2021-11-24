import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import AirDatepicker, { AirDatepickerOptions } from 'air-datepicker';
import localeEs from 'air-datepicker/locale/es';
import * as moment from 'moment';

@Component({
  selector: 'app-select-dates-dashboard',
  templateUrl: './select-dates-dashboard.component.html',
  styleUrls: ['./select-dates-dashboard.component.css']
})
export class SelectDatesDashboardComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SelectDatesDashboardComponent>) { }
  airDate1: AirDatepicker = null;
  daysDate1: number = 0;
  isIntroRange: boolean = false;
  airDate2: AirDatepicker = null;
  daysDate2: number = 0;
  isActive: boolean = false;
  options1: AirDatepickerOptions | any = {
    locale: localeEs,
    dateFormat: 'yyyy MMMM dd',
    range: true,
    multipleDatesSeparator: ' A ',
    onSelect: ({ datepicker,  }) => {
      const dates = datepicker.selectedDates;
      
      if (dates.length == 2) {
        const days = Math.abs(moment(dates[0]).diff(moment(dates[1]), 'days'));
        this.daysDate1 = days;
        const old_date = new Date(moment(dates[0]).subtract(days + 1, 'days').format());
        const _date = new Date(moment(dates[0]).subtract(1, 'days').format());
        console.log({ old_date, days, dates });
        this.airDate2.selectDate([old_date, _date]);
        this.airDate2.update({
          maxDate: _date,
        });
        this.daysDate2 = days;
        // this.airDate2.update({
        //   onRenderCell: ({ date }) => {
        //     const is = moment(date).isBetween(new Date(moment(dates[0]).subtract(days + 1, 'days').format()), new Date(moment(dates[1]).add(1, 'days').format()));
        //       if (is) {
        //         return {
        //           disabled: true,
        //           classes: 'disabled-day didabef'
        //         };
        //       }}
        // });
    }},
  };


  options2: AirDatepickerOptions | any = {
    locale: localeEs,
    dateFormat: 'yyyy MMMM dd',
    range: true,

    multipleDatesSeparator: ' A ',
    onSelect: ({ datepicker }) => {
      const dates = datepicker.selectedDates;
      if (dates.length == 2) {
        this.daysDate2 = Math.abs(moment(dates[0]).diff(moment(dates[1]), 'days'));
        // console.log({ days, dates });
        // this.daysDate2 = days;
        // if (moment([dates]).isBetween(dates[0], dates[1])) {
        // }
      }
    },
  };

  ngOnInit(): void {
    this.airDate1 = new AirDatepicker('#date-dashboard-1', this.options1 as any);
    this.airDate2 = new AirDatepicker('#date-dashboard-2', this.options2 as any);
  }

  saveDates() {
    const datesAll = {first_date: this.airDate1.selectedDates, last_date: this.airDate2.selectedDates};
    // if (this.isActive) {
    //   datesAll.last_date = this.airDate2.selectedDates;
    // }
    localStorage.setItem('dates_all', JSON.stringify(datesAll));
    this.dialogRef.close(datesAll);
  }

}
