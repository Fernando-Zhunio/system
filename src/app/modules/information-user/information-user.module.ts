import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationChartSystemComponent } from './organization-chart/organization-chart.component';
import { InformationUserRoutingModule } from './information-user-routing.module';

import { MlModule } from '../../Modulos/ml/ml.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
  declarations: [OrganizationChartSystemComponent],
  imports: [
    CommonModule,
    InformationUserRoutingModule,
    MatAutocompleteModule,
    MlModule
  ]
})
export class InformationUserModule { }
