import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Crud } from '../../../../class/crud';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { CreateOrEditAddressClientComponent } from '../../modules/shared-order/create-or-edit-address-client/create-or-edit-address-client.component';

@Component({
  selector: 'app-client-addresses-index',
  templateUrl: './client-addresses-index.component.html',
  styleUrls: ['./client-addresses-index.component.scss']
})
export class ClientAddressesIndexComponent extends Crud<any> implements OnInit {

  constructor(private activated_router: ActivatedRoute,  protected standardService: StandartSearchService,
    protected snackBar: MatSnackBar, private dialog: MatDialog) {
    super();
    this.id = this.activated_router.snapshot.params['client_id'];
    this.url = `system-orders/clients/${this.activated_router.snapshot.params['client_id']}/addresses`;
  }
  id: number;
  url: string;

  ngOnInit() {

  }

  openDialogCreateOrEdit(address_id: number = null): void {
    this.dialog.open(CreateOrEditAddressClientComponent, {
      data: {
        isoObligate: false,
        client_id: this.id,
        address_id
      },
      disableClose: true
    }).beforeClosed().subscribe(res => {
      if (res?.success) {
        this.data.set(res.data.id, res.data);
      }
      console.log(res);
    });
  }

}
