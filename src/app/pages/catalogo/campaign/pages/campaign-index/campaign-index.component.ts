import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Crud } from '../../../../../class/crud';
import { StandartSearchService } from '../../../../../services/standart-search.service';
// import { Campaign } from '../../interfaces/campaign';

@Component({
  selector: 'app-campaign-index',
  templateUrl: './campaign-index.component.html',
  styleUrls: ['./campaign-index.component.scss']
})
export class CampaignIndexComponent extends Crud<any> implements OnInit {

  url: string;

  // override data: Map<number, Campaign> = new Map<number, Campaign>();

  constructor(
    protected standardService: StandartSearchService,
    protected snackBar: MatSnackBar) {
    super();
  }

  ngOnInit() {
  }

}
