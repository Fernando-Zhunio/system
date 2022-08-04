import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders.routing';
import { SearchTemplateModule } from '../../Modulos/search-template/search-template.module';
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
import { AddItemTemplateComponent } from './components/add-item-template/add-item-template.component';
import { CreateOrEditDiscountOrTaxOrderComponent } from './components/create-or-edit-discount-or-tax-order/create-or-edit-discount-or-tax-order.component';
import { SharedOrderModule } from './modules/shared-order/shared-order.module';
import { MatMenuModule } from '@angular/material/menu';
import { EditOrderComponent } from './orders/edit-order/edit-order.component';
import { CreateOrEditOrderComponent } from './orders/create-or-edit-order/create-or-edit-order.component';
import { OrdersIndexComponent } from './orders/orders-index/orders-index.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HeaderSearchModule } from '../../Modulos/header-search/header-search.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
// import { NgxMatTimelineModule } from 'ngx-mat-timeline';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { DetailButtonSheetComponent } from './orders/edit-order/detail-button-sheet/detail-button-sheet.component';
import { CountdownModule } from 'ngx-countdown';
import { MomentModule } from 'ngx-moment';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [DashboardOrdersComponent,
    SelectClientModalComponent, EditOrderComponent,
    OrdersIndexComponent, CreateOrEditOrderComponent,
    ClientComponent, AddItemTemplateComponent,
    CreateOrEditDiscountOrTaxOrderComponent, StateFlowOrderComponent,
    DetailButtonSheetComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    OrdersRoutingModule,
    SearchTemplateModule,
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
    HeaderSearchModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatBottomSheetModule,
    MomentModule,
    MatSlideToggleModule
  ]
})
export class OrdersModule { }
