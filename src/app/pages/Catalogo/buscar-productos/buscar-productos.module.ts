import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscarProductosRoutingModule } from './buscar_productos-routing.module';
import { BuscarProductosComponent } from './buscar-productos.component';
import { NgxAutocompleteModule } from 'ngx-angular-autocomplete';
import { FormsModule } from '@angular/forms';

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { PromocionesComponent } from '../../../components/promociones/promociones.component';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { PromocionesComponent } from '../../components/promociones/promociones.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [BuscarProductosComponent,PromocionesComponent],
  imports: [
    CommonModule,
    BuscarProductosRoutingModule,
    NgxAutocompleteModule,
    FormsModule,
    BsDropdownModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class BuscarProductosModule { }
