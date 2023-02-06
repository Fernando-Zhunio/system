import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgxPermissionsGuard } from "ngx-permissions";
// import { PERMISSIONS_PROMOTIONS } from "../../../../class/permissions-modules";
import { IndexPromotionsComponent } from "./pages/index-promotions/index-promotions.component";
import { PERMISSIONS_PROMOTIONS } from "./permissions/promotions.permissions";
 
const routes: Routes = [
    {
        path: '',
        component: IndexPromotionsComponent,
        data: {
            permissions: { only: PERMISSIONS_PROMOTIONS.index },
        },
        canActivate: [NgxPermissionsGuard],
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PromotionsRouting {

 }