// import { NgxSearchBarPaginatorComponent } from './../../../shared/standalone-components/ngx-search-bar-paginator/ngx-search-bar-paginator.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IndexNewLettersComponent } from './pages/index-newsletters/index-newsletters.component';
import { NewLettersRoutingModule } from './newletters.routing';
import { CreateOrEditNewsletterComponent } from './pages/create-or-edit-newsletter/create-or-edit-newsletter.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { NgxSearchBarModule } from 'ngx-search-bar-fz';

@NgModule({
    declarations: [
        IndexNewLettersComponent,
        CreateOrEditNewsletterComponent
    ],
    imports: [
        CommonModule,
        // NgxSearchBarPaginatorComponent,
        NgxSearchBarModule,
        NewLettersRoutingModule,
        MatChipsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatDatepickerModule
    ]
})
export class NewLettersModule { }