import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrEdit2 } from '../../../../class/create-or-edit-2';
import { IuserSystem } from '../../../../interfaces/iuser-system';
import { MethodsHttpService } from '../../../../services/methods-http.service';

@Component({
  selector: 'app-create-or-edit-workspace-order',
  templateUrl: './create-or-edit-workspace-order.component.html',
  styleUrls: ['./create-or-edit-workspace-order.component.scss']
})
export class CreateOrEditWorkspaceOrderComponent extends CreateOrEdit2<any> implements OnInit {

  public title: string = 'Workspace Orden - ';
  public urlSave = 'system-orders/workspaces';
  urlUserSearch = 'system-orders/workspaces/user-search';
  form = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
  });
  usersAssigned = new Map<number, IuserSystem>();
  users = new Map<number, IuserSystem>();
  isActiveSearchPeople = false;
  constructor(
    public act_router: ActivatedRoute,
    public methodsHttp: MethodsHttpService,
    public router: Router,
    public location: Location
    ) {
    super();
  }

  ngOnInit() {
    this.init(false);
  }

  getData(event: any): void {
    this.users = new Map(event.data.map(item => [item?.id, item]));
  }

  selectedPerson(key): void {
    this.usersAssigned.set(key, this.users.get(key));
  }

  unselectedPerson(key): void {
    this.usersAssigned.delete(key);
  }

  getDataForSendServer(): any {
    if (this.form.valid) {
      const idsUsers = Array.from(this.usersAssigned.keys())
      this.form.markAsPending();
      return {
        ...this.form.value,
        users: idsUsers
      }
    } else {
      this.form.markAllAsTouched();
      return false;
    }
  }

  go(data): void {
    this.goBack();
  }


  setData(response): void {
    this.form.patchValue({
      name: response.info.name,
      description: response.info.description,
    });
    this.usersAssigned = new Map(response.users.map(item => [item.id, item]));
  }

}
