import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { RrhhRoutingModule } from './rrhh-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// import { CreatedOrEditComponent } from './created-or-edit/created-or-edit.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UsersWebRrhhComponent } from './users-web-rrhh/users-web-rrhh.component';


@NgModule({
  declarations: [IndexComponent, UsersWebRrhhComponent, ],
  imports: [
CommonModule,
    RrhhRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule
  ]
})
export class RrhhModule { }
