import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrEdit2 } from '../../../../class/create-or-edit-2';
import { Iperson } from '../../../../interfaces/iperson';
import { StandartSearchService } from '../../../../services/standart-search.service';

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
    user: new FormControl(null),
  });
  peopleAssigned = new Map<number, Iperson>();
  people = new Map<number, Iperson>();
  isActiveSearchPeople = false;
  constructor(
    public act_router: ActivatedRoute,
    public standard_service: StandartSearchService,
    public router: Router) {
    super();
  }

  ngOnInit() {
    this.init(false);
  }

  getData(event: any): void {
    console.log(event);
    this.people = new Map(event.data.map(item => [item?.user?.id, item]));
  }

  selectedPerson(key): void {
    this.peopleAssigned.set(key, this.people.get(key));
  }

  unselectedPerson(key): void {
    this.peopleAssigned.delete(key);
  }

  getDataForSendServer(): any {
    if (this.form.valid) {
      this.peopleAssigned.keys
    }
  }

}
