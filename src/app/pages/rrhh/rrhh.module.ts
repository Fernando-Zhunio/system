import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { RrhhMainComponents, RrhhRoutingModule } from './rrhh-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// import { CreatedOrEditComponent } from './created-or-edit/created-or-edit.component';



@NgModule({
  declarations: [IndexComponent,RrhhMainComponents, ],
  imports: [
CommonModule,
    RrhhRoutingModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class RrhhModule { }
