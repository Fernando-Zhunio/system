import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import AirDatepicker from 'air-datepicker';
import { CreateOrEdit2 } from '../../../../../class/create-or-edit-2';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { Campaign } from '../../interfaces/campaign';
import localeEs from 'air-datepicker/locale/es';
import * as moment from 'moment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-or-edit-campaign',
  templateUrl: './create-or-edit-campaign.component.html',
  styleUrls: ['./create-or-edit-campaign.component.scss']
})
export class CreateOrEditCampaignComponent extends CreateOrEdit2<Campaign> implements OnInit {
  public title: string = 'Campaña ';
  public urlSave: string = 'catalogs/campaigns';
  airDate1: AirDatepicker | null = null;
  airDate2: AirDatepicker | null = null;


  override form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    duration_type: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    start_date: new FormControl('', [this.validatorRequiredIf(()=> this.form.get('duration_type')?.value == 'date_range', Validators.required)]),
    end_date: new FormControl('', [this.validatorRequiredIf(()=> this.form.get('duration_type')?.value == 'date_range', Validators.required)]),
  });
 
  constructor(
    protected act_router: ActivatedRoute,
    protected methodsHttp: MethodsHttpService,
    protected router: Router,
    protected override location: Location
  ) { 
    super();
  }

  ngOnInit() {
    this.init(false)
  }
  @ViewChild('dateMin', { static: false }) dpMinDateElement: ElementRef;
  @ViewChild('dateMax', { static: false }) dpMaxDateElement: ElementRef;
  dpMax: any;
  dpMin: any;
  ngAfterViewInit() {
    this.dpMin = new AirDatepicker(this.dpMinDateElement.nativeElement, {
      classes: 'z-indez-1020',
      position: 'top right',
      locale: localeEs,
      timepicker: true,
      dateFormat: 'yyyy/MM/dd',
      timeFormat: 'HH:mm',
      autoClose: true,
      onSelect: ({ date }) => {
        this.dpMax.update({
          minDate: date
        })
        this.form.get('start_date')?.setValue(moment(date as any, 'YYYY/MM/DD HH:mm').format('YYYY-MM-DD HH:mm'))
      }
    })
    this.dpMax = new AirDatepicker(this.dpMaxDateElement.nativeElement, {
      classes: 'z-indez-1020',
      locale: localeEs,
      position: 'top right',
      timepicker: true,
      autoClose: true,
      dateFormat: 'yyyy/MM/dd',
      timeFormat: 'HH:mm',
      onSelect: ({ date }) => {
        this.dpMin.update({
          maxDate: date
        })
        this.form.get('end_date')?.setValue(moment(date as any, 'YYYY/MM/DD HH:mm').format('YYYY-MM-DD HH:mm'));
      }
    })
  }

   /**
   * @private
   * @method myFormValidator
   * @description      Custom validation rule for Reactive Forms functionality - used where 
   *                   conditional validation rule has been triggered 
   * @param {*} predicate
   * @param {*} validator
   * @returns {*}
   * @memberof HomePage
   */
    private validatorRequiredIf(predicate: Function, validator: any): any {
      return ((formControl: FormControl) => {
        if (!formControl.parent) {
          return null;
        }
        if (predicate()) {
          return validator(formControl);
        }
        return null;
      });
    }

    override getDataForSendServer(): any {
      console.log(this.form.value);
      if(this.form.valid) {
        return this.form.value;
      } else {
        this.form.markAllAsTouched();
        return null;
      }
    }

    override go(): void {
      this.router.navigate(['/catalogo/campaigns']);
    }
}

