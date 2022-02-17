import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VersionIndexComponent } from './version-index/version-index.component';


const routes: Routes = [
  {
    path: '',
    component: VersionIndexComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class VersionRoutingModule { }
