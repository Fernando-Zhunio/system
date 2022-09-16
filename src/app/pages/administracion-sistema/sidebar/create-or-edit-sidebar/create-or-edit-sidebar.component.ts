
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectionListChange } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrEdit } from '../../../../class/create-or-edit';
import { IPermission } from '../../../../interfaces/ipermission';
import { StandartSearchService } from '../../../../services/standart-search.service';

@Component({
  selector: 'app-create-or-edit-sidebar',
  templateUrl: './create-or-edit-sidebar.component.html',
  styleUrls: ['./create-or-edit-sidebar.component.css']
})
export class CreateOrEditSidebarComponent extends CreateOrEdit<any> implements OnInit {
  public title: string = 'Sidebar Item';
  public urlSave: any = 'admin/sidebar';
  urlPermission: string = 'admin/sidebar/permissions';
  override loadCreate: boolean = false;
  permissions: IPermission[] = [];
  formPermission = new FormControl('', [Validators.required]);
  override form: FormGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    url: new FormControl('', [Validators.required]),
    icon: new FormControl('', [Validators.required]),
    permission_id: new FormControl(null, [Validators.required]),
  });
  formSearchPermission = new FormControl(null, [Validators.required]);
  isLoadingPermissions = false;
  isOpenSearchPermission = false;
  constructor(router_activated: ActivatedRoute, private standard: StandartSearchService, router: Router) {
    super(router_activated, standard, router);
  }

  ngOnInit(): void {
    this.init(false);
    this.search();
  }


  search($event = null): void {
    this.isLoadingPermissions = true;
    const text_search = $event;
    this.standard.methodGet(this.urlPermission + '?search=' + text_search).subscribe(res => {
      if (res?.success) {
        this.permissions = res.data.data;
      }
      this.isLoadingPermissions = false;
    });
  }


  getData($event): void {
    console.log($event);
    this.permissions = $event.data;
  }

  override setData(data): void {
    if (this.status === 'edit') {
      this.form.patchValue(data);
      if (data?.permission) {
        this.permissions.push(data.permission);
        this.formPermission.setValue(`${data.permission.name} - ${data.permission.description}`);
        this.form.get('permission_id')?.setValue(data.permission.id);
      }
    }
  }

  selectPermission(event: MatSelectionListChange): void {
    const permission = this.permissions.find(item => item.id === event.options[0].value);
    if (permission) {
      this.form.get('permission_id')?.setValue(permission.id);
      this.formPermission.setValue(`${permission.name} - ${permission.description}`);
      this.isOpenSearchPermission = false;
    }
  }

  override go(): void {
    this.router.navigate(['/administracion-sistema/sidebar']);
  }

}
