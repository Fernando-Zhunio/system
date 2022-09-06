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
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { InvoicesOrderComponent } from './invoices-order/invoices-order.component';
import { SelectClientAddressModalComponent } from './select-client-address-modal/select-client-address-modal.component';
import { FilesPaymentsOrderComponent } from './payment-order/filesPaymentsOrder/filesPaymentsOrder.component';
import { ToolsModule } from '../../../../Modulos/tools/tools.module';
import { DetailsOrderComponent } from './details-order/details-order.component';
import { NullModule } from '../../../../Modulos/tools/null/null.module';
import { ShippingOrderSectionComponent } from '../../components/shipping-order-section/shipping-order-section.component';
import { TransactionsPaymentComponent } from './payment-order/transactions-payment/transactions-payment.component';
import { CustomTemplateOnlyInputComponent } from './custom-template-only-input/custom-template-only-input.component';
import { ModalAddProductsShippingComponent } from './shippings/modal-add-products-shipping/modal-add-products-shipping.component';
import { PaymentMbaItemComponent } from './components/payment-mba-item/payment-mba-item.component';
import { MatMenuModule } from '@angular/material/menu';
import { NgxPermissionsModule } from 'ngx-permissions';
import { PdfDetailOrderComponent } from './pdf-detail-order/pdf-detail-order.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { SearchWarehousesComponent } from './components/search-warehouses/search-warehouses.component';
import { ViewerGalleryModule } from '../../../../Modulos/viewer-gallery/viewer-gallery.module';
import { SearchProductsModule } from '../../../../shared/search-products/search-products.module';

@NgModule({
    imports: [
        CommonModule,
        MatFormFieldModule,
        SearchProductsModule,
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
        ToolsModule,
        NullModule,
        MatMenuModule,
        NgxPermissionsModule,
        NgxFileDropModule,
        ViewerGalleryModule,

    ],
    exports: [
        ShippingOrderSectionComponent,
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
        InvoicesOrderComponent,
        SelectClientAddressModalComponent,
        FilesPaymentsOrderComponent,
        CustomTemplateOnlyInputComponent,
        ModalAddProductsShippingComponent,
        PaymentMbaItemComponent,
        SearchWarehousesComponent,
    ],
    declarations: [
        ModalAddProductsShippingComponent,
        TransactionsPaymentComponent,
        ShippingOrderSectionComponent,
        FilesPaymentsOrderComponent,
        SelectClientAddressModalComponent,
        SelectedViewServientregaPdfComponent,
        HistoryStatusesComponent,
        TransferenceOrderComponent,
        DiscountTaxOrderComponent,
        PaymentOrderComponent,
        CreateOrEditPaymentOrderComponent,
        GenerateGuideServientregaComponent,
        CreateOrEditAddressClientComponent,
        AddProductsOrderComponent,
        ShippingsComponent,
        InvoicesOrderComponent,
        DetailsOrderComponent,
        CustomTemplateOnlyInputComponent,
        PaymentMbaItemComponent,
        PdfDetailOrderComponent,
        SearchWarehousesComponent,
    ]
})
export class SharedOrderModule { }
