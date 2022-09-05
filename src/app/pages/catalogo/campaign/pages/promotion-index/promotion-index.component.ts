import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Crud } from '../../../../../class/crud';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { Campaign } from '../../interfaces/campaign';

@Component({
  selector: 'app-promotion-index',
  templateUrl: './promotion-index.component.html',
  styleUrls: ['./promotion-index.component.scss']
})
export class PromotionIndexComponent extends Crud<any> implements OnInit {
  url: string;
  public title: string;
  public urlSave: any;
  
  constructor(
    protected methodsHttp: MethodsHttpService,
    protected snackBar: MatSnackBar,
    protected act_router: ActivatedRoute,
    protected router: Router,
  ) {
    super();
    this.url = 'catalogs/campaigns/' + this.act_router.snapshot.params['campaign_id'] + '/promotions';
  }

  campaign: Campaign;

  ngOnInit(): void {
    const url = 'catalogs/campaigns/' + this.act_router.snapshot.params['campaign_id'];
    this.methodsHttp.methodGet(url).subscribe((res: any) => {
      if (res?.success) {
        this.campaign = res.data;
      }
    });
  }

}
