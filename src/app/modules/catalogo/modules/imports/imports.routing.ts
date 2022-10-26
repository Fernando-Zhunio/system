import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ImportsIndexComponent } from "./pages/imports-index/imports-index.component";

const routes: Routes = [
    {
        path: '',
        component: ImportsIndexComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ImportsRoutingModule { }