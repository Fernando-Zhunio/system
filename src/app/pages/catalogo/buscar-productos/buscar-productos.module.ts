import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscarProductosRoutingModule } from './buscar_productos-routing.module';
import { BuscarProductosComponent } from './buscar-productos.component';
import { NgxAutocompleteModule } from 'ngx-angular-autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { MatFormFieldModule } from '@angular/material/form-field';
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
import { PostModule } from '../../../Modulos/post.module';
import { MatChipsModule } from '@angular/material/chips';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { HeaderSearchModule } from '../../../Modulos/header-search/header-search.module';
// import { NgxMasonryModule } from 'ngx-masonry';
// import { TranslatefzModule } from '../../../Modulos/translatefz/translatefz.module';
// import { SimpleScrollSpyModule } from "angular-simple-scroll-spy";

@NgModule({
  declarations: [BuscarProductosComponent],
  imports: [
    CommonModule,
    BuscarProductosRoutingModule,
    NgxAutocompleteModule,
    CarouselModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    // BsDropdownModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    NgxPermissionsModule,
    MatTabsModule,
    MatSelectModule,
    MatPaginatorModule,
    MlModule,
    MatChipsModule,
    NgxSkeletonLoaderModule,
    MatSnackBarModule,
    ClipboardModule,
    TooltipModule.forRoot(),
    MatSidenavModule,
    PostModule,
    SwiperModule,
    HeaderSearchModule,
    // NgxMasonryModule,
    // SimpleScrollSpyModule,
    ]
})
export class BuscarProductosModule { }
