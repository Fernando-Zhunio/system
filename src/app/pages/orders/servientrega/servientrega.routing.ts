import { Routes, RouterModule } from '@angular/router';
import { ServientregaComponent } from './servientrega.component';

const routes: Routes = [
  {
    path: '',
    component: ServientregaComponent,
  },
];

export const ServientregaRoutes = RouterModule.forChild(routes);
