import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
import AirDatepicker from 'air-datepicker';
// import { CreateOrEdit2 } from '../../../../../../class/create-or-edit-2';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
// import { Campaign } from '../../interfaces/campaign';
import localeEs from 'air-datepicker/locale/es';
import * as moment from 'moment';
// import { Location } from '@angular/common';
import { CreateOrEditDialog } from '../../../../../../shared/class/create-or-edit-dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateOrEditDialogData } from '../../../../../../shared/interfaces/create-or-edit-dialog-data';
import { ResponseApi } from '../../../../../../shared/interfaces/response-api';

@Component({
  selector: 'app-create-or-edit-campaign',
  templateUrl: './create-or-edit-campaign.component.html',
  styleUrls: ['./create-or-edit-campaign.component.scss']
})
export class CreateOrEditCampaignComponent extends CreateOrEditDialog implements OnInit, AfterViewInit {
  protected path = 'catalogs/campaigns';
  // protected methodHttp: MethodsHttpService;
  public title = 'Campaña';
  // public url: string = 'catalogs/campaigns';
  airDate1: AirDatepicker | null = null;
  airDate2: AirDatepicker | null = null;

  override form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    duration_type: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    start_date: new FormControl({value:'', disabled: true}, [this.validatorRequiredIf(()=> this.form.get('duration_type')?.value == 'date_range', Validators.required)]),
    end_date: new FormControl({value:'', disabled: true}, [this.validatorRequiredIf(()=> this.form.get('duration_type')?.value == 'date_range', Validators.required)]),
  });

  @ViewChild('dateMin', { static: false }) dpMinDateElement: ElementRef;
  @ViewChild('dateMax', { static: false }) dpMaxDateElement: ElementRef;
  dpMax: any;
  dpMin: any;
  
  constructor(
    protected dialogRef: MatDialogRef<CreateOrEditCampaignComponent, { response: ResponseApi<any>; sendData: any; }>,
    protected methodHttp: MethodsHttpService,
    @Inject(MAT_DIALOG_DATA) protected createOrEditData: CreateOrEditDialogData,
  ) { 
    super();
  }


  ngOnInit() {
    this.init(false);
  }

  ngAfterViewInit() {
    this.dpMin = new AirDatepicker(this.dpMinDateElement.nativeElement, {
      position: 'top right',
      locale: localeEs,
      timepicker: true,
      dateFormat: 'yyyy-MM-dd',
      timeFormat: 'HH:mm:00',
      autoClose: true,
      onSelect: ({ date }) => {
        this.dpMax.update({
          minDate: date
        })
        this.form.get('start_date')?.setValue(moment(date as any, 'YYYY/MM/DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'))
      }
    })
    this.dpMax = new AirDatepicker(this.dpMaxDateElement.nativeElement, {
      locale: localeEs,
      position: 'top right',
      timepicker: true,
      autoClose: true,
      dateFormat: 'yyyy-MM-dd',
      timeFormat: 'HH:mm:00',
      onSelect: ({ date }) => {
        this.dpMin.update({
          maxDate: date
        })
        this.form.get('end_date')?.setValue(moment(date as any, 'YYYY/MM/DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'));
      }
    })
  }

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

    override setData(data?: any): void {
      this.form.patchValue({
        title: data?.title,
        description: data?.description,
        duration_type: data?.duration_type,
        status: data?.status,
        start_date: data?.start_date ? moment(data?.start_date as any, 'YYYY/MM/DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss') : null,
        end_date:  data?.end_date ? moment(data?.end_date as any, 'YYYY/MM/DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss') : null,
      });
    this.selectionChange({value:data?.duration_type})
    }

    // override getDataForSendServer(): any {
    //   if(this.form.valid) {
    //     return this.form.value;
    //   } else {
    //     this.form.markAllAsTouched();
    //     return null;
    //   }
    // }

    // override go(): void {
    //   this.router.navigate(['/catalogo/campaigns']);
    // }

    selectionChange(event) {
      if (event.value == 'date_range') {
        this.form.get('start_date')?.enable();
        this.form.get('end_date')?.enable();
      } else {
        this.form.get('start_date')?.disable();
        this.form.get('end_date')?.disable();
      }
    }
}

