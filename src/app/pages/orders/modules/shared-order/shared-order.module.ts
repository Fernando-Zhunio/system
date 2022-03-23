import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateOrEditAddressClientComponent } from './create-or-edit-address-client/create-or-edit-address-client.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { AddProductsOrderComponent } from './add-products-order/add-products-order.component';
import { SearchesModule } from '../../../../Modulos/searches/searches.module';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ShippingsComponent } from './shippings/shippings.component';
import { TranslatefzModule } from './../../../../Modulos/translatefz/translatefz.module';
import { MatSelectModule } from '@angular/material/select';
import { GenerateGuideServientregaComponent } from './tools/generate-guide-servientrega/generate-guide-servientrega.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { PaymentOrderComponent } from './payment-order/payment-order.component';
import { CreateOrEditPaymentOrderComponent } from './payment-order/create-or-edit-payment-order/create-or-edit-payment-order.component';
import { FilePondModule } from 'ngx-filepond';
import { MatBadgeModule } from '@angular/material/badge';
import { DiscountTaxOrderComponent } from './discount-tax-order/discount-tax-order.component';
import { TransferenceOrderComponent } from './transference-order/transference-order.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    SearchesModule,
    MatListModule,
    MatIconModule,
    TranslatefzModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    FilePondModule,
    MatBadgeModule,
    MatCardModule,
  ],
  exports: [
    CreateOrEditAddressClientComponent,
    AddProductsOrderComponent,
    ShippingsComponent,
    GenerateGuideServientregaComponent,
    PaymentOrderComponent,
    CreateOrEditPaymentOrderComponent,
    DiscountTaxOrderComponent,
    TransferenceOrderComponent,

  ],
  declarations: [TransferenceOrderComponent, DiscountTaxOrderComponent, PaymentOrderComponent, CreateOrEditPaymentOrderComponent, GenerateGuideServientregaComponent, CreateOrEditAddressClientComponent, AddProductsOrderComponent, ShippingsComponent],
  entryComponents: [CreateOrEditPaymentOrderComponent, GenerateGuideServientregaComponent, CreateOrEditAddressClientComponent]
})
export class SharedOrderModule { }
