import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Iwork } from '../../../../interfaces/JobNovicompu/interfaces-jobNovicompu';

@Component({
  selector: 'app-create-or-edit-work',
  templateUrl: './create-or-edit-work.component.html',
  styleUrls: ['./create-or-edit-work.component.css'],
})
export class CreateOrEditWorkComponent implements OnInit {
  formWork: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    skills: new FormArray([]),
    requiments: new FormArray([]),
    time: new FormControl(null, [Validators.required]),
    expiration_date: new FormControl(null, [Validators.required]),
    department_position_id: new FormControl(null, [Validators.required]),
    city_id: new FormControl(null, [Validators.required]),
    salary: new FormControl(null),
  });
  constructor(
    private actived_router: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private s_standart: StandartSearchService,
    private router: Router
  ) {}
  state: 'create' | 'edit' = 'create';
  title: string = 'Creando Empleo';
  cities = [];
  departments_position = [];
  work: Iwork;
  ngOnInit(): void {
    this.spinner.show();
    this.actived_router.data.subscribe((res) => {
      this.state = res.isEdit ? 'edit' : 'create';
      if (res.isEdit) {
        this.title = 'Editando Empleo';
        // tslint:disable-next-line: radix
        const id = Number.parseInt(
          this.actived_router.snapshot.paramMap.get('id')
        );
        const url = `rrhh/works/${id}`;
        this.s_standart.show(url).subscribe((res1) => {
          if (res1.hasOwnProperty('success') && res1.success) {
            this.spinner.hide();
            this.departments_position = res1.data.departments_position;
            this.cities = res1.data.cities;
            this.work = res1.data.work;

            this.loadDataUpdate(this.work);
          }
        });
      }
      else{
        this.title = 'Creando Empleo';
        const url: string = `rrhh/works/create`;
        this.s_standart.show(url).subscribe((res1) => {
          if (res1.hasOwnProperty('success') && res1.success) {
            this.spinner.hide();
            this.departments_position = res1.data.departments_position;
            this.cities = res1.data.cities;
          }
        });
      }
    });
  }

  get requimentsForm(): FormArray {
    return this.formWork.controls['requiments'] as FormArray;
  }

  get skillsForm(): FormArray {
    return this.formWork.controls['skills'] as FormArray;
  }

  loadDataUpdate(data: Iwork): void {
    this.formWork.patchValue({
      title: data.title,
      description: data.description,
      skills: [],
      requiments: [],
      time: data.time.toString(),
      expiration_date: data.expiration_date,
      department_position_id: data.department_position_id,
      city_id: data.city_id,
    });
    data.skills.forEach((skill) => {
      this.addSkill(skill);
    });
    data.requiments.forEach((requeriment) => {
      this.addRequirement(requeriment);
    });
  }

  addRequirement(data = null): void {
    const requeriment = new FormControl(data);
    this.requimentsForm.push(requeriment);
  }
  removeFormRequeriement(index): void {
    this.requimentsForm.removeAt(index);
  }

  addSkill(data = null): void {
    const skill = new FormControl(data);
    this.skillsForm.push(skill);
  }
  removeFormSkill(index): void {
    this.skillsForm.removeAt(index);
  }

  onSubmit(): void {
  }

  saveOrEditInServer(): void {
    if (this.formWork.valid) {
      if (this.state === 'create') {
        this.spinner.show();
        const url: string = `rrhh/works`;
        this.s_standart.store(url, this.formWork.value).subscribe((res) => {
          if (res.hasOwnProperty('success') && res.success) {
            this.spinner.hide();
            this.goSearchWorkBack(res.data.data.id);
          }
        });
      } else if (this.state == 'edit') {
        this.spinner.show();
        const url = `rrhh/works/${this.work.id}`;
        this.s_standart.updatePut(url, this.formWork.value).subscribe((res) => {
          if (res.hasOwnProperty('success') && res.success) {
            this.spinner.hide();
            this.goSearchWorkBack(this.work.id);
          }
        });
      }
    }
  }

  goSearchWorkBack(id): void {
    this.router.navigate(['recursos-humanos/works'], { queryParams: {search: id} });
  }
}
