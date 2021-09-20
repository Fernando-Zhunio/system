import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { CreateOrEditAppointmentComponent } from './create-or-edit-appointment/create-or-edit-appointment.component';
import { RrhhAppointmentRoutingModule, RrhhAppointmentMainComponents } from './appointments-routing.module';
import { HeaderSearchModule } from '../../../Modulos/header-search/header-search.module';
import { MatChipsModule } from '@angular/material/chips';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { ModalZoomComponent } from './tools/modal-zoom/modal-zoom.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import {ClipboardModule} from '@angular/cdk/clipboard';

// import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
// import { Ngx } from '@angular-material-components';



@NgModule({
  declarations: [RrhhAppointmentMainComponents, IndexComponent, CreateOrEditAppointmentComponent, ModalZoomComponent],
  imports: [
    CommonModule,
    RrhhAppointmentRoutingModule,
    HeaderSearchModule,
    MatChipsModule,
    NgxSkeletonLoaderModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatDialogModule,
    NgxDocViewerModule,
    ClipboardModule
    // NgxMatDatetimePickerModule,
    // NgxMatTimepickerModule,
    // NgxMatMomentModule
  ],
  entryComponents: [ModalZoomComponent]
})
export class AppointmentsModule { }
