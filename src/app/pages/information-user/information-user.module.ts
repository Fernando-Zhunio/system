import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationChartSystemComponent } from './organization-chart/organization-chart.component';
import { InformationUserMainComponents, InformationUserRoutingModule } from './information-user-routing.module';

import { MlModule } from '../../Modulos/ml/ml.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { OrgchartModule } from '@dabeng/ng-orgchart';
// import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [OrganizationChartSystemComponent,InformationUserMainComponents],
  imports: [
    CommonModule,
    InformationUserRoutingModule,
    // NgxOrgChartModule,/
    OrgchartModule,
    MatAutocompleteModule,
    // NgxPaginationModule,
    MlModule

  ]
})
export class InformationUserModule { }
