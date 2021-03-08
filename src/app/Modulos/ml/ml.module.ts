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
import { PaginaWebComponent } from '../../components/pagina-web/pagina-web.component';
import { MatChipsModule } from '@angular/material/chips';



@NgModule({
  declarations: [MlComponent,PromocionesComponent,PaginaWebComponent],
  imports: [
    MomentModule,
    MatCardModule,
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatSnackBarModule,
    MatChipsModule,
  ],
  exports: [ MlComponent,PromocionesComponent,PaginaWebComponent ]
})
export class MlModule { }
