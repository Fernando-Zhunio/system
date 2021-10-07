import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cperson, TYPE_CORP_EMAIL } from '../../../../class/cperson';
import { CreateEmailModalComponent } from '../../../../components/modals/create-email-modal/create-email-modal.component';
import { IuserSystem } from '../../../../interfaces/iuser-system';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { SwalService } from '../../../../services/swal.service';
import { ModalAssignUserComponent } from './../tool/modal-assign-user/modal-assign-user.component';

export interface Task {
  name: string;
  active: boolean;
  color: ThemePalette;
  child?: Task[];
}
@Component({
  selector: 'app-create-or-edit',
  templateUrl: './create-or-edit.component.html',
  styleUrls: ['./create-or-edit.component.css'],
})
export class CreateOrEditComponent implements OnInit {
  constructor(
    private s_standart: StandartSearchService,
    private act_router: ActivatedRoute,
    private ngx_spinner: NgxSpinnerService,
    private route: Router,
    private location: Location,
    private dialog: MatDialog
  ) {}

  hide: boolean = true;
  regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
  search_person: string = '';
  persons: Cperson[] = [];
  person_current: Cperson = null;
  isloadPersons: boolean = false;
  form_user: FormGroup = new FormGroup({
  password: new FormControl('', [Validators.pattern(this.regex)]),
  // email: new FormControl('', [Validators.required]),
  });
  roles: [] = [];
  sexes = {};
  locations = [];
  cities = [];
  positions = [];
  title: string = 'Creando Usuario';
  userCurrent: IuserSystem;
  companies: Task = {
    name: 'Todas las empresas',
    active: false,
    color: 'primary',
    child: [],
  };
  state: 'create' | 'edit' = 'create';
  allComplete: boolean = false;

  ngOnInit(): void {
    this.ngx_spinner.show();
    this.act_router.data.subscribe((res) => {
      this.state = res.isEdit ? 'edit' : 'create';
      if (res.isEdit) {
        this.title = 'Editando Usuario';
        const id = Number.parseInt(this.act_router.snapshot.paramMap.get('id'));
        const url = 'admin/users/' + id + '/edit';
        this.s_standart.show(url).subscribe((response) => {
          if (response.data.person == null) {
            this.notPerson(response.data.user);
          } else {
            this.person_current = response.data.person;
          }
          this.userCurrent = response.data.user;
          const companies = response.data.companies.map((obj) => ({
            ...obj,
            active: false,
          }));
          this.userCurrent.companies.forEach((obj) => {
            companies.find((x) => x.id == obj).active = true;
          });
          this.companies.child = companies;
          ////#endregion

          const roles = response.data.roles.map((obj) => ({
            ...obj,
            active: false,
          }));
          this.userCurrent.roles.forEach((obj) => {
            roles.find((x) => x.id == obj).active = true;
          });
          this.roles = roles;
          //#endregion
          this.ngx_spinner.hide();
        });
      } else {
        this.title = 'Creando Usuario';
        this.s_standart.show('admin/users/create').subscribe((response) => {
          this.assignData(response);
          this.ngx_spinner.hide();
        });
      }
    });
  }
  updateAllComplete() {
    this.allComplete =
      this.companies.child != null &&
      this.companies.child.every((t) => t.active);
  }

  someComplete(): boolean {
    if (this.companies.child == null) {
      return false;
    }
    return (
      this.companies.child.filter((t) => t.active).length > 0 &&
      !this.allComplete
    );
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    this.companies.child.forEach((t) => (t.active = completed));
  }

  assignPersonUser(person_id: number) {
    const old_person = this.person_current ? {old_person: this.person_current.id} : null;
    this.s_standart.updatePut('admin/user/' + this.userCurrent.id + '/people/' + person_id, old_person).subscribe((response) => {
      console.log(response);
    });
  }

  notPerson(user): void {
    this.dialog.open(ModalAssignUserComponent, {
      data: {user, person: this.person_current},
      disableClose: true,
    }).beforeClosed().subscribe((res1) => {
      console.log(res1);
      if (res1) {
       this.assignPersonUser(res1.id);
       this.person_current = res1;
      }
    });
  }

  searchPerson(): void {
    this.isloadPersons = true;
    this.persons.length = 0;
    this.s_standart
      .show('admin/user/people?search=' + this.search_person)
      .subscribe((res) => {
        if (res.success) {
          this.persons = res.data;
        }
        this.isloadPersons = false;
      });
  }

  assignData(response) {
    const companies = response.data.companies.map((obj) => ({
      ...obj,
      active: false,
    }));
    this.companies.child = companies;

    const roles = response.data.roles.map((obj) => ({
      ...obj,
      active: false,
    }));
    this.roles = roles;
  }

  saveInServer(): void {
    if (this.state == 'create') {
      const data = this.captureData();
      if (data) {
        this.ngx_spinner.show();
        this.s_standart.store(`admin/people/${this.person_current.id}/user`, data).subscribe((res) => {
          this.ngx_spinner.hide();
          this.route.navigate(['administracion-sistema/usuarios']);
        }, err => {
          this.ngx_spinner.hide();
        });
      }
    } else {
      if (this.state == 'edit') {
        const data = this.captureData();
        if (data) {
          this.s_standart
            .updatePut('admin/users/' + this.userCurrent.id, data)
            .subscribe((res) => {
              this.ngx_spinner.hide();
              this.route.navigate(['administracion-sistema/usuarios']);
            }, err => {
              this.ngx_spinner.hide();
            });
        }
      }
    }
  }

  captureData() {
    if (this.form_user.invalid) {
      this.form_user.markAllAsTouched();
      SwalService.swalToast('Tiene campos por llenar', 'warning');
      return false;
    }
    const IdsRoles = this.roles
      .filter((x: any) => x.active == true)
      .map((obj: any) => obj.id);
    if (IdsRoles.length < 1) {
      SwalService.swalToast('Asigne un rol al nuevo usuario', 'warning');
      return false;
    }
    const IdsCompany = this.companies.child
      .filter((x: any) => x.active == true)
      .map((obj: any) => obj.id);
    if (IdsCompany.length < 1) {
      SwalService.swalToast('Asigne una compañia al nuevo usuario', 'warning');
      return false;
    }
    const data = {
      roles: IdsRoles,
      companies: IdsCompany,
    };


    if (this.form_user.value.password) {
      data['password'] = this.form_user.value.password;
    }

    return data;

    return {
      // person_id: this.person_current.id,
      roles: IdsRoles,
      companies: IdsCompany,
      ...this.form_user.value,
    };
  }

  captureUser(id): void {
    const person = this.persons.find((x) => x.id === id);
    if (person) {
      if (person.contact_info?.length > 0) {
        const value_person = Object.values(person.contact_info);
        const emails_coorp = value_person.find(
          (x) => x['type'] == TYPE_CORP_EMAIL
        );
        if (emails_coorp) {
          this.person_current = person;
        } else {
          this.getEmailCoorpForThisUser(person);
        }
      } else {
        this.getEmailCoorpForThisUser(person);
      }
    }
  }

  getEmailCoorpForThisUser(person: Cperson): void {
    this.dialog.open(CreateEmailModalComponent, {
      data: { person},
      disableClose: true,
    }).beforeClosed().subscribe(res => {
      if (res && res.hasOwnProperty('success') && res.success) {
        person.contact_info = [res.data];
        this.form_user.controls['email'].setValue(res.data.value);
        this.person_current = person;
      }
    });
    SwalService.swalToast('No posee Correo coorporativo', 'error');
  }

  changePerson(): void {
    this.notPerson(this.userCurrent);
  }

  goBack() {
    this.location.back();
  }
}
