import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { OrdersRoutingModule } from "./orders.routing"
import { StateFlowOrderComponent } from "./components/state-flow-order/state-flow-order.component"
import { SelectClientModalComponent } from "./components/select-client-modal/select-client-modal.component"
import { ClientComponent } from "./components/client/client.component"
import { CreateOrEditDiscountOrTaxOrderComponent } from "./components/create-or-edit-discount-or-tax-order/create-or-edit-discount-or-tax-order.component"
import { CreateOrEditOrderComponent } from "./pages/orders/pages/create-or-edit-order/create-or-edit-order.component"
import { OrdersIndexComponent } from "./pages/orders/pages/orders-index/orders-index.component"
import { LogOrderModalComponent } from "./orders/log-order-modal/log-order-modal.component"
import { EditDataOrderModalComponent } from "./components/edit-data-order-modal/edit-data-order-modal.component"
import { EditProductOrderComponent } from "./pages/orders/components/edit-product-order/edit-product-order.component"
import { ShippingsComponent } from "./pages/orders/components/shippings/shippings.component"
import { EditOrderComponent } from "./pages/orders/pages/edit-order/edit-order.component"
import { DetailButtonSheetComponent } from "./pages/orders/components/detail-button-sheet/detail-button-sheet.component"
import { SelectChangeStatusShippingOrderComponent } from "./pages/orders/components/select-change-status-shipping-order/select-change-status-shipping-order.component"
import { ModalAddProductsShippingComponent } from "./pages/orders/components/modal-add-products-shipping/modal-add-products-shipping.component"
import { SelectedViewServientregaPdfComponent } from "./pages/orders/components/selected-view-servientrega-pdf/selected-view-servientrega-pdf.component"
import { ShippingOrderSectionComponent } from "./pages/orders/components/shipping-order-section/shipping-order-section.component"
import { SelectChangeStatusPaymentComponent } from "./pages/orders/components/select-change-status-payment/select-change-status-payment.component"
import { PaymentOrderComponent } from "./pages/orders/components/payment-order/payment-order.component"
import { TransactionsPaymentComponent } from "./pages/orders/components/transactions-payment/transactions-payment.component"
import { CreateOrEditPaymentOrderComponent } from "./pages/orders/components/create-or-edit-payment-order/create-or-edit-payment-order.component"
import { FilesPaymentsOrderComponent } from "./pages/orders/components/filesPaymentsOrder/filesPaymentsOrder.component"
import { HistoryStatusesComponent } from "./pages/orders/components/history-statuses/history-statuses.component"
import { GenerateGuideServientregaComponent } from "./pages/orders/components/generate-guide-servientrega/generate-guide-servientrega.component"
import { AddProductsOrderComponent } from "./pages/orders/components/add-products-order/add-products-order.component"
import { DiscountTaxOrderComponent } from "./pages/orders/components/discount-tax-order/discount-tax-order.component"
import { SelectClientAddressModalComponent } from "./modules/shared-order/select-client-address-modal/select-client-address-modal.component"
import { CreateOrEditAddressClientComponent } from "./modules/shared-order/create-or-edit-address-client/create-or-edit-address-client.component"
import { TransferenceOrderComponent } from "./modules/shared-order/transference-order/transference-order.component"
import { InvoicesOrderComponent } from "./modules/shared-order/invoices-order/invoices-order.component"
import { PaymentMbaItemComponent } from "./modules/shared-order/components/payment-mba-item/payment-mba-item.component"
import { SearchWarehousesComponent } from "./pages/orders/components/search-warehouses/search-warehouses.component"
import { ViewerGalleryComponent } from "../../Modulos/viewer-gallery/viewer-gallery.component"
import { PdfDetailOrderComponent } from "./modules/shared-order/pdf-detail-order/pdf-detail-order.component"
import { DetailsOrderComponent } from "./modules/shared-order/details-order/details-order.component"
import { SheetButtonOnlyInputComponent } from "./pages/orders/components/sheet-button-only-input/sheet-button-only-input.component"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatButtonModule } from "@angular/material/button"
import { MatSelectModule } from "@angular/material/select"
import { MatChipsModule } from "@angular/material/chips"
import { MatIconModule } from "@angular/material/icon"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { TranslatefzModule } from "../../Modulos/translatefz/translatefz.module"
import { InputArrayComponent } from "../../shared/standalone-components/input-array/input-array.component"
import { MatTableModule } from "@angular/material/table"
import { MatCardModule } from "@angular/material/card"
import { NgxPermissionsModule } from "ngx-permissions"
import { MatDialogModule } from "@angular/material/dialog"
import { MatListModule } from "@angular/material/list"
import { MatBottomSheetModule } from "@angular/material/bottom-sheet"
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader"
import { MatMenuModule } from "@angular/material/menu"
import { MatExpansionModule } from "@angular/material/expansion"
import { FormProductOrderComponent } from "./pages/orders/components/form-product-order/form-product-order.component"
import { ClipboardModule } from "@angular/cdk/clipboard"
import { MatTooltipModule } from "@angular/material/tooltip"
import { NgxMatSelectSearchModule } from "ngx-mat-select-search"
import { ViewCornerComponent } from "../../Modulos/tools/view-corner/view-corner.component"
import { NgxFileDropModule } from "ngx-file-drop"
import { SearchNullComponent } from "../../Modulos/tools/search-null/search-null.component"
import { MatStepperModule } from "@angular/material/stepper"
import { SearchesModule } from "../../Modulos/searches/searches.module"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { NgxSearchBarModule } from "ngx-search-bar-fz"

@NgModule({
  declarations: [
    SelectClientModalComponent,
    EditOrderComponent,
    OrdersIndexComponent,
    CreateOrEditOrderComponent,
    ClientComponent,
    CreateOrEditDiscountOrTaxOrderComponent,
    StateFlowOrderComponent,
    DetailButtonSheetComponent,
    LogOrderModalComponent,
    EditDataOrderModalComponent,
    EditProductOrderComponent,
    ShippingsComponent,
    SelectChangeStatusShippingOrderComponent,
    ModalAddProductsShippingComponent,
    SelectedViewServientregaPdfComponent,
    ShippingOrderSectionComponent,
    SelectChangeStatusPaymentComponent,
    PaymentOrderComponent,
    TransactionsPaymentComponent,
    CreateOrEditPaymentOrderComponent,
    FilesPaymentsOrderComponent,
    HistoryStatusesComponent,
    GenerateGuideServientregaComponent,
    AddProductsOrderComponent,
    DiscountTaxOrderComponent,
    SelectClientAddressModalComponent,
    CreateOrEditAddressClientComponent,
    TransferenceOrderComponent,
    InvoicesOrderComponent,
    PaymentMbaItemComponent,
    SearchWarehousesComponent,
    ViewerGalleryComponent,
    PdfDetailOrderComponent,
    DetailsOrderComponent,
    SheetButtonOnlyInputComponent,
    FormProductOrderComponent,
  ],
  imports: [
    SearchNullComponent,
    ViewCornerComponent,
    CommonModule,
    OrdersRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    MatCardModule,
    NgxPermissionsModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatTooltipModule,
    NgxMatSelectSearchModule,
    SearchesModule,
    TranslatefzModule,
    InputArrayComponent,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    MatListModule,
    MatMenuModule,
    MatExpansionModule,
    ClipboardModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    NgxFileDropModule,
    NgxSearchBarModule,
  ],
})
export class OrdersModule {}
