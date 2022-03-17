import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsIndexComponent } from './clients-index/clients-index.component';
import { CreateOrEditClientOrderComponent } from './create-or-edit-client-order/create-or-edit-client-order.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ClientsRoutingModule } from './clients.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SearchTemplateModule } from '../../../Modulos/search-template/search-template.module';
import { ClientAddressesIndexComponent } from './client-addresses-index/client-addresses-index.component';
import { SharedOrderModule } from '../modules/shared-order/shared-order.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';



@NgModule({
  declarations: [ClientsIndexComponent, CreateOrEditClientOrderComponent, ClientAddressesIndexComponent],
  imports: [
  CommonModule,
    ClientsRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    SearchTemplateModule,
    SharedOrderModule,
    MatDialogModule,
    MatChipsModule,
  ]
})
export class ClientsModule { }
