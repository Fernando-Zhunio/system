import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IpermissionSystem } from '../../../../../interfaces/administracion-sistema/ipermission-system';
import { IrolSystem } from '../../../../../interfaces/irol-system';
import { StandartSearchService } from '../../../../../services/standart-search.service';
import { SwalService } from '../../../../../services/swal.service';

@Component({
  selector: 'app-create-or-edit-roles',
  templateUrl: './create-or-edit-roles.component.html',
  styleUrls: ['./create-or-edit-roles.component.scss'],
})
export class CreateOrEditRolesComponent implements OnInit {
  form_rol: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null),
    guard_name: new FormControl('user'),
  });
  constructor(
    private ngx_spinner: NgxSpinnerService,
    private activated_route: ActivatedRoute,
    private s_standart: StandartSearchService,
    private location: Location,
    private router: Router,

  ) {}

  state: 'create' | 'edit' = 'create';
  title: string = 'Creando ROL';
  permissions: IpermissionSystem[] = [];
  permissionFilter: IpermissionSystem[] = [];
  searchText: string = '';
  role: IrolSystem = new IrolSystem();
  ngOnInit(): void {
    this.ngx_spinner.show();
    this.activated_route.data.subscribe((data) => {
      if (data['isEdit']) {
        this.title = 'Editando Rol';
        this.state = 'edit';
        const id = Number.parseInt(
          this.activated_route.snapshot.paramMap.get('id')!
        );
        this.s_standart
          .show('admin/roles/' + id + '/edit')
          .subscribe(
            (res: {
              success: boolean;
              data: { role: IrolSystem; permissions: IpermissionSystem[] };
            }) => {
              // deber ir primero para quitarle los que ya estan
              this.permissions = res.data.permissions;
              this.permissionFilter = this.permissions;
              this.role = res.data.role;
              const { name, title, description, guard_name } = this.role;
              this.form_rol.setValue({ name, title, description, guard_name });

              this.role['permissions']?.forEach((item) => {
                this.iniciatePermissions(item.id)
              });
              this.ngx_spinner.hide();
            }
          );
      } else {
        this.s_standart.show('admin/roles/create').subscribe((res) => {
          this.permissions = res.data;
          this.permissionFilter = this.permissions;
          this.ngx_spinner.hide();
        });
      }
    });
  }

  drop(event: CdkDragDrop<IpermissionSystem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  returnItem(id): void {
    const index = this.role.permissions?.findIndex((x) => x.id == id);
    if (index != -1) {
      this.permissions.push(this.role.permissions![index!]);
      this.role.permissions?.splice(index!, 1);
      this.permissionsFilter(this.searchText);
    }
  }

  permissionsFilter(event) {
    this.searchText = event.target.value;
    if (this.searchText.trim() !== null) {
        this.permissionFilter = this.permissions.filter((x) =>
        x.title.toUpperCase().includes(this.searchText.toUpperCase())
      );
    } else { this.permissionFilter = this.permissions; }
  }

  transferDataItem(id): void {
    const index = this.permissions.findIndex((x) => x.id == id);
    if (index != -1) {
      this.role.permissions?.push(this.permissions[index]);
      this.permissions.splice(index, 1);
      this.permissionsFilter(this.searchText);
    }
  }

  iniciatePermissions(id) {
    const index = this.permissions.findIndex((x) => x.id == id);
    if (index != -1) {
      this.permissions.splice(index, 1);
    }
  }

  saveInServer(): void {
    if (this.state == 'create') {
      const data = this.captureData();
      if (data) {
        this.ngx_spinner.show();
        this.s_standart.store('admin/roles', data).subscribe(() => {
          this.ngx_spinner.hide();
          this.router.navigate(['administracion-sistema/roles']);
        });
      }
    } else {
      if (this.state == 'edit'){
        const data = this.captureData();
       if (data) {
         this.s_standart.updatePut('admin/roles/' + this.role.id, data).subscribe(() => {
           this.ngx_spinner.hide();
          this.router.navigate(['administracion-sistema/roles']);
         });
       }
      }
    }
  }

  captureData() {
    if (this.form_rol.invalid) {
      // this.form_user;
      this.form_rol.markAllAsTouched();
      SwalService.swalToast('Tiene campos por llenar', 'warning');
      return false;
    }
    let permissionsIds;
    if (this.role.permissions?.length && this.role.permissions?.length > 0){
       permissionsIds = this.role.permissions.map(item => {
        return item.id;
      });

    }

    return {permissions: permissionsIds, ...this.form_rol.value}

  }

  goBack() {
    this.location.back();
  }
}
