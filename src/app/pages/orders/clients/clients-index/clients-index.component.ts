import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Crud } from '../../../../class/crud';
import { PermissionOrdersClients } from '../../../../class/permissions-modules';
import { StandartSearchService } from '../../../../services/standart-search.service';

@Component({
  selector: 'app-clients-index',
  templateUrl: './clients-index.component.html',
  styleUrls: ['./clients-index.component.scss']
})
export class ClientsIndexComponent extends Crud<any> implements OnInit {


  constructor( protected standardService: StandartSearchService, protected snackBar: MatSnackBar ) {
    super();
   }
  url = 'system-orders/clients';
  permissions = PermissionOrdersClients;

  ngOnInit(): void {
  }

}
