import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTreeDynamicComponent } from './list-tree-dynamic/list-tree-dynamic.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';



@NgModule({
  declarations: [ListTreeDynamicComponent],
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
    MatChipsModule
  ],
  exports: [ListTreeDynamicComponent]
})
export class ToolsModule { }
