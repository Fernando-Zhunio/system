import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { StandartSearchService } from "../../../../services/standart-search.service";
import { FormGroup, Validators, FormControl, FormArray } from "@angular/forms";

@Component({
  selector: "app-create-or-edit-work",
  templateUrl: "./create-or-edit-work.component.html",
  styleUrls: ["./create-or-edit-work.component.css"],
})
export class CreateOrEditWorkComponent implements OnInit {
  formWork: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    departtment_position_id: new FormControl(null, [Validators.required]),
    city_id: new FormControl(null, [Validators.required]),
    requiments: new FormArray([]),
    skills: new FormArray([]),
  });
  constructor(
    private actived_router: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private s_standart: StandartSearchService
  ) {}
  state: "create" | "edit" = "create";
  title: string = "Creando Usuario";
  cities = [];
  departments_position = [];
  ngOnInit(): void {
    this.spinner.show();
    this.actived_router.data.subscribe((res) => {
      console.log(res);
      this.state = res.isEdit ? "edit" : "create";
      if (res.isEdit) {
        this.title = "Editando Usuario";
        const id = Number.parseInt(
          this.actived_router.snapshot.paramMap.get("id")
        );
        const url: string = `rrhh/works/${id}`;
        this.s_standart.show(url).subscribe((res1) => {
          if (res1.hasOwnProperty("success") && res1.success) {
            this.spinner.hide();
            this.departments_position = res1.data.departments_position;
            this.cities = res1.data.cities;
            console.log(res1);
          }
        });
      }
    });
  }

  loadDepartments(): void {}

  get requimentsForm(): FormArray {
    return this.formWork.controls["requiments"] as FormArray;
  }

  get skillsForm(): FormArray {
    return this.formWork.controls["skills"] as FormArray;
  }

  addRequeriment(): void {
    const requeriment = new FormControl(null);
    this.requimentsForm.push(requeriment);
  }
  removeFormRequeriement(index): void {
    this.requimentsForm.removeAt(index);
  }

  addSkill(): void {
    const skill = new FormControl(null);
    this.skillsForm.push(skill);
  }
  removeFormSkill(index): void {
    this.skillsForm.removeAt(index);
  }

  onSubmit(): void {
    console.log(this.formWork.value);
  }


}
