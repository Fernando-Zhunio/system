import { CreateOrEditDialogData } from './../../../../../../shared/interfaces/create-or-edit-dialog-data';
import { MatDialog } from '@angular/material/dialog';
import { Component, ViewChild } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
// import { PERMISSION_CAMPAIGNS, PERMISSIONS_PROMOTIONS } from '../../../../../../class/permissions-modules';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../../shared/class/mat-table-helper';
import { Campaign } from '../../interfaces/campaign';
import { StatusCreateOrEdit } from '../../../../../../shared/enums/status-create-or-edit';
import { CreateOrEditCampaignComponent } from '../../components/create-or-edit-campaign/create-or-edit-campaign.component';
import { PERMISSIONS_PROMOTIONS, PERMISSION_CAMPAIGNS } from '../../../promotions/permissions/promotions.permissions';

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
    private dialog: MatDialog,
  ) {
    super();
  }
  permissions = PERMISSION_CAMPAIGNS;
  permissionsPromotions = PERMISSIONS_PROMOTIONS;

  openDialog(id: number | null = null): void {
    const data: CreateOrEditDialogData = {
      status: id ? StatusCreateOrEdit.Edit : StatusCreateOrEdit.Create,
    }
    if (id) {
      data.id = id;
    }
    this.dialog.open(CreateOrEditCampaignComponent, {
      data,
      maxWidth: '500px',
      disableClose: true,
    }).beforeClosed().subscribe((res) => {
      console.log(res)
      if (!res) {
        return;
      }
      if (id) {
        this.updateItemInTable(id, res.response.data);
      } else {
        this.addItemInTable(res.response.data);
      }
    });
  }

}
