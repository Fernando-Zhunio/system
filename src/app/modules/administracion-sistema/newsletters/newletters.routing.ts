import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { IndexNewLettersComponent } from './pages/index-newsletters/index-newsletters.component';
import { CreateOrEditNewsletterComponent } from './pages/create-or-edit-newsletter/create-or-edit-newsletter.component';
const routes: Routes = [
    {
        path: '',
        component: IndexNewLettersComponent,
    },
    {
        path: 'create',
        component: CreateOrEditNewsletterComponent,
        data: {
            isEdit: false
        }
    },
    {
        path: 'edit/:id',
        component: CreateOrEditNewsletterComponent,
        data: { isEdit: true },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NewLettersRoutingModule { }