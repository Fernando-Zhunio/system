import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Crud } from '../../../../class/crud';
import { StandartSearchService } from '../../../../services/standart-search.service';

@Component({
  selector: 'app-promotions-index',
  templateUrl: './promotions-index.component.html',
  styleUrls: ['./promotions-index.component.css']
})
export class PromotionsIndexComponent extends Crud<any> implements OnInit {

  url: string;
  constructor(private s_standartService: StandartSearchService, private s_snackBar: MatSnackBar) {
    super( s_standartService, s_snackBar);
    this.url = 'catalogs/promotions';
  }

  ngOnInit(): void {
  }

}

