import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { NgxSpinner } from "ngx-spinner/lib/ngx-spinner.enum";
import { Cperson, TYPE_CORP_EMAIL } from "../../../../class/cperson";
import { CreateEmailModalComponent } from "../../../../components/modals/create-email-modal/create-email-modal.component";
import { IuserSystem } from "../../../../interfaces/iuser-system";
import { StandartSearchService } from "../../../../services/standart-search.service";
import { SwalService } from "../../../../services/swal.service";

export interface Task {
  name: string;
  active: boolean;
  color: ThemePalette;
  child?: Task[];
}
@Component({
  selector: "app-create-or-edit",
  templateUrl: "./create-or-edit.component.html",
  styleUrls: ["./create-or-edit.component.css"],
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

  //  myControl = new FormControl();
  search_person: string = "";
  persons: Cperson[] = [];
  person_current: Cperson = null;
  isloadPersons: boolean = false;
  form_user: FormGroup = new FormGroup({
    // name: new FormControl("", [Validators.required]),
    // email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", [Validators.pattern(this.regex)]),
    email: new FormControl("", [Validators.required]),
    // city: new FormControl("", [Validators.required]),
    // position: new FormControl("", [Validators.required]),
    // location: new FormControl("", [Validators.required]),
    // sexes: new FormControl("", [Validators.required]),
  });

  // companies: [] = [];
  roles: [] = [];
  sexes = {};
  locations = [];
  cities = [];
  positions = [];
  title: string = "Creando Usuario";
  userCurrent: IuserSystem;

  companies: Task = {
    name: "Todas las empresas",
    active: false,
    color: "primary",
    child: [],
  };

  allComplete: boolean = false;
  // indeterminateAll:boolean = false;
  updateAllComplete() {
    this.allComplete =
      this.companies.child != null &&
      this.companies.child.every((t) => t.active);
    // console.log("updateAllcomplete");
  }

  someComplete(): boolean {
    if (this.companies.child == null) {
      return false;
    }
    // console.log("someComplete");
    return (
      this.companies.child.filter((t) => t.active).length > 0 &&
      !this.allComplete
    );
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    console.log(this.allComplete);
    this.companies.child.forEach((t) => (t.active = completed));
  }

  // return  && !this.allComplete;

  state: "create" | "edit" = "create";
  ngOnInit(): void {
    this.ngx_spinner.show();
    this.act_router.data.subscribe((res) => {
      this.state = res.isEdit ? "edit" : "create";
      console.log(res);
      if (res.isEdit) {
        this.title = "Editando Usuario";
        const id = Number.parseInt(this.act_router.snapshot.paramMap.get("id"));
        const url = "admin/users/" + id + "/edit";
        this.s_standart.show(url).subscribe((response) => {
          console.log(response);
          // this.cities = response.data.cities;
          this.userCurrent = response.data.user;
          this.person_current = response.data.person;
          // this.sexes = response.data.sexes;

          ////#region transform companies
          let companies = response.data.companies.map((obj) => ({
            ...obj,
            active: false,
          }));
          this.userCurrent.companies.forEach((obj) => {
            companies.find((x) => x.id == obj).active = true;
          });
          this.companies.child = companies;
          ////#endregion

          ////#region transform Position
          // let positions = response.data.positions;
          // Object.keys(positions).map((key) => {
          //   this.positions.push({
          //     id: Number.parseInt(key),
          //     name: positions[key],
          //   });
          //   return key;
          // });
          // console.log(this.positions);
          ////#endregion

          // let locations = response.data.locations;
          // Object.keys(locations).map((key) => {
          //   this.locations.push({
          //     id: Number.parseInt(key),
          //     name: locations[key],
          //   });
          //   return key;
          // });

          //#region transform Roles
          let roles = response.data.roles.map((obj) => ({
            ...obj,
            active: false,
          }));
          this.userCurrent.roles.forEach((obj) => {
            roles.find((x) => x.id == obj).active = true;
          });
          this.roles = roles;
          //#endregion

          // this.form_user.controls["name"].setValue(this.userCurrent.name);
          // this.form_user.controls["email"].setValue(this.userCurrent.email);
          // this.form_user.controls["city"].setValue(
          //   this.userCurrent.info?.city_id || null
          // );
          // this.form_user.controls["position"].setValue(
          //   this.userCurrent.info?.department_position_id
          // );
          // this.form_user.controls["location"].setValue(
          //   this.userCurrent.info?.location_id
          // );
          // this.form_user.controls["sexes"].setValue(this.userCurrent.info?.sex);

          // this.form_user.controls["roles[]"].setValue(this.userCurrent.roles);
          this.ngx_spinner.hide();
        });
      } else {
        this.title = "Creando Usuario";
        this.s_standart.show("admin/users/create").subscribe((response) => {
          this.assignData(response);
          this.ngx_spinner.hide();
        });
      }
    });
  }

  searchPerson(): void {
    this.isloadPersons = true;
    this.persons.length = 0;
    this.s_standart
      .show("admin/user/people?search=" + this.search_person)
      .subscribe((res) => {
        if (res.success) {
          this.persons = res.data;
          console.log(this.persons);
        }
        this.isloadPersons = false;
      });
  }

  assignData(response) {
    // this.cities = response.data.cities;
    // this.sexes = response.data.sexes;
    let companies = response.data.companies.map((obj) => ({
      ...obj,
      active: false,
    }));
    this.companies.child = companies;
    // let positions = response.data.positions;
    // Object.keys(positions).map((key) => {
    //   this.positions.push({ id: Number.parseInt(key), name: positions[key] });
    //   return key;
    // });
    // let locations = response.data.locations;
    // Object.keys(locations).map((key) => {
    //   this.locations.push({ id: Number.parseInt(key), name: locations[key] });
    //   return key;
    // });

    let roles = response.data.roles.map((obj) => ({
      ...obj,
      active: false,
    }));
    this.roles = roles;
  }

  saveInServer(): void {
    if (this.state == "create") {
      let data = this.captureData();
      if (data) {
        this.ngx_spinner.show();
        console.log(data);
        this.s_standart.store("admin/users", data).subscribe((res) => {
          console.log(res);
          this.ngx_spinner.hide();
          this.route.navigate(["administracion-sistema/usuarios"]);
        });
      }
    } else {
      if (this.state == "edit") {
        let data = this.captureData();
        if (data) {
          console.log(data);
          this.s_standart
            .updatePut("admin/users/" + this.userCurrent.id, data)
            .subscribe((res) => {
              console.log(res);
              this.ngx_spinner.hide();
              this.route.navigate(["administracion-sistema/usuarios"]);
            });
        }
      }
    }
  }

  captureData() {
    if (this.form_user.invalid) {
      // this.form_user;
      this.form_user.markAllAsTouched();
      SwalService.swalToast("Tiene campos por llenar", "warning");
      return false;
    }
    let IdsRoles = this.roles
      .filter((x: any) => x.active == true)
      .map((obj: any) => obj.id);
    // console.log({roles:IdsRoles,companies:IdsCompany,...this.form_user.value});

    if (IdsRoles.length < 1) {
      SwalService.swalToast("Asigne un rol al nuevo usuario", "warning");
      return false;
    }
    let IdsCompany = this.companies.child
      .filter((x: any) => x.active == true)
      .map((obj: any) => obj.id);
    if (IdsCompany.length < 1) {
      SwalService.swalToast("Asigne una compañia al nuevo usuario", "warning");
      return false;
    }

    return {
      person_id: this.person_current.id,
      roles: IdsRoles,
      companies: IdsCompany,
      ...this.form_user.value,
    };
    // console.log('roles', IdsRoles);
    // console.log('companies', IdsCompany);
    console.log("form", this.form_user.value);
  }

  captureUser(id): void {
    const person = this.persons.find((x) => x.id === id);
    if (person) {
      console.log(person);
      if (person.contact_info?.length > 0) {
        let value_person = Object.values(person.contact_info);
        const person_key_coorp = value_person.find((x) => x == TYPE_CORP_EMAIL);
        // console.log({ person_key_coorp, value_person });
        const emails_coorp = value_person.find(
          (x) => x["type"] == TYPE_CORP_EMAIL
        );
        if (emails_coorp) {
          // SwalService.swalToast("si posee Correo institucional");
          this.person_current = person;
          console.log(emails_coorp["value"]);

          this.form_user.controls["email"].setValue(emails_coorp["value"]);
        } else {
          // this.dialog.open(CreateEmailModalComponent, {
          //   data: { id },
          //   disableClose: true,
          // });
          // SwalService.swalToast("no posee Correo institucional");
          this.getEmailCoorpForThisUser(person);
        }
      } else {
        this.getEmailCoorpForThisUser(person)
      }
    }
  }

  getEmailCoorpForThisUser(person:Cperson):void{
    this.dialog.open(CreateEmailModalComponent, {
      data: { person},
      disableClose: true,
    }).beforeClosed().subscribe(res=>{
      if(res && res.hasOwnProperty("success") && res.success){
        person.contact_info = [res.data]
        this.form_user.controls["email"].setValue(res.data.value);
        this.person_current = person
      }
    });
    SwalService.swalToast("No posee Correo coorporativo","error");
  }

  goBack() {
    this.location.back();
  }
}
