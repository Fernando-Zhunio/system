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
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TranslatefzModule } from '../../Modulos/translatefz/translatefz.module';
import {MatStepperModule} from '@angular/material/stepper';
import { SearchesModule } from '../../Modulos/searches/searches.module';
import { ClientComponent } from './components/client/client.component';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreateOrEditAddressClientComponent } from './components/create-or-edit-address-client/create-or-edit-address-client.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddItemTemplateComponent } from './components/add-item-template/add-item-template.component';
import {CdkTableModule} from '@angular/cdk/table';
import { CreateOrEditDiscountOrTaxOrderComponent } from './components/create-or-edit-discount-or-tax-order/create-or-edit-discount-or-tax-order.component';



@NgModule({
  declarations: [OrdersIndexComponent, CreateOrEditOrderComponent, ClientComponent, CreateOrEditAddressClientComponent, AddItemTemplateComponent, CreateOrEditDiscountOrTaxOrderComponent],
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
    MatSelectModule,
    MatStepperModule,
    SearchesModule,
    TranslatefzModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
  entryComponents: [CreateOrEditAddressClientComponent, CreateOrEditDiscountOrTaxOrderComponent]
})
export class OrdersModule { }
