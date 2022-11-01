import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FilePondOptions } from 'filepond';
import { environment } from '../../../../../../../environments/environment';
import { Token } from '../../../../../../class/fast-data';
import { PERMISSIONS_PROMOTIONS } from '../../../../../../class/permissions-modules';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
import { SwalService } from '../../../../../../services/swal.service';
import { MatTableHelper } from '../../../../../../shared/class/mat-table-helper';
import { DetailsPromotionComponent } from '../../components/details-promotion/details-promotion.component';
import { Campaign } from '../../interfaces/campaign';
import { Promotion } from '../../interfaces/promotion';

@Component({
  selector: 'app-promotion-index',
  templateUrl: './promotion-index.component.html',
  styleUrls: ['./promotion-index.component.scss']
})
export class PromotionIndexComponent extends MatTableHelper<Promotion> implements OnInit {
  @ViewChild(MatTable) table: MatTable<Promotion>;
  url: string;
  campaignId: string;
  isOpenFile: boolean = false;
  columnsToDisplay = ['id', 'title', 'products', 'description', 'status', 'price', 'created_at', 'actions'];

  constructor(
    protected mhs: MethodsHttpService,
    protected snackBar: MatSnackBar,
    protected act_router: ActivatedRoute,
    protected router: Router,
    private btnSheet: MatBottomSheet,
  ) {
    super();
    this.campaignId = this.act_router.snapshot.params['campaign_id'];
    this.url = 'catalogs/campaigns/' + this.campaignId + '/promotions';
    const url: string = `catalogs/campaigns/${this.campaignId}/promotions/import`;
    this.pondOptions = {
      allowMultiple: true,
      labelIdle: 'Arrastre o presione aquí',
      name: 'file',
      maxParallelUploads: 5,
      server: {
        url: `${environment.server}`,
        process: {
          url,
          headers: {
            Authorization: `Bearer ${Token.getInstance().getToken()}`,
            Accept: 'application/json',
          },
          onload: (response: any) => {
            const data = JSON.parse(response);
            console.log(data);
            SwalService.swalFire({ title: 'Procesando excel en el servidor', text: 'El excel se esta procesando en el servidor, en unos momento recibirá una notificación describiendo el estado del proceso', icon: 'success' });
            return data.id;
          }
        },
      }
    };
  }

  campaign: Campaign;
  permissions = PERMISSIONS_PROMOTIONS;

  pondOptions: FilePondOptions | null = null

  ngOnInit(): void {
    const url = 'catalogs/campaigns/' + this.act_router.snapshot.params['campaign_id'];
    this.mhs.methodGet(url).subscribe((res: any) => {
      if (res?.success) {
        this.campaign = res.data;
      }
    });
  }

  openDetails(id: number) {
    this.btnSheet.open(DetailsPromotionComponent, {
      data: {campaignId: this.campaignId, promotionId: id}
    });
  }



}
