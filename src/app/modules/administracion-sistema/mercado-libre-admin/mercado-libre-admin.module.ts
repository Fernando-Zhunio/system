import { MatCardModule } from '@angular/material/card';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NgxPermissionsModule } from "ngx-permissions";
// import { NgxSearchBarPaginatorComponent } from "../../../shared/standalone-components/ngx-search-bar-paginator/ngx-search-bar-paginator.component";
import { MercaLibreAdminRoutingModule } from "./mercado-libre-admin.routing";
import { IndexMercadoLibreAdminComponent } from "./pages/index-mercado-libre-admin/index-mercado-libre-admin.component";
import { CreateOrEditMercadoLibreAdminComponent } from "./pages/mercado-libre-create-or-edit/create-or-edit-mercado-libre-admin.component";
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgxSearchBarModule } from '../../../../../project/ngx-search-bar/src/public-api';

@NgModule({
    declarations: [
        IndexMercadoLibreAdminComponent,
        CreateOrEditMercadoLibreAdminComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        // NgxSearchBarPaginatorComponent,
        NgxSearchBarModule,
        NgxPermissionsModule,
        MercaLibreAdminRoutingModule,
        MatChipsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatTableModule,
        MatSelectModule,
    ],
}) export class MercadoLibreAdminModule { }