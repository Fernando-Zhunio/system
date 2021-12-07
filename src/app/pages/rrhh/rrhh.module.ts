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
import { RouterModule } from '@angular/router';
import { HeaderSearchModule } from '../../Modulos/header-search/header-search.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SearchTemplateModule } from '../../Modulos/search-template/search-template.module';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [IndexComponent, UsersWebRrhhComponent, ],
  imports: [
CommonModule,
    RrhhRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    RouterModule,
    // HeaderSearchModule,
    MatChipsModule,
    MatMenuModule,
    MatFormFieldModule,
    SearchTemplateModule,
    NgxDocViewerModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class RrhhModule { }
