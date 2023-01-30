import { MatButtonModule } from '@angular/material/button';
import { NgModule } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { CountriesRoutingModule } from "./countries.routing";
import { IndexCitiesComponent } from "./pages/index-cities/index-cities.component";
import { CreateOrEditCountryComponent } from "./pages/create-or-edit-country/create-or-edit-country.component";
import { IndexCountriesComponent } from "./pages/index-countries/index-countries.component";
import { NgxSearchBarPaginatorComponent } from "../../../shared/standalone-components/ngx-search-bar-paginator/ngx-search-bar-paginator.component";
import { CommonModule } from "@angular/common";
import { MatChipsModule } from "@angular/material/chips";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatCardModule } from '@angular/material/card';
import { CreateOrEditCityComponent } from './pages/create-or-edit-city/create-or-edit-city.component';

@NgModule({
    declarations: [
        IndexCountriesComponent,
        IndexCitiesComponent,
        CreateOrEditCountryComponent,
        CreateOrEditCityComponent,
    ],
    imports: [
        CommonModule,
        CountriesRoutingModule,
        MatTableModule,
        MatChipsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatCardModule,
        NgxSearchBarPaginatorComponent,
        NgxPermissionsModule,
    ]
})
export class CountriesModule { }