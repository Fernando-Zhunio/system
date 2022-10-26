import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products.routing';
// import { NgxAutocompleteModule } from 'ngx-angular-autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
// import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ClipboardModule} from '@angular/cdk/clipboard';
// import { MatSidenavModule } from '@angular/material/sidenav';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { MomentModule } from 'ngx-moment';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductsComponent } from './pages/products/products.component';
import { DialogHistoryPricesProductComponent } from './components/dialog-history-prices-product/dialog-history-prices-product.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { StockBodegasComponent } from '../../../../components/modals/stock-bodegas/stock-bodegas.component';
import { SearchTemplateModule } from '../../../../Modulos/search-template/search-template.module';
import { MlModule } from '../../../../Modulos/ml/ml.module';
import { PostModule } from '../../../../Modulos/post.module';
import { TranslatefzModule } from '../../../../Modulos/translatefz/translatefz.module';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [ProductsComponent, StockBodegasComponent, DialogHistoryPricesProductComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    NgxPermissionsModule,
    MatTabsModule,
    MatSelectModule,
    MlModule,
    MatChipsModule,
    NgxSkeletonLoaderModule,
    ClipboardModule,
    PostModule,
    SwiperModule,
    SearchTemplateModule,
    MomentModule,
    MatDialogModule,
    MatProgressBarModule,
    TranslatefzModule,
    MatListModule
    ],
    
})
export class BuscarProductosModule { }
