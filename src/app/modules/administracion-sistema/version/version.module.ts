import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VersionIndexComponent } from './version-index/version-index.component';
import { RouterModule } from '@angular/router';
import { VersionRoutingModule } from './version.routing';
import { IndexWithMatTableModule } from '../../../Modulos/index-with-mat-table/index-with-mat-table.module';



@NgModule({
  declarations: [VersionIndexComponent],
  imports: [
    CommonModule,
    RouterModule,
    IndexWithMatTableModule,
    VersionRoutingModule,
  ]
})
export class VersionModule { }
