import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Crud } from '../../../../class/crud';
import { PermissionOrdersClients } from '../../../../class/permissions-modules';
import { MethodsHttpService } from '../../../../services/methods-http.service';

@Component({
  selector: 'app-clients-index',
  templateUrl: './clients-index.component.html',
  styleUrls: ['./clients-index.component.scss']
})
export class ClientsIndexComponent extends Crud<any> implements OnInit {


  constructor( protected methodsHttp: MethodsHttpService, protected snackBar: MatSnackBar ) {
    super();
   }
  url = 'system-orders/clients';
  permissions = PermissionOrdersClients;

  ngOnInit(): void {
  }

}
