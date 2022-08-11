import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cperson } from '../../../../class/cperson';
import { CreateOrEdit2 } from '../../../../class/create-or-edit-2';
import { MethodsHttpService } from '../../../../services/methods-http.service';
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
  constructor(
    public methodsHttp: MethodsHttpService,
    public act_router: ActivatedRoute,
    private ngx_spinner: NgxSpinnerService,
    public router: Router,
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
  emails = [];
  isSearchPerson = false;

  ngOnInit(): void {
    this.init();
  }

  loaderDataForCreate(): void {
    this.methodsHttp.methodGet('admin/users/create').subscribe((response) => {
      this.assignData(response.data.roles);
      this.ngx_spinner.hide();
    });
  }



  getPeople($event): void {
    this.people = $event.data;
  }

  selectedPerson(id): void {
    const person = this.people.find((x) => x.id == id);
    if (person) {
      const emails = person.contact_info.filter((x) => x.type == 'corp_email');
      if (emails.length > 0) {
        this.emails = emails.map((x) => x.value);
        const email = emails[0].value;
        this.form.get('email').setValue(email);
        this.personCurrent = person;
      } else {
        SwalService.swalFire({title: 'Error', text: 'El usuario no tiene correo electrónico corporativo', icon: 'error', cancelButtonText: 'Cerrar', confirmButtonText: 'Ir a pagina de la persona '+ person.first_name, showCancelButton: true,   showConfirmButton: true})
        .then(res => {
          if(res.isConfirmed) {
            this.router.navigate(['administracion-sistema/personas/edit/'+person.id]);
          }
        });
      }
      this.isSearchPerson = false;
    }
  }

  generateUrl(): string {
    return `admin/users`;
  }

  assignData(roles_res, roles_assign = []) {
    const roles = roles_res.map((obj) => ({
      ...obj,
      checked: roles_assign.find((x) => x == obj.id) ? true : false,
    }));
    this.roles = roles;
  }

  getDataForSendServer(): any {
    const roles = this.getRoles();
    if (this.form.valid && roles.length > 0) {
      const data = {
        ...this.form.value,
        roles: roles,
        // person_id: this.personCurrent.id,
      };
      if (this.status == 'create') {
        data['person_id'] = this.personCurrent.id;
      }

      return data;
    } else {
      SwalService.swalFire({ text: 'Faltan datos', icon: 'warning' });
      return null;
    }
  }

  getRoles(): any[] {
    const roles: any = this.roles.filter((x) => x.checked);
    return roles.map((x) => x.id);
  }

  setData(res): void {
    if (this.status == 'edit') {
      this.form.get('email').setValue(res.email);
      this.assignData(res.roles, res.user.roles);
      this.personCurrent = res.person;
      if (!this.personCurrent) {
        SwalService.swalFire({title: 'Error', text: 'El usuario no tiene una persona asignada por favor cree una persona con este correo '+ res.user.email +' y luego asigne esta persona a este usuario', icon: 'error', cancelButtonText: 'Cerrar', confirmButtonText: 'Ir a crear persona ', showCancelButton: true,   showConfirmButton: true})
        .then(res => {
          if(res.isConfirmed) {
            this.router.navigate(['administracion-sistema/personas/create']);
          }
        });
      } else {
        if (this.personCurrent.contact_info.length > 0) {
          const emails = this.personCurrent.contact_info.filter((x) => x.type == 'corp_email');
          if (emails.length > 0) {
            this.emails = emails.map((x) => x.value);
            const email = this.emails.find(x => x == res.user.email) || null;
            this.form.get('email').setValue(email);
          } else {
            SwalService.swalFire({title: 'Error', text: 'El usuario no tiene correo electrónico corporativo o no se a signado una a esta persona', icon: 'error', cancelButtonText: 'Cerrar', confirmButtonText: 'Ir a pagina de la persona '+ this.personCurrent.first_name, showCancelButton: true,   showConfirmButton: true})
          }
        }
      }

    }
  }


  go() {
    // SwalService.swalFire({ title: 'Usuario creado', icon: 'success' });
    this.location.back();
  }
}
