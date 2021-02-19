import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MlComponent } from '../../components/ml/ml.component';
import { MomentModule } from 'ngx-moment';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { PromocionesComponent } from '../../components/promociones/promociones.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PublicationComponent } from '../../components/publication/publication.component';



@NgModule({
  declarations: [MlComponent,PromocionesComponent],
  imports: [
    MomentModule,
    MatCardModule,
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  exports: [ MlComponent,PromocionesComponent ]
})
export class MlModule { }
