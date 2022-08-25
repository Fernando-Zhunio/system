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
import { PaginaWebComponent } from '../../components/pagina-web/pagina-web.component';
import { MatChipsModule } from '@angular/material/chips';
import { ModalRealistComponent } from '../../components/ml/tools/modal-realist/modal-realist.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslatefzModule } from '../translatefz/translatefz.module';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [MlComponent, PromocionesComponent, PaginaWebComponent, ModalRealistComponent],
    imports: [
        MomentModule,
        MatCardModule,
        CommonModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatSnackBarModule,
        MatChipsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        TranslatefzModule,
        RouterModule,
    ],
    exports: [
        MlComponent,
        PromocionesComponent,
        PaginaWebComponent,
        ModalRealistComponent
    ]
})
export class MlModule { }
