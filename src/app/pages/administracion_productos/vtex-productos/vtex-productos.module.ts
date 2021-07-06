import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { HeaderSearchComponent } from '../../../components/header-search/header-search.component';
import { AdminVtexProductRoutingModule, AdminVtexProductsMainComponents } from './vtex-products-routing.module';


@NgModule({
  declarations: [IndexComponent,AdminVtexProductsMainComponents],
  imports: [
  CommonModule,
  AdminVtexProductRoutingModule,
  HeaderSearchComponent
  ]
})
export class VtexProductosModule { }
