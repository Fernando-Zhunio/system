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



@NgModule({
  declarations: [ClientsIndexComponent, CreateOrEditClientOrderComponent],
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
  ]
})
export class ClientsModule { }
