import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
// import { NgxSearchBarPaginatorComponent } from "../../../shared/standalone-components/ngx-search-bar-paginator/ngx-search-bar-paginator.component";
import { IndexPeopleComponent } from "./pages/index-people/index-people.component";
import { PeopleRoutingModule } from "./people.routing";
import { MatTableModule } from '@angular/material/table';
import { CreateOrEditPersonComponent } from './pages/create-or-edit-person/create-or-edit-person.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { PersonDataComponent } from './components/person-data/person-data.component';
import { NgOptimizedImage } from '@angular/common'
import { MatNativeDateModule } from '@angular/material/core';
import { NgxSearchBarModule } from 'ngx-search-bar-fz';

@NgModule({
    declarations: [
        IndexPeopleComponent,
        CreateOrEditPersonComponent,
        PersonDataComponent,
    ],
    imports: [
        CommonModule,
        NgOptimizedImage,
        ReactiveFormsModule,
        PeopleRoutingModule,
        // NgxSearchBarPaginatorComponent,
        NgxSearchBarModule,
        MatFormFieldModule,
        MatChipsModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule,
        MatTableModule,
        MatStepperModule,
        MatButtonModule,
        MatInputModule,
        MatDialogModule,
    ],
})
export class PeopleModule { }
