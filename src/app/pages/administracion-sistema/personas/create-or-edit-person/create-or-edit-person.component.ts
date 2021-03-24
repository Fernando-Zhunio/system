import { formatDate } from "@angular/common";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatHorizontalStepper, MatStepper } from "@angular/material/stepper";
import { ActivatedRoute } from "@angular/router";
import { Cperson } from "../../../../class/cperson";
import { StandartSearchService } from "../../../../services/standart-search.service";

@Component({
  selector: "app-create-or-edit-person",
  templateUrl: "./create-or-edit-person.component.html",
  styleUrls: ["./create-or-edit-person.component.css"],
})
export class CreateOrEditPersonComponent implements OnInit {
  constructor(
    private router_active: ActivatedRoute,
    private s_standart: StandartSearchService
  ) {}

  @ViewChild("photoUserInput") photoUserInput: ElementRef;
  @ViewChild("stepper") stepper: MatHorizontalStepper;
  title: string = "Creando nueva Persona";
  state: "create" | "edit" = "create";
  cities: any = {};
  positions: any = {};
  locations: any = {};
  sexes: any = {};
  id_types: any = {};
  types: any = {};
  person: Cperson = new Cperson();
  isloadperson:boolean = false;
  form_person: FormGroup = new FormGroup({
    first_name: new FormControl(null, [Validators.required]),
    last_name: new FormControl(null, [Validators.required]),
    identification_type: new FormControl(null, [Validators.required]),
    identification_number: new FormControl(null, [Validators.required]),
    birthday: new FormControl(null, [Validators.required]),
    sex: new FormControl(null, [Validators.required]),
    start_date: new FormControl(null, [Validators.required]),
    city_id: new FormControl(null, [Validators.required]),
    department_position_id: new FormControl(null, [Validators.required]),
    location_id: new FormControl(null, [Validators.required]),
  });
  form_data_person: FormGroup = new FormGroup({
    type: new FormControl(null, Validators.required),
    value: new FormControl(null, Validators.required),
  });

  ngOnInit(): void {
    this.router_active.data.subscribe((res) => {
      if (res.isEdit) {
        this.title = "Editando Persona";
        const id = Number.parseInt(
          this.router_active.snapshot.paramMap.get("id")
        );
        const url = "admin/people/" + id + "/edit";
        this.s_standart.show(url).subscribe((response) => {
          console.log(response);
          if (response.hasOwnProperty("success") && response.success) {
            this.setDataDefault(response.data);
          }
        });
      } else {
        this.s_standart.show("admin/people/create").subscribe((response) => {
          console.log(response);
          if (response.hasOwnProperty("success") && response.success) {
            this.setDataDefault(response.data);
          }
        });
      }
    });
  }

  setDataDefault(data): void {
    this.cities = data.cities;
    this.positions = data.positions;
    this.locations = data.locations;
    this.sexes = data.sexes;
    this.id_types = data.id_types;
  }

  isCompletedFormPerson: boolean = false;
  stateStepper: string;
  saveInServerPerson(): void {
    if (this.state == "create") {
      if (this.form_person.valid) {
        this.isloadperson = true;
        let data_send = this.form_person.value;
        if (this.photo) {
          data_send.file = this.photo;
        }
        data_send.birthday = this.s_standart.formatDate(data_send.birthday);
        data_send.start_date = this.s_standart.formatDate(data_send.start_date);
        this.s_standart
          .store("admin/people", { ...data_send })
          .subscribe((res) => {
            if(res.hasOwnProperty('success') && res.success){
              this.person = res.data.person;
              this.types = res.data.types;
              console.log(this.person);
              this.isCompletedFormPerson = true;
              this.stepper.selected.completed = true;
              this.stepper.next();
            }
          },err=>{
            this.isloadperson = false;
          });
      }
      else{
        this.form_person.markAllAsTouched();
      }
    } else {
      // alert('no pase')
    }
  }

  isloadContact:boolean = false;
  infoAndContact = [];

  itemCurrentForEdit:{id:number,type:string,value:string};

  saveInServerInfo():void{
    if(this.stateInfoAndContact == "create"){
      if(this.form_data_person.valid){
        this.isloadContact = true;
        this.s_standart.store('admin/people/'+this.person.id+'/contact-info',{...this.form_data_person.value}).subscribe(res=>{
          console.log(res);
          this.infoAndContact.push(res.data);
          this.isloadContact = false;
          this.asCreateInfo();
        },err=>{
          this.isloadContact = false;
          console.log(err);
        })
      }
    }
    else if(this.stateInfoAndContact == "edit"){
      if(this.form_data_person.valid){
        this.isloadContact = true;
        this.s_standart.updatePut('admin/people/'+this.person.id+'/contact-info/'+this.itemCurrentForEdit.id,{...this.form_data_person.value}).subscribe(res=>{
          this.isloadContact = false;
          console.log(res);
          const index = this.infoAndContact.findIndex(res.data.id);
          this.infoAndContact[index] = res.data;
          this.asCreateInfo()
        },err=>{
          this.isloadContact = false;
          console.log(err);
        })
      }
    }
  }

  getBase64FromFile(img, callback) {
    let fileReader = new FileReader();
    fileReader.addEventListener("load", (evt) => {
      callback(fileReader.result);
    });
    fileReader.readAsDataURL(img);
  }

  photo: any;
  uploadImg(event): void {
    /* Seria usada de la siguiente manera */
    let img: any = event.target.files[0];
    this.getBase64FromFile(img, (base64) => {
      this.photo = base64;
      console.log(base64);
    });
  }

  stateInfoAndContact:'create'|'edit'= 'create';
  editItemCurrent(id):void{
    // if(this.itemCurrentForEdit.id != id){
      this.itemCurrentForEdit = this.infoAndContact.find(x=>x.id == id);
      const {type,value} = this.itemCurrentForEdit;
      this.form_data_person.setValue({type,value})
      this.stateInfoAndContact = 'edit';
    // }
  }

  asCreateInfo(){
    this.stateInfoAndContact = "create";
    this.form_data_person.reset()
  }

  clearPhoto(): void {
    this.photoUserInput.nativeElement.value = "";
    this.photo = null;
  }

  //   goForward(stepper: MatStepper){
  //     stepper.next();
  // }
}
