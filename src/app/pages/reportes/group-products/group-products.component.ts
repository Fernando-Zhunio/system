import { Component, OnInit } from '@angular/core';
import { IgroupProducts } from '../../../../assets/spreadsheet_trial/interfaces/igroup-products';
import { StandartSearchService } from '../../../services/standart-search.service';

@Component({
  selector: 'app-group-products',
  templateUrl: './group-products.component.html',
  styleUrls: ['./group-products.component.css']
})
export class GroupProductsComponent implements OnInit {

  constructor(private s_standart: StandartSearchService) { }

  ngOnInit(): void {
    this.s_standart.index('reports/group-products').subscribe((res: {success: boolean, data: IgroupProducts}) => {
    });
  }
}
