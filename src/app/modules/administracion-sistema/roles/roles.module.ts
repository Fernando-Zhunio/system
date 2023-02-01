import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgxSearchBarPaginatorComponent } from './../../../shared/standalone-components/ngx-search-bar-paginator/ngx-search-bar-paginator.component';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { CreateOrEditRolesComponent } from "./pages/create-or-edit-roles/create-or-edit-roles.component";
import { IndexRolesComponent } from "./pages/index-roles/index-roles.component";
import { RolesRoutingModule } from "./roles.routing";
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [
        IndexRolesComponent,
        CreateOrEditRolesComponent,
    ],
    imports: [
        CommonModule,
        NgxSearchBarPaginatorComponent,
        ReactiveFormsModule,
        NgxPermissionsModule,
        RolesRoutingModule,
        MatTableModule,
        MatCardModule,
        MatChipsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        DragDropModule
    ],
})
export class RolesModule { }