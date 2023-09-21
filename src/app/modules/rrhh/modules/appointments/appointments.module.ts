import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexAppointmentsComponent } from './pages/index-appointments/index-appointments.component';
import { CreateOrEditAppointmentComponent } from '../../appointments/create-or-edit-appointment/create-or-edit-appointment.component';
import { RrhhAppointmentRoutingModule, RrhhAppointmentMainComponents } from './appointments-routing.module';
import { HeaderSearchModule } from '../../../../Modulos/header-search/header-search.module';
import { MatChipsModule } from '@angular/material/chips';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { ModalZoomComponent } from '../../appointments/tools/modal-zoom/modal-zoom.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { MatMenuModule } from '@angular/material/menu';
import { ModalSendCvComponent } from '../../appointments/tools/modal-send-cv/modal-send-cv.component';
import { MatCardModule } from '@angular/material/card';
import { SearchTemplateModule } from '../../../../Modulos/search-template/search-template.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxSearchBarPaginatorComponent } from '../../../../shared/standalone-components/ngx-search-bar-paginator/ngx-search-bar-paginator.component';

// import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
// import { Ngx } from '@angular-material-components';



@NgModule({
    declarations: [RrhhAppointmentMainComponents, IndexAppointmentsComponent, CreateOrEditAppointmentComponent, ModalZoomComponent, ModalSendCvComponent],
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
        MatMenuModule,
        MatCardModule,
        MatSlideToggleModule,
        SearchTemplateModule,
        MatAutocompleteModule,
        ClipboardModule,
        MatTooltipModule,
        MatOptionModule,
        FormsModule,
        NgxSearchBarPaginatorComponent,
    ]
})
export class AppointmentsModule { }
