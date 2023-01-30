import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgxPermissionsGuard } from "ngx-permissions";
import { IndexCitiesComponent } from "./pages/index-cities/index-cities.component";
import { CreateOrEditCountryComponent } from "./pages/create-or-edit-country/create-or-edit-country.component";
import { IndexCountriesComponent } from "./pages/index-countries/index-countries.component";
import { PERMISSIONS_COUNTRIES, PERMISSIONS_CITIES } from "./permissions/countries-and-cities.permissions";

const routes: Routes = 
    [
        {
          path: '',
          component: IndexCountriesComponent,
          data: {
            permissions: {
              only: PERMISSIONS_COUNTRIES.index,
            },
          },
          canActivate: [NgxPermissionsGuard],
        },
        {
          path: ':country_id/ciudades',
          children: [
            {
              path: '',
              component: IndexCitiesComponent,
              data: {
                permissions: {
                  only: PERMISSIONS_CITIES.index,
                },
              },
              canActivate: [NgxPermissionsGuard],
            },
            {
              path: 'create',
              component: IndexCitiesComponent,
              data: {
                permissions: {
                  only: PERMISSIONS_CITIES.create,
                },
              },
              canActivate: [NgxPermissionsGuard],
            },
          ],
        },
        {
          path: 'create',
          component: CreateOrEditCountryComponent,
          data: {
            isEdit: false,
            permissions: {
              only: PERMISSIONS_COUNTRIES.create,
            },
          },
          canActivate: [NgxPermissionsGuard],
        },
        {
          path: 'edit/:id',
          component: CreateOrEditCountryComponent,
          data: {
            isEdit: true,
            permissions: {
              only: PERMISSIONS_COUNTRIES.edit,
            },
          },
          canActivate: [NgxPermissionsGuard],
        },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CountriesRoutingModule {}