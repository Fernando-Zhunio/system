import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders.routing';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TranslatefzModule } from '../../Modulos/translatefz/translatefz.module';
import { MatStepperModule } from '@angular/material/stepper';
import { SearchesModule } from '../../Modulos/searches/searches.module';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StateFlowOrderComponent } from './components/state-flow-order/state-flow-order.component';
import { SelectClientModalComponent } from './components/select-client-modal/select-client-modal.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { ClientComponent } from './components/client/client.component';
import { DashboardOrdersComponent } from './dashboard-orders/dashboard-orders.component';
// import { AddItemTemplateComponent } from './components/add-item-template/add-item-template.component';
import { CreateOrEditDiscountOrTaxOrderComponent } from './components/create-or-edit-discount-or-tax-order/create-or-edit-discount-or-tax-order.component';
import { SharedOrderModule } from './modules/shared-order/shared-order.module';
import { MatMenuModule } from '@angular/material/menu';
import { CreateOrEditOrderComponent } from './pages/orders/pages/create-or-edit-order/create-or-edit-order.component';
import { OrdersIndexComponent } from './pages/orders/pages/orders-index/orders-index.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDatepickerModule } from '@angular/material/datepicker';
// import { HeaderSearchModule } from '../../Modulos/header-search/header-search.module';
import { MatTableModule } from '@angular/material/table';
// import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MomentModule } from 'ngx-moment';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LogOrderModalComponent } from './orders/log-order-modal/log-order-modal.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EditDataOrderModalComponent } from './components/edit-data-order-modal/edit-data-order-modal.component';
import { SearchTemplateTableComponent } from '../../Modulos/search-template/search-template-table/search-template-table.component';
import { EditProductOrderComponent } from './pages/orders/components/edit-product-order/edit-product-order.component';
import { SearchProductsDialogModule } from '../../shared/search-products-dialog/search-products-dialog.module';
import { ShippingsComponent } from './pages/orders/components/shippings/shippings.component';
import { EditOrderComponent } from './pages/orders/pages/edit-order/edit-order.component';
import { DetailButtonSheetComponent } from './pages/orders/components/detail-button-sheet/detail-button-sheet.component';
import { SelectChangeStatusShippingOrderComponent } from './pages/orders/components/select-change-status-shipping-order/select-change-status-shipping-order.component';

@NgModule({
  declarations: [DashboardOrdersComponent,
    SelectClientModalComponent, EditOrderComponent,
    OrdersIndexComponent, CreateOrEditOrderComponent,
    ClientComponent,
    CreateOrEditDiscountOrTaxOrderComponent, StateFlowOrderComponent,
    DetailButtonSheetComponent,
    LogOrderModalComponent,
    EditDataOrderModalComponent,
    EditProductOrderComponent,
    ShippingsComponent,
    SelectChangeStatusShippingOrderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    OrdersRoutingModule,
    SearchTemplateTableComponent,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatStepperModule,
    SearchesModule,
    TranslatefzModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatAutocompleteModule,
    NgxMatSelectSearchModule,
    SharedOrderModule,
    MatExpansionModule,
    MatBadgeModule,
    MatMenuModule,
    NgxPermissionsModule,
    DragDropModule,
    MatDatepickerModule,
    // HeaderSearchModule,
    MatTableModule,
    // MatPaginatorModule,
    MatSortModule,
    MatBottomSheetModule,
    MomentModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    SearchProductsDialogModule
  ]
})
export class OrdersModule { }