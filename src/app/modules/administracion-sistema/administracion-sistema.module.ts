import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FacebookAdsManagerComponent } from './facebook-ads-manager/facebook-ads-manager.component';
// import { FacebookAdsSetComponent } from './facebook-ads-manager/facebook-ads-set/facebook-ads-set.component';
// import { FacebookAdsModalComponent } from './facebook-ads-manager/facebook-ads-modal/facebook-ads-modal.component';
// import { FacebookAdsCampaignComponent } from './facebook-ads-manager/facebook-ads-campaign/facebook-ads-campaign.component';
// import { FacebookAdsAccountsComponent } from './facebook-ads-accounts/facebook-ads-accounts.component';
// import { ModalAssignUserComponent } from './usuarios/tool/modal-assign-user/modal-assign-user.component';
// import { IndexWithMatTableModule } from '../../Modulos/index-with-mat-table/index-with-mat-table.module';
// import { MatListModule } from '@angular/material/list';
import { AdminSystemRoutingModule } from './administracion-sistema.routing';
@NgModule({
    declarations: [
        // FacebookAdsManagerComponent,
        // FacebookAdsModalComponent,
        // FacebookAdsCampaignComponent,
        // FacebookAdsSetComponent,
        // FacebookAdsAccountsComponent,
    ],
    imports: [
        CommonModule,
        AdminSystemRoutingModule,
        // IndexWithMatTableModule,
        // MatListModule
    ]
})
export class AdministracionSistemaModule { }
