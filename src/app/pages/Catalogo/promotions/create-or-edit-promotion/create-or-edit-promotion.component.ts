import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrEdit } from '../../../../class/create-or-edit';
import { SearchComponent } from '../../../../components/search/search.component';
import { StandartSearchService } from '../../../../services/standart-search.service';

@Component({
  templateUrl: './create-or-edit-promotion.component.html',
  styleUrls: ['./create-or-edit-promotion.component.css']
})
export class CreateOrEditPromotionComponent extends CreateOrEdit<any> implements OnInit {
  public title: string;
  public urlSave: any;

  constructor(public activated_route: ActivatedRoute, public service: StandartSearchService, public router: Router) {
    super(activated_route, service, router);
    this.title = 'Promoción';
    this.urlSave = 'catalogs/promotions';
  }

  @ViewChild('search') search: SearchComponent;
  urlSearchProducts: string = 'catalogs/promotions/search-products';

  durationType: string[] = [];
  statuses: string[] = [];

  form: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    duration_type: new FormControl(null, [Validators.required]),
    status: new FormControl(null, [Validators.required]),
    note: new FormControl(null, [Validators.required]),
    products: new FormControl(null, [Validators.required]),
    date_range_start: new FormControl(null, [Validators.required]),
    date_range_end: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.init();
  }

  setData(response): void {
    // this.data = $response;
    if (this.status === 'edit') {
      this.data = response.promotion;
    }
    this.durationType = response.price_durations;
    this.statuses = response.statuses;
  }



}
