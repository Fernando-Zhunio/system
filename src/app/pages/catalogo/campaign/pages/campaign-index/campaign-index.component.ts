import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { PermissionCampaigns } from '../../../../../class/permissions-modules';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../shared/class/mat-table-helper';
import { Campaign } from '../../interfaces/campaign';

@Component({
  selector: 'app-campaign-index',
  templateUrl: './campaign-index.component.html',
  styleUrls: ['./campaign-index.component.scss']
})
export class CampaignIndexComponent extends MatTableHelper<Campaign> implements OnInit {
  protected columnsToDisplay: string[] = ['id', 'title', 'duration_type', 'start_date', 'end_date', 'status', 'created_at', 'actions'];
  protected table: MatTable<any>;

  url: string = 'catalogs/campaigns';
  constructor(
    protected methodsHttp: MethodsHttpService,
        protected snackBar: MatSnackBar) {
    super();
  }
  permissions = PermissionCampaigns;
  override dataSource: Campaign[] = [];

  ngOnInit() {
  }

}
