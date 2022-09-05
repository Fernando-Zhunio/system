import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Crud } from '../../../../../class/crud';
import { PermissionCampaigns } from '../../../../../class/permissions-modules';
import { MethodsHttpService } from '../../../../../services/methods-http.service';

@Component({
  selector: 'app-campaign-index',
  templateUrl: './campaign-index.component.html',
  styleUrls: ['./campaign-index.component.scss']
})
export class CampaignIndexComponent extends Crud<any> implements OnInit {

  url: string = 'catalogs/campaigns';
  constructor(
    protected methodsHttp: MethodsHttpService,
        protected snackBar: MatSnackBar) {
    super();
  }
  permissions = PermissionCampaigns;

  ngOnInit() {
  }

}
