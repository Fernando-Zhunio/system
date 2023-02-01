import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateOrEditVtexSiteComponent } from './pages/create-or-edit-vtex-site/create-or-edit-vtex-site.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxPermissionsModule } from 'ngx-permissions';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { IndexVtexSitesComponent } from './pages/index-vtex-sites/index-vtex-sites.component';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from "@angular/core";
import { NgxSearchBarPaginatorComponent } from "../../../shared/standalone-components/ngx-search-bar-paginator/ngx-search-bar-paginator.component";
import { VtexSitesRoutingModule } from "./vtex-sites.routing";
import { IndexVtexWarehousesComponent } from './pages/index-vtex-warehouses/index-vtex-warehouses.component';
import { MatButtonModule } from '@angular/material/button';
import { CreateOrEditVtexWarehousesComponent } from './pages/create-or-edit-vtex-warehouses/create-or-edit-vtex-warehouses.component';

@NgModule({
    declarations: [
        IndexVtexSitesComponent,
        IndexVtexWarehousesComponent,
        CreateOrEditVtexSiteComponent,
        CreateOrEditVtexWarehousesComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        VtexSitesRoutingModule,
        NgxSearchBarPaginatorComponent,
        MatCardModule,
        MatChipsModule,
        MatTableModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        NgxPermissionsModule,

    ],
})
export class VtexSitesModule {}