import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationChartSystemComponent } from './organization-chart/organization-chart.component';




const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'organizacion',
        component: OrganizationChartSystemComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformationUserRoutingModule {}
