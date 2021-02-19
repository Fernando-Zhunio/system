import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscarProductosRoutingModule } from './buscar_productos-routing.module';
import { BuscarProductosComponent } from './buscar-productos.component';
import { NgxAutocompleteModule } from 'ngx-angular-autocomplete';
import { FormsModule } from '@angular/forms';

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
// import { PromocionesComponent } from '../../../components/promociones/promociones.component';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { PromocionesComponent } from '../../components/promociones/promociones.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MlModule } from '../../../Modulos/ml/ml.module';
import { MatChipsModule } from '@angular/material/chips';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import {MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
  declarations: [BuscarProductosComponent],
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
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    NgxPermissionsModule,
    MatTabsModule,
    MatSelectModule,
    MatPaginatorModule,
    MlModule,
    MatChipsModule,
    NgxSkeletonLoaderModule,
    MatSnackBarModule,
    NgxPermissionsModule,
    ]
})
export class BuscarProductosModule { }
