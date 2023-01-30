import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  AdminSystemRoutingModule } from './administracion-sistema.routing';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MomentModule } from 'ngx-moment';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatCardModule } from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { HeaderSearchModule } from '../../Modulos/header-search/header-search.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { RolesComponent } from './roles/roles.component';
import { CreateOrEditRolesComponent } from './roles/create-or-edit-roles/create-or-edit-roles.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
// import { PaisesComponent } from './paises/paises.component';
// import { CreateOrEditCountryComponent } from './paises/pages/create-or-edit-country/create-or-edit-country.component';
import { ConvertsModule } from '../../Modulos/converts/converts.module';
import { PersonasComponent } from './personas/personas.component';
import { PersonComponent } from '../../components/person/person.component';
import { CreateOrEditPersonComponent } from './personas/create-or-edit-person/create-or-edit-person.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CreateEmailModalComponent } from '../../components/modals/create-email-modal/create-email-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
// import { MercadoLibreAdminComponent } from './mercado-libre-admin/mercado-libre-admin.component';
// import { MercadoLibreCreateOrEditComponent } from './mercado-libre-admin/pages/mercado-libre-create-or-edit/create-or-edit-mercado-libre-admin.component';
import { FacebookAdsManagerComponent } from './facebook-ads-manager/facebook-ads-manager.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { FacebookAdsSetComponent } from './facebook-ads-manager/facebook-ads-set/facebook-ads-set.component';
import { FacebookAdsModalComponent } from './facebook-ads-manager/facebook-ads-modal/facebook-ads-modal.component';
import { FacebookAdsCampaignComponent } from './facebook-ads-manager/facebook-ads-campaign/facebook-ads-campaign.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FacebookAdsAccountsComponent } from './facebook-ads-accounts/facebook-ads-accounts.component';
import { ModalAssignUserComponent } from './usuarios/tool/modal-assign-user/modal-assign-user.component';
import { VtexSitesComponent } from './vtex-site/vtex-sites.component';
import { VtexWarehousesComponent } from './vtex-site/vtex-warehouses/vtex-warehouses.component';
import { CreateOrEditVtexWarehousesComponent } from './vtex-site/vtex-warehouses/create-or-edit-vtex-warehouses/create-or-edit-vtex-warehouses.component';
import { CreateOrEditVtexSiteComponent } from './vtex-site/create-or-edit-vtex-site/create-or-edit-vtex-site.component';
import { VtexSiteComponent } from './vtex-site/tools/vtex-site/vtex-site.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
// import { IndexComponent } from './newsletters/pages/index-newsletters/index-newsletters.component';
// import { IndexCompaniesComponent } from './companies/pages/index-companies/index-companies.component';

// import { CreateOrEditNewsletterComponent } from './newsletters/pages/create-or-edit-newsletter/create-or-edit-newsletter.component';
import { QuillModule } from 'ngx-quill';
// import { CreateOrEditCompanyComponent } from './companies/pages/create-or-edit-company/create-or-edit-company.component';
// import { DepartmentIndexComponent } from './companies/departments/department-index/department-index.component';
// import { CreateOrEditDepartmentComponent } from './companies/departments/create-or-edit-department/create-or-edit-department.component';
import {MatTreeModule} from '@angular/material/tree';
import { MatRadioModule } from '@angular/material/radio';
// import { PositionsIndexComponent } from './companies/departments/positions/positions-index/positions-index.component';
// import { CreateOrEditPositionComponent } from './companies/departments/positions/create-or-edit-position/create-or-edit-position.component';
// import { CitiesIndexComponent } from './paises/pages/cities-index/index-cities.component';
import { IndexWithMatTableModule } from '../../Modulos/index-with-mat-table/index-with-mat-table.module';
import { SearchesModule } from '../../Modulos/searches/searches.module';
import { MatListModule } from '@angular/material/list';
@NgModule({
    declarations: [
        CreateEmailModalComponent,
        RolesComponent,
        CreateOrEditRolesComponent,
        // PaisesComponent,
        // CreateOrEditCountryComponent,
        PersonasComponent,
        PersonComponent,
        CreateOrEditPersonComponent,
        // MercadoLibreAdminComponent,
        // MercadoLibreCreateOrEditComponent,
        FacebookAdsManagerComponent,
        FacebookAdsModalComponent,
        FacebookAdsCampaignComponent,
        FacebookAdsSetComponent,
        FacebookAdsAccountsComponent,
        ModalAssignUserComponent,
        VtexWarehousesComponent,
        CreateOrEditVtexWarehousesComponent,
        VtexSitesComponent,
        CreateOrEditVtexSiteComponent,
        VtexSiteComponent,
        // IndexComponent,
        // IndexCompaniesComponent,
        // CreateOrEditNewsletterComponent,
        // CreateOrEditCompanyComponent,
        // DepartmentIndexComponent,
        // CreateOrEditDepartmentComponent,
        // PositionsIndexComponent,
        // CreateOrEditPositionComponent,
        // CitiesIndexComponent,
    ],
    imports: [
        CommonModule,
        AdminSystemRoutingModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        MomentModule,
        NgxPermissionsModule,
        MatCardModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        HeaderSearchModule,
        MatPaginatorModule,
        MatSnackBarModule,
        DragDropModule,
        FormsModule,
        ConvertsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatStepperModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatDialogModule,
        MatTabsModule,
        MatMenuModule,
        MatBadgeModule,
        NgxSpinnerModule,
        NgxSkeletonLoaderModule,
        // SearchTemplateModule,
        MatTreeModule,
        MatRadioModule,
        QuillModule.forRoot(),
        IndexWithMatTableModule,

        SearchesModule,
        MatListModule
    ]
})
export class AdministracionSistemaModule { }
