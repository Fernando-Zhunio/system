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
import { MatChipsModule } from '@angular/material/chips';
import { HistoryStatusesComponent } from './history-statuses/history-statuses.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SelectedViewServientregaPdfComponent } from './selected-view-servientrega-pdf/selected-view-servientrega-pdf.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';

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
    MatChipsModule,
    MatExpansionModule,
    MatBottomSheetModule,
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
    HistoryStatusesComponent,
    SelectedViewServientregaPdfComponent,
  ],
  declarations: [SelectedViewServientregaPdfComponent, HistoryStatusesComponent, TransferenceOrderComponent, DiscountTaxOrderComponent, PaymentOrderComponent, CreateOrEditPaymentOrderComponent, GenerateGuideServientregaComponent, CreateOrEditAddressClientComponent, AddProductsOrderComponent, ShippingsComponent],
  entryComponents: [SelectedViewServientregaPdfComponent, HistoryStatusesComponent, CreateOrEditPaymentOrderComponent, GenerateGuideServientregaComponent, CreateOrEditAddressClientComponent]
})
export class SharedOrderModule { }
