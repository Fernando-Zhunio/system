import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsRoutingModule } from './permissions.routing';
import { IndexPermissionsComponent } from './pages/index-permissions/index-permissions.component';
// import { IndexWithMatTableModule } from '../../../Modulos/index-with-mat-table/index-with-mat-table.module';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateOrEditPermissionComponent } from './create-or-edit-permission/create-or-edit-permission.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { IndexGroupsPermissionsComponent } from './pages/index-groups-permissions/index-groups-permissions.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgxSearchBarPaginatorComponent } from '../../../shared/standalone-components/ngx-search-bar-paginator/ngx-search-bar-paginator.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';


@NgModule({
    declarations: [
        IndexPermissionsComponent,
        CreateOrEditPermissionComponent,
        IndexGroupsPermissionsComponent
    ],
    imports: [
        PermissionsRoutingModule,
        CommonModule,
        NgxSearchBarPaginatorComponent,
        // IndexWithMatTableModule,
        MatDialogModule,
        MatBottomSheetModule,
        MatListModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatInputModule,
        MatChipsModule,
        MatCheckboxModule,
        MatCardModule,
        MatTableModule,
        MatButtonToggleModule,
    ]
})
export class PermissionsModule { }
