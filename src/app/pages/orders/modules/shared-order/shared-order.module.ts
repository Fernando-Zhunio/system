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
  ],
  exports: [
    CreateOrEditAddressClientComponent,
    AddProductsOrderComponent
  ],
  declarations: [CreateOrEditAddressClientComponent, AddProductsOrderComponent],
  entryComponents: [CreateOrEditAddressClientComponent]
})
export class SharedOrderModule { }
