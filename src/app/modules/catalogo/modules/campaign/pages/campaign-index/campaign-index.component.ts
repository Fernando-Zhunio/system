import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { PERMISSION_CAMPAIGNS, PERMISSION_PROMOTIONS } from '../../../../../../class/permissions-modules';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../../shared/class/mat-table-helper';
import { Campaign } from '../../interfaces/campaign';

@Component({
  selector: 'app-campaign-index',
  templateUrl: './campaign-index.component.html',
  styleUrls: ['./campaign-index.component.scss']
})
export class CampaignIndexComponent extends MatTableHelper<Campaign> {
  protected columnsToDisplay: string[] = ['id', 'title', 'description', 'duration_type', 'start_date', 'end_date', 'status', 'created_at', 'actions'];
  @ViewChild(MatTable) table: MatTable<any>;

  url: string = 'catalogs/campaigns';
  constructor(
    protected methodsHttp: MethodsHttpService,
        protected snackBar: MatSnackBar) {
    super();
  }
  permissions = PERMISSION_CAMPAIGNS;
  permissionsPromotions = PERMISSION_PROMOTIONS;
  override dataSource: Campaign[] = [];

}
