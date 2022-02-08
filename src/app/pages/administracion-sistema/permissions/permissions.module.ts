import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsRoutingModule } from './permissions.routing';
import { PermissionIndexComponent } from './permission-index/permission-index.component';
import { IndexWithMatTableModule } from '../../../Modulos/index-with-mat-table/index-with-mat-table.module';
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
import { GroupsPermissionsIndexComponent } from './groups-permissions/groups-permissions-index/groups-permissions-index.component';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
  declarations: [
    PermissionIndexComponent,
    CreateOrEditPermissionComponent,
    GroupsPermissionsIndexComponent
  ],
  imports: [
    PermissionsRoutingModule,
    CommonModule,
    IndexWithMatTableModule,
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
  ],
  entryComponents: [
    CreateOrEditPermissionComponent,
    GroupsPermissionsIndexComponent
  ]
})
export class PermissionsModule { }
