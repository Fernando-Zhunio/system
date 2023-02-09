import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ListTreeDynamicComponent } from './list-tree-dynamic/list-tree-dynamic.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { ViewDocComponent } from './view-doc/view-doc.component';
import { ViewCornerComponent } from './view-corner/view-corner.component';
import { SearchNullComponent } from './search-null/search-null.component';



@NgModule({
  declarations: [ ViewDocComponent, ViewCornerComponent, SearchNullComponent],
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
    MatChipsModule,
  ],
  exports: [ViewDocComponent, ViewCornerComponent, SearchNullComponent]
})
export class ToolsModule { }
