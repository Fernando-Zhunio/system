import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersIndexComponent } from './orders-index/orders-index.component';
import { OrdersRoutingModule } from './orders.routing';
import { SearchTemplateModule } from '../../Modulos/search-template/search-template.module';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CreateOrEditOrderComponent } from './create-or-edit-order/create-or-edit-order.component';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TranslatefzModule } from '../../Modulos/translatefz/translatefz.module';
import { MatStepperModule } from '@angular/material/stepper';
import { SearchesModule } from '../../Modulos/searches/searches.module';
import { ClientComponent } from './components/client/client.component';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { CreateOrEditAddressClientComponent } from './modules/shared-order/create-or-edit-address-client/create-or-edit-address-client.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddItemTemplateComponent } from './components/add-item-template/add-item-template.component';
import { CreateOrEditDiscountOrTaxOrderComponent } from './components/create-or-edit-discount-or-tax-order/create-or-edit-discount-or-tax-order.component';
import { ShippingOrderSectionComponent } from './components/shipping-order-section/shipping-order-section.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StateFlowOrderComponent } from './components/state-flow-order/state-flow-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { SelectClientModalComponent } from './components/select-client-modal/select-client-modal.component';
import { SelectClientAddressModalComponent } from './components/select-client-address-modal/select-client-address-modal.component';
import { SharedOrderModule } from './modules/shared-order/shared-order.module';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [SelectClientAddressModalComponent, SelectClientModalComponent, EditOrderComponent, OrdersIndexComponent, CreateOrEditOrderComponent, ClientComponent, AddItemTemplateComponent, CreateOrEditDiscountOrTaxOrderComponent, ShippingOrderSectionComponent, StateFlowOrderComponent],
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
    MatBadgeModule
  ],
  entryComponents: [SelectClientAddressModalComponent, SelectClientModalComponent, CreateOrEditDiscountOrTaxOrderComponent]
})
export class OrdersModule { }
