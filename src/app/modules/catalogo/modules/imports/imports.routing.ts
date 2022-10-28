import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgxPermissionsGuard } from "ngx-permissions";
import { PERMISSIONS_IMPORTS } from "./class/permissions-imports";
import { ImportsIndexComponent } from "./pages/imports-index/imports-index.component";

const routes: Routes = [
    {
        path: '',
        component: ImportsIndexComponent,
        data: {
            permissions: { only: PERMISSIONS_IMPORTS.index }
        },
        canActivate: [NgxPermissionsGuard],
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ImportsRoutingModule { }