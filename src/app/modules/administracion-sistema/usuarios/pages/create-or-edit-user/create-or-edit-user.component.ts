import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { NgxSpinnerService } from 'ngx-spinner';
import { CreateOrEdit2 } from '../../../../../class/create-or-edit-2';
import { LINK_IMAGE_LETTER } from '../../../../../class/fast-data';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { SwalService } from '../../../../../services/swal.service';
import { SimpleSearchSelectorService } from '../../../../../shared/standalone-components/simple-search/simple-search-selector.service';
import { SearchPersonDialogComponent } from '../../components/search-person-dialog/search-person-dialog.component';
import { Person } from '../../interfaces/user';

export interface Task {
  name: string;
  active: boolean;
  color: ThemePalette;
  child?: Task[];
}
@Component({
  selector: 'app-create-or-edit',
  templateUrl: './create-or-edit-user.component.html',
  styleUrls: ['./create-or-edit-user.component.scss'],
})
export class CreateOrEditUserComponent extends CreateOrEdit2<any> implements OnInit {
  public title: string = 'Usuario - ';
  public urlSave: any = '';
  constructor(
    public methodsHttp: MethodsHttpService,
    public act_router: ActivatedRoute,
    // private ngx_spinner: NgxSpinnerService,
    public router: Router,
    public override location: Location,
    private chs: SimpleSearchSelectorService
  ) {
    super();
  }

  // search_person: string = '';
  personCurrent: Person | null = null;
  // isloadPersons: boolean = false;
  override form: FormGroup = new FormGroup({
    password: new FormControl(''),
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
  roles: any[] = [];
  emails: string[] = [];
  // isSearchPerson = false;
  urlLetter = LINK_IMAGE_LETTER

  ngOnInit(): void {
    this.init();
  }

  override loaderDataForCreate(): void {
    this.methodsHttp.methodGet('admin/users/create').subscribe((response) => {
      this.assignData(response.data.roles);
      // this.ngx_spinner.hide();
    });
  }

  // getPeople($event): void {
  //   this.people = $event.data;
  // }

  openSearchPerson(): void {
    this.chs.openDialog(SearchPersonDialogComponent).beforeClose().subscribe((res) => {
      if (res) {
        this.selectedPerson(res.data);
      }
    });
  }

  selectedPerson(person: Person): void {
    if (person) {
      const emails = person.contact_info.filter((x) => x.type == 'corp_email');
      if (emails.length > 0) {
        this.emails = emails.map((x) => x.value);
        const email = emails[0].value;
        this.form.get('email')?.setValue(email);
        this.personCurrent = person;
      } else {
        SwalService.swalFire({title: 'Error', text: 'El usuario no tiene correo electrónico corporativo', icon: 'error', cancelButtonText: 'Cerrar', confirmButtonText: 'Ir a pagina de la persona '+ person.first_name, showCancelButton: true,   showConfirmButton: true})
        .then(res => {
          if(res.isConfirmed) {
            this.router.navigate(['administracion-sistema/people/'+person.id + '/edit']);
          }
        });
      }
    }
  }

  override generateUrl(): string {
    return `admin/users`;
  }

  assignData(roles_res, roles_assign = []) {
    const roles = roles_res.map((obj) => ({
      ...obj,
      checked: roles_assign.find((x) => x == obj.id) ? true : false,
    }));
    this.roles = roles;
  }

  override getDataForSendServer(): any {
    const roles = this.getRoles();
    if (this.form.valid && roles.length > 0) {
      const data = {
        ...this.form.value,
        roles: roles,
      };
      if (this.status == 'create') {
        data['person_id'] = this.personCurrent?.id;
      }
      return data;
    } else {
      SwalService.swalFire({ text: 'Faltan datos por completar', icon: 'warning' });
      return null;
    }
  }

  getRoles(): any[] {
    const roles: any = this.roles.filter((x) => x.checked);
    return roles.map((x) => x.id);
  }

  override setData(res): void {
    if (this.status == 'edit') {
      this.form.get('email')?.setValue(res.email);
      this.assignData(res.roles, res.user.roles);
      this.personCurrent = res.person;
      if (!this.personCurrent) {
        SwalService.swalFire({title: 'Error', text: 'El usuario no tiene una persona asignada por favor cree una persona con este correo '+ res.user.email +' y luego asigne esta persona a este usuario', icon: 'error', cancelButtonText: 'Cerrar', confirmButtonText: 'Ir a crear persona ', showCancelButton: true,   showConfirmButton: true})
        .then(res => {
          if(res.isConfirmed) {
            this.router.navigate(['administracion-sistema/people/create']);
          }
        });
      } else {
        if (this.personCurrent.contact_info.length > 0) {
          const emails = this.personCurrent.contact_info.filter((x) => x.type == 'corp_email');
          if (emails.length > 0) {
            this.emails = emails.map((x) => x.value);
            const email = this.emails.find(x => x == res.user.email) || null;
            this.form.get('email')?.setValue(email);
          } else {
            SwalService.swalFire({title: 'Error', text: 'El usuario no tiene correo electrónico corporativo o no se a signado una a esta persona', icon: 'error', cancelButtonText: 'Cerrar', confirmButtonText: 'Ir a pagina de la persona '+ this.personCurrent.first_name, showCancelButton: true,   showConfirmButton: true})
          }
        } else if(res.user.email) {
          this.emails.push(res.user.email);

        }
      }

    }
  }

  override go() {
    // SwalService.swalFire({ title: 'Usuario creado', icon: 'success' });
    this.location.back();
  }
}
