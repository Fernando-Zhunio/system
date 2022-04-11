import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrEdit } from '../../../../class/create-or-edit';
import { StandartSearchService } from '../../../../services/standart-search.service';

@Component({
  selector: 'app-create-or-edit-client-order',
  templateUrl: './create-or-edit-client-order.component.html',
  styleUrls: ['./create-or-edit-client-order.component.scss']
})
export class CreateOrEditClientOrderComponent extends CreateOrEdit<any> implements OnInit {
  public title: string = 'Cliente de orden';
  public urlSave: any = 'system-orders/clients';
  key_param: string = 'client_id';
  form: FormGroup = new FormGroup({
    first_name: new FormControl(null, [Validators.required]),
    last_name: new FormControl(null, [Validators.required]),
    doc_type: new FormControl('ci', [Validators.required]),
    doc_id: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    city: new FormControl(null, [Validators.required]),
    state: new FormControl(null, [Validators.required]),
    country: new FormControl('Ecuador', [Validators.required]),
    company: new FormControl(null),
  });

  constructor(public location: Location, private activeRouter: ActivatedRoute, private standardService: StandartSearchService, router: Router) {
    super ( activeRouter, standardService, router );
  }

  ngOnInit(): void {
    this.init(false);
  }

  go(): void {
    this.location.back();
  }

}
