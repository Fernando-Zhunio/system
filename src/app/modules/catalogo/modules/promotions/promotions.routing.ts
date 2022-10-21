import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PromotionsIndexComponent } from "./promotions-index/promotions-index.component";

const routes: Routes = [
    {
        path: '',
        component: PromotionsIndexComponent,
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PromotionsRouting {

 }