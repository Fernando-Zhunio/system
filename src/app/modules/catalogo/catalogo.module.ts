import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogoRoutingModule } from './catalogo.routing';
import { PublicacionesComponent } from './modules/publicaciones/publicaciones.component';
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
import { CreateOrEditPublicacionComponent } from './modules/publicaciones/create-or-edit-publicacion/create-or-edit-publicacion.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MlModule } from '../../Modulos/ml/ml.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PublicationComponent } from './components/publication/publication.component';
import { MatChipsModule } from '@angular/material/chips';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ShowPublicationComponent } from './modules/publicaciones/show-publication/show-publication.component';
import { HeaderSearchModule } from '../../Modulos/header-search/header-search.module';
import { RepublicarCuentasModalComponent } from '../../components/modals/republicar-cuentas-modal/republicar-cuentas-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConvertsModule } from '../../Modulos/converts/converts.module';
import { MenuMultiPublicationComponent } from './modules/publicaciones/menu-multi-publication/menu-multi-publication.component';
import { CreateOrEditMultipublicationComponent } from './modules/publicaciones/create-or-edit-multipublication/create-or-edit-multipublication.component';
import { TemplateSearchModule } from '../../Modulos/template-search/template-search.module';
import { MatTreeModule } from '@angular/material/tree';
import { ToolsModule } from '../../Modulos/tools/tools.module';
import { SearchTemplateModule } from '../../Modulos/search-template/search-template.module';
import { InfoViewComponent } from './components/info-view/info-view.component';
import { SearchProductModalComponent } from '../../components/modals/search-product-modal/search-product-modal.component';

@NgModule({
  declarations: [
    RepublicarCuentasModalComponent, 
    PublicacionesComponent, 
    CreateOrEditPublicacionComponent,
    PublicationComponent, 
    ShowPublicationComponent, 
    MenuMultiPublicationComponent, 
    CreateOrEditMultipublicationComponent,
    InfoViewComponent,
    SearchProductModalComponent
  ],
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
    MatDialogModule,
    ConvertsModule,
    TemplateSearchModule,
    MatTreeModule,
    ToolsModule,
    SearchTemplateModule,
  ],
})
export class CatalogoModule { }
