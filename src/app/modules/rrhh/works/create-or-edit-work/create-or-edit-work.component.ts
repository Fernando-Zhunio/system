import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    expiration_date: new FormControl(null),
    department_position_id: new FormControl(null, [Validators.required]),
    city_id: new FormControl(null, [Validators.required]),
    salary: new FormControl(null),
  });
  constructor(
    private actived_router: ActivatedRoute,
    private s_standart: StandartSearchService,
    private router: Router
  ) { }
  state: 'create' | 'edit' = 'create';
  title: string = 'Creando Empleo';
  cities = [];
  departments_position = [];
  work: Iwork;
  isLoading = false;
  ngOnInit(): void {
    this.isLoading = true;
    this.actived_router.data.subscribe((res) => {
      this.state = res['isEdit'] ? 'edit' : 'create';
      if (res['isEdit']) {
        this.title = 'Editando Empleo';
        const id = Number.parseInt(this.actived_router.snapshot.paramMap.get('id') || '0')  || 0;
        const url = `rrhh/works/${id}`;
        this.s_standart.methodGet(url).subscribe(
          {
            next: (response) => {
              if (response?.success) {
                this.departments_position = response.data.departments_position;
                this.cities = response.data.cities;
                this.work = response.data.work;
                this.loadDataUpdate(this.work);
              }
              this.isLoading = false;
            },
            error: (error) => {
              console.error(error);
              this.isLoading = false;
            }
          }
        );
      }
      else {
        this.title = 'Creando Empleo';
        const url: string = `rrhh/works/create`;
        this.s_standart.methodGet(url).subscribe(
          {
            next: (response) => {
              if (response?.success) {
                this.departments_position = response.data.departments_position;
                this.cities = response.data.cities;
              }
              this.isLoading = false;
            },
            error: (error) => {
              console.error(error);
              this.isLoading = false;
            }
          }
        );
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
    data.skills.forEach((skill: any) => {
      this.addSkill(skill);
    });
    data.requiments.forEach((requeriment: any) => {
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
        this.isLoading = true;
        const url: string = `rrhh/works`;
        this.s_standart.methodPost(url, this.formWork.value).subscribe(
          {
            next: (response) => {
              if (response?.success) {
                this.router.navigate(['/rrhh/works']);
              }
              this.isLoading = false;
            },
            error: (error) => {
              console.error(error);
              this.isLoading = false;
            }
          }
        );
      } else if (this.state == 'edit') {
        this.isLoading = true;
        const url = `rrhh/works/${this.work.id}`;
        this.s_standart.methodPut(url, this.formWork.value).subscribe(
          {
            next: (response) => {
              if (response?.success) {
                this.router.navigate(['/rrhh/works']);
              }
              this.isLoading = false;
            }
          }
        );
      }
    }
  }

  goSearchWorkBack(id): void {
    this.router.navigate(['recursos-humanos/works'], { queryParams: { search: id } });
  }
}
