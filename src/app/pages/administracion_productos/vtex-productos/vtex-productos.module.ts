import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IndexComponent } from "./index/index.component";
import {
  AdminVtexProductRoutingModule,
  AdminVtexProductsMainComponents,
} from "./vtex-products-routing.module";
import { HeaderSearchModule } from "../../../Modulos/header-search/header-search.module";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MomentModule } from "ngx-moment";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { CreateOrEditComponent } from "./create-or-edit/create-or-edit.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatChipsModule } from "@angular/material/chips";
import { NgxSpinnerModule } from "ngx-spinner";
import { MatTreeModule } from "@angular/material/tree";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { FormSkusComponent } from './templates/form-skus/form-skus.component';
import {MatStepperModule} from '@angular/material/stepper';
import { FormProductComponent } from './templates/form-product/form-product.component';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    IndexComponent,
    AdminVtexProductsMainComponents,
    CreateOrEditComponent,
    FormSkusComponent,
    FormProductComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminVtexProductRoutingModule,
    HeaderSearchModule,
    NgxSkeletonLoaderModule,
    MatPaginatorModule,
    MomentModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatChipsModule,
    NgxSpinnerModule,
    MatTreeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    SwiperModule,
    MatStepperModule,
    MatTabsModule
  ],
})
export class VtexProductosModule {}
