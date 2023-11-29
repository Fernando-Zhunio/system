import { MatButtonModule } from '@angular/material/button';
import { NgModule } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { CountriesRoutingModule } from "./countries.routing";
import { IndexCitiesComponent } from "./pages/index-cities/index-cities.component";
import { DialogCreateOrEditCountryComponent } from "./components/dialog-create-or-edit-country/dialog-create-or-edit-country.component";
import { IndexCountriesComponent } from "./pages/index-countries/index-countries.component";
import { CommonModule } from "@angular/common";
import { MatChipsModule } from "@angular/material/chips";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatCardModule } from '@angular/material/card';
import { DialogCreateOrEditCityComponent } from './components/dialog-create-or-edit-city/dialog-create-or-edit-city.component';
import { NgxSearchBarModule } from 'ngx-search-bar-fz';

@NgModule({
    declarations: [
        IndexCountriesComponent,
        IndexCitiesComponent,
        DialogCreateOrEditCountryComponent,
        DialogCreateOrEditCityComponent,
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
        NgxSearchBarModule,
        NgxPermissionsModule,
    ]
})
export class CountriesModule { }