import { Location } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrEdit2 } from '../../../../../class/create-or-edit-2';
// import { IuserSystem } from '../../../../../interfaces/iuser-system';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { User } from '../../../../../shared/interfaces/user';
import { SimpleSearchSelectorService } from '../../../../../shared/standalone-components/simple-search/simple-search-selector.service';

@Component({
  selector: 'app-create-or-edit-workspace-order',
  templateUrl: './create-or-edit-workspace-order.component.html',
  styleUrls: ['./create-or-edit-workspace-order.component.scss']
})
export class CreateOrEditWorkspaceOrderComponent extends CreateOrEdit2<any> implements OnInit {

  public title: string = 'Workspace Orden - ';
  public urlSave = 'system-orders/workspaces';
  @ViewChild('itemSearchTemplate') itemSearchTemplate: TemplateRef<any>;
  // urlUserSearch = 'system-orders/workspaces/user-search';
  override form = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
  });
  users: User[] = [];
  constructor(
    public act_router: ActivatedRoute,
    public methodsHttp: MethodsHttpService,
    public router: Router,
    public override location: Location,
    private simpleSearchSelectionService: SimpleSearchSelectorService
    ) {
    super();
  }

  ngOnInit() {
    this.init(false);
  }

  openSearchUser(): void {
    this.simpleSearchSelectionService.openDialogSelector({
      placeholder: 'Buscar usuario',
      path: 'system-orders/workspaces/user-search',
      itemTemplateRef: this.itemSearchTemplate,
      isMultiSelection: true,
      columns: 7,
      currentItemSelect: this.users,
    }).beforeClose().subscribe(res => {
      if (res) {
        this.users = res.data;
      }
    })
  }

  override getDataForSendServer(): any {
    if (this.form.valid) {
      const idsUsers = this.users.map(user => user.id);
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

  override go(_data): void {
    this.goBack();
  }


  override setData(response): void {
    this.form.patchValue({
      name: response.info.name,
      description: response.info.description,
    });
    this.users = response.users;
  }

  removeUser(id: number): void {
    const userIndex = this.users.findIndex(user => user.id !== id);
    this.users.splice(userIndex, 1);
  }

}
