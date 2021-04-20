import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import {  AdminSystemRoutingModule, ADRolesMainComponents, ADUsersMainComponents, ADPaisesMainComponents, ADLocationsMainComponents, ADPersonasMainComponents, ADMercadoLibreAdminMainComponents, ADFacebookAdsManagerMainComponents } from './administracion-sistema-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MomentModule } from 'ngx-moment';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatCardModule } from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateOrEditComponent } from './usuarios/create-or-edit/create-or-edit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { HeaderSearchModule } from '../../Modulos/header-search/header-search.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';

import { RolesComponent } from './roles/roles.component';
import { CreateOrEditRolesComponent } from './roles/create-or-edit-roles/create-or-edit-roles.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { PaisesComponent } from './paises/paises.component';
import { CreateOrEditCountryComponent } from './paises/create-or-edit-country/create-or-edit-country.component';
import { LocacionesComponent } from './locaciones/locaciones.component';
import { CreateOrEditLocationComponent } from './locaciones/create-or-edit-location/create-or-edit-location.component';
import { ConvertsModule } from '../../Modulos/converts/converts.module';
import { PersonasComponent } from './personas/personas.component';
import { PersonComponent } from '../../components/person/person.component';
import { CreateOrEditPersonComponent } from './personas/create-or-edit-person/create-or-edit-person.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatStepperModule} from '@angular/material/stepper';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CreateEmailModalComponent } from '../../components/modals/create-email-modal/create-email-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MercadoLibreAdminComponent } from './mercado-libre-admin/mercado-libre-admin.component';
import { MercadoLibreCreateOrEditComponent } from './mercado-libre-admin/mercado-libre-create-or-edit/mercado-libre-create-or-edit.component';
import { FacebookAdsManagerComponent } from './facebook-ads-manager/facebook-ads-manager.component';
import { MatBadgeModule} from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { FacebookAdsSetComponent } from './facebook-ads-manager/facebook-ads-set/facebook-ads-set.component';
import { FacebookAdsModalComponent } from './facebook-ads-manager/facebook-ads-modal/facebook-ads-modal.component';
import { FacebookAdsCampaignComponent } from './facebook-ads-manager/facebook-ads-campaign/facebook-ads-campaign.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FacebookAdsAccountsComponent } from './facebook-ads-accounts/facebook-ads-accounts.component';

// import { ComprasAutomaticasComponent } from './compras-automaticas/compras-automaticas.component';

// import { ConvertObjectToArrayPipe } from '../../pipes/convert-object-to-array.pipe';



@NgModule({
  declarations: [
    CreateEmailModalComponent,
    UsuariosComponent,
    ADUsersMainComponents,
    ADRolesMainComponents,
    CreateOrEditComponent,
    RolesComponent,
    CreateOrEditRolesComponent,
    PaisesComponent,
    ADPaisesMainComponents,
    CreateOrEditCountryComponent,
    LocacionesComponent,
    CreateOrEditLocationComponent,
    ADLocationsMainComponents,
    PersonasComponent,
    ADPersonasMainComponents,
    PersonComponent,
    CreateOrEditPersonComponent,
    MercadoLibreAdminComponent,
    ADMercadoLibreAdminMainComponents,
    MercadoLibreCreateOrEditComponent,
    ADFacebookAdsManagerMainComponents,
    FacebookAdsManagerComponent,
    FacebookAdsModalComponent,
    FacebookAdsCampaignComponent,
    FacebookAdsSetComponent,
    FacebookAdsAccountsComponent,
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
    ConvertsModule,
    FormsModule,
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
    // MatSlideToggle,

  ],

  entryComponents: [
    CreateEmailModalComponent,
    CreateOrEditCountryComponent,
    FacebookAdsModalComponent,
  ]
})
export class AdministracionSistemaModule { }
