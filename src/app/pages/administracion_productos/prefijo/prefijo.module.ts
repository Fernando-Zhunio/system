import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrefijoComponent } from './prefijo.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PrefijosRoutingModule, PrefijoMainComponents } from './prefijos-routing.module';
import { PrefijosCreateOrEditComponent } from './prefijos-create-or-edit/prefijos-create-or-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [PrefijosCreateOrEditComponent,PrefijoComponent,PrefijoMainComponents],
  imports: [
    CommonModule,
    NgxPaginationModule,
    PrefijosRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
  ]
})
export class PrefijoModule { }
