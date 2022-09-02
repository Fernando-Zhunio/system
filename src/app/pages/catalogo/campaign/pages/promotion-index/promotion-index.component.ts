import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Crud } from '../../../../../class/crud';
import { StandartSearchService } from '../../../../../services/standart-search.service';

@Component({
  selector: 'app-promotion-index',
  templateUrl: './promotion-index.component.html',
  styleUrls: ['./promotion-index.component.scss']
})
export class PromotionIndexComponent extends Crud<any> implements OnInit {
  url: string;
  public title: string;
  public urlSave: any;
  // url: string;

  
  constructor(
    protected standardService: StandartSearchService,
    protected snackBar: MatSnackBar,
    protected act_router: ActivatedRoute,
    protected router: Router,
  ) {
    super();
    this.url = 'catalogs/campaigns/' + this.act_router.snapshot.params['campaign_id'] + '/promotions';

  }

  ngOnInit(): void {
  }

}
