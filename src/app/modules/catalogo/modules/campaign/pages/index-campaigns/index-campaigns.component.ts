import { Component, ViewChild } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { PERMISSION_CAMPAIGNS, PERMISSIONS_PROMOTIONS } from '../../../../../../class/permissions-modules';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../../shared/class/mat-table-helper';
import { Campaign } from '../../interfaces/campaign';

@Component({
  selector: 'app-campaign-index',
  templateUrl: './index-campaigns.component.html',
  styleUrls: ['./index-campaigns.component.scss']
})
export class IndexCampaignsComponent extends MatTableHelper<Campaign> {
  protected columnsToDisplay: string[] = ['id', 'title', 'description', 'duration_type', 'start_date', 'end_date', 'status', 'created_at', 'actions'];
  @ViewChild(MatTable) table: MatTable<any>;

  url: string = 'catalogs/campaigns';
  constructor(
    protected mhs: MethodsHttpService,
  ) {
    super();
  }
  permissions = PERMISSION_CAMPAIGNS;
  permissionsPromotions = PERMISSIONS_PROMOTIONS;
  // override dataSource: Campaign[] = [];

}
