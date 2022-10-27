import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgxPermissionsGuard } from "ngx-permissions";
import { PERMISSIONS_PROMOTIONS } from "../../../../class/permissions-modules";
import { PromotionsIndexComponent } from "./pages/promotions-index/promotions-index.component";

const routes: Routes = [
    {
        path: '',
        component: PromotionsIndexComponent,
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