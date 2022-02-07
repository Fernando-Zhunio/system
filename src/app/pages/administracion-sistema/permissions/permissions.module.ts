import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsRoutingModule } from './permissions.routing';
import { PermissionIndexComponent } from './permission-index/permission-index.component';
import { IndexWithMatTableModule } from '../../../Modulos/index-with-mat-table/index-with-mat-table.module';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateOrEditPermissionComponent } from './create-or-edit-permission/create-or-edit-permission.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';


@NgModule({
  declarations: [
    PermissionIndexComponent,
    CreateOrEditPermissionComponent
  ],
  imports: [
    PermissionsRoutingModule,
    CommonModule,
    IndexWithMatTableModule,
    MatDialogModule,
    MatBottomSheetModule,
  ],
  entryComponents: [
    CreateOrEditPermissionComponent
  ]
})
export class PermissionsModule { }
