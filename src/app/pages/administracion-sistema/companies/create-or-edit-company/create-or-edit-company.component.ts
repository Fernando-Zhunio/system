import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICompany } from '../../../../interfaces/icompanies';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { CreateOrEdit } from './../../../../class/create-or-edit';

@Component({
  selector: 'app-create-or-edit-company',
  templateUrl: './create-or-edit-company.component.html',
  styleUrls: ['./create-or-edit-company.component.css']
})
export class CreateOrEditCompanyComponent extends CreateOrEdit<ICompany> implements OnInit {

  constructor(actived_router: ActivatedRoute, standard_service: StandartSearchService, router: Router) {
    super( actived_router, standard_service, router);
  }

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    country_id: new FormControl('', Validators.required),
  });

  public title: string = 'Compañía';
  urlSave: any = 'admin/companies';
  countries: {id: number, name: string}[] = [];
  ngOnInit(): void {
    this.init();
  }

  setData(data: any): void {
    if (this.status === 'create') {
      this.countries = data.countries;
      return;
    }
    this.countries = data.countries;
    this.form.setValue({
      name: data.companies.name,
      country_id: data.companies.country_id
    });
  }

  go(): void {
    this.router.navigate(['/administracion-sistema/companies']);
  }

  getDataForSendServer(): any {
    if (this.form.valid) {
      return this.form.value;
    }
    return false;
  }

}
