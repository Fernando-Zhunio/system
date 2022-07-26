import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cperson, TYPE_CORP_EMAIL } from '../../../../class/cperson';
import { CreateOrEdit2 } from '../../../../class/create-or-edit-2';
import { CreateEmailModalComponent } from '../../../../components/modals/create-email-modal/create-email-modal.component';
import { IuserSystem } from '../../../../interfaces/iuser-system';
import { MethodsHttpService } from '../../../../services/methods-http.service';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { SwalService } from '../../../../services/swal.service';
// import { ModalAssignUserComponent } from './../tool/modal-assign-user/modal-assign-user.component';

export interface Task {
  name: string;
  active: boolean;
  color: ThemePalette;
  child?: Task[];
}
@Component({
  selector: 'app-create-or-edit',
  templateUrl: './create-or-edit.component.html',
  styleUrls: ['./create-or-edit.component.scss'],
})
export class CreateOrEditComponent extends CreateOrEdit2<any> implements OnInit {
  public title: string = 'Usuario - ';
  public urlSave: any = '';
  standard_service: StandartSearchService;
  router: Router;
  constructor(
    private methodsHttp: MethodsHttpService,
    public act_router: ActivatedRoute,
    private ngx_spinner: NgxSpinnerService,
    private route: Router,
    public location: Location,
    private dialog: MatDialog
  ) {
    super();
  }

  // hide: boolean = true;
  // regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
  search_person: string = '';
  people: Cperson[] = [];
  personCurrent: Cperson = null;
  isloadPersons: boolean = false;
  form: FormGroup = new FormGroup({
    password: new FormControl(''),
    email: new FormControl(null, [Validators.required, Validators.email]),
    // email: new FormControl('', [Validators.required]),
  });
  roles: any[] = [];
  isSearchPerson = false;
  // sexes = {};
  // locations = [];
  // cities = [];
  // positions = [];
  // title: string = 'Creando Usuario';
  // userCurrent: IuserSystem;
  // companies: Task = {
  //   name: 'Todas las empresas',
  //   active: false,
  //   color: 'primary',
  //   child: [],
  // };
  // state: 'create' | 'edit' = 'create';
  // allComplete: boolean = false;

  ngOnInit(): void {
    this.init();
    // this.ngx_spinner.show();
    // this.act_router.data.subscribe((res) => {
    //   this.state = res.isEdit ? 'edit' : 'create';
    //   if (res.isEdit) {
    //     this.title = 'Editando Usuario';
    //     const id = Number.parseInt(this.act_router.snapshot.paramMap.get('id'));
    //     const url = 'admin/users/' + id + '/edit';
    //     this.methodsHttp.methodGet(url).subscribe((response) => {
    //       if (response.data.person == null) {
    //         this.notPerson(response.data.user);
    //       } else {
    //         this.person_current = response.data.person;
    //       }
    //       this.userCurrent = response.data.user;
    //       const companies = response.data.companies.map((obj) => ({
    //         ...obj,
    //         active: false,
    //       }));
    //       this.userCurrent.companies.forEach((obj) => {
    //         companies.find((x) => x.id == obj).active = true;
    //       });
    //       // this.companies.child = companies;
    //       ////#endregion

    //       const roles = response.data.roles.map((obj) => ({
    //         ...obj,
    //         active: false,
    //       }));
    //       this.userCurrent.roles.forEach((obj) => {
    //         roles.find((x) => x.id == obj).active = true;
    //       });
    //       this.roles = roles;
    //       //#endregion
    //       this.ngx_spinner.hide();
    //     });
    //   } else {
    //     this.title = 'Creando Usuario';
    //     this.methodsHttp.methodGet('admin/users/create').subscribe((response) => {
    //       this.assignData(response);
    //       this.ngx_spinner.hide();
    //     });
    //   }
    // });
  }

  loaderDataForCreate(): void {
    this.methodsHttp.methodGet('admin/users/create').subscribe((response) => {
      this.assignData(response);
      this.ngx_spinner.hide();
    });
  }
  updateAllComplete() {
    // this.allComplete =
    //   this.companies.child != null &&
    //   this.companies.child.every((t) => t.active);
  }


  getPeople($event): void {
    this.people = $event.data;
    console.log(this.people);
  }

  selectedPerson(id): void {
    this.form.get('email').setValue(null);
    this.personCurrent = this.people.find((x) => x.id == id);
    if (this.personCurrent.contact_info.length > 0) {
      const email = this.personCurrent.contact_info[0].value;
      this.form.get('email').setValue(email);
    }
    this.isSearchPerson = false;
  }

  generateUrl(): string {
    return `admin/people/${this.personCurrent.id}/user`;
  }

  assignData(response) {
    const roles = response.data.roles.map((obj) => ({
      ...obj,
      checked: false,
    }));
    this.roles = roles;
  }

  getDataForSendServer(): any {
    const roles = this.getRoles();
    if (this.form.valid && roles.length > 0) {
      const data = {
        ...this.form.value,
        roles: roles,
        person: this.personCurrent.id,
      };
      return data;
    } else {
      SwalService.swalFire({text: 'Faltan datos', icon: 'warning'});
      return null;
    }
  }

  getRoles(): any[] {
    const roles: any = this.roles.filter((x) => x.checked);
    return roles.map((x) => x.id);
  }

  goBack() {
    this.location.back();
  }
}
