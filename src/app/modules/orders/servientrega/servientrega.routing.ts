import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServientregaComponent } from './servientrega.component';

const routes: Routes = [
  {
    path: '',
    component: ServientregaComponent,
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class ServientregaRoutingModule { }
// export const ServientregaRoutes = RouterModule.forChild(routes);
