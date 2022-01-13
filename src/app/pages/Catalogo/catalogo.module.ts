import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogoRoutingModule } from './catalogo-routing.module';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatMenuModule } from '@angular/material/menu';
import { CreateOrEditPublicacionComponent } from './publicaciones/create-or-edit-publicacion/create-or-edit-publicacion.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MlModule } from '../../Modulos/ml/ml.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PublicationComponent } from '../../components/publication/publication.component';
import { MatChipsModule } from '@angular/material/chips';
import { SortablejsModule } from 'ngx-sortablejs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ShowPublicationComponent } from './publicaciones/show-publication/show-publication.component';
import { HeaderSearchModule } from '../../Modulos/header-search/header-search.module';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { RepublicarCuentasModalComponent } from '../../components/modals/republicar-cuentas-modal/republicar-cuentas-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConvertsModule } from '../../Modulos/converts/converts.module';
import { MenuMultiPublicationComponent } from './publicaciones/menu-multi-publication/menu-multi-publication.component';
import { CreateOrEditMultipublicationComponent } from './publicaciones/create-or-edit-multipublication/create-or-edit-multipublication.component';
import { TemplateSearchModule } from './../../Modulos/template-search/template-search.module';
import { MatTreeModule } from '@angular/material/tree';

@NgModule({
  declarations: [ RepublicarCuentasModalComponent, PublicacionesComponent, CreateOrEditPublicacionComponent,PublicationComponent, ShowPublicationComponent, MenuMultiPublicationComponent, CreateOrEditMultipublicationComponent],
  imports: [
  CommonModule,
    CatalogoRoutingModule,
    MatTabsModule,
    NgxFileDropModule,
    MatSelectModule,
    MatIconModule,
    MatPaginatorModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    NgxPermissionsModule,
    MatMenuModule,
    DragDropModule,
    MatAutocompleteModule,
    MatListModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MlModule,
    MatSnackBarModule,
    NgxSkeletonLoaderModule,
    MatChipsModule,
    NgxSpinnerModule,
    HeaderSearchModule,
    SwiperModule,
    MatDialogModule,
    ConvertsModule,
    SortablejsModule.forRoot({ animation: 150 }),
    TemplateSearchModule,
    MatTreeModule
  ],
  // providers: [{ provide: RouteReuseStrategy, useClass: CustomReusingStrategy }]
  entryComponents:[RepublicarCuentasModalComponent]
})
export class CatalogoModule { }
