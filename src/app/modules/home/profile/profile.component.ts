import { Component, OnInit } from "@angular/core"
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { User } from "../../../class/fast-data"
import { MethodsHttpService } from "../../../services/methods-http.service"
import { StorageService } from "../../../services/storage.service"
import { SwalService } from "../../../services/swal.service"
import { convertFormatDate } from "../../../shared/class/tools"
// import { StandartSearchService } from '../../../services/standart-search.service';
// import { StorageService } from '../../../services/storage.service';
import { User as UserSystem } from "../../../shared/interfaces/user"

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  constructor(private methodsHttp: MethodsHttpService, private storageService: StorageService) {}

  user: UserSystem
  isDisabledForm = true
  cities: { [key: number]: string } = {}
  locations: { [key: number]: string } = {}
  positions: { [key: number]: string } = {}
  sexes: { [key: string]: string } = {}
  types_id: { [key: string]: string } = {}
  isLoading = false

  form: FormGroup = new FormGroup({
    first_name: new FormControl(null, [Validators.required]),
    last_name: new FormControl(null, [Validators.required]),
    identification_type: new FormControl(null, [Validators.required]),
    identification_number: new FormControl(null, [Validators.required]),
    birthday: new FormControl(null, [Validators.required]),
    sex: new FormControl(null, [Validators.required]),
    start_date: new FormControl(null, [Validators.required]),
    department_position_id: new FormControl(null, [Validators.required]),
    location_id: new FormControl(null, [Validators.required]),
    city_id: new FormControl(null, [Validators.required]),
  })

  ngOnInit(): void {
    this.user = User.getUser()
    console.log(this.user)
    this.getInfoForForm()
  }

  fillForm(): void {
    const person = this.user.person
    if (!person) {
      this.isDisabledForm = false
      return
    }
    const {
      first_name,
      last_name,
      identification_type,
      identification_number,
      birthday,
      sex,
      start_date,
      department_position_id,
      location_id,
      city_id,
    } = this.user.person!
    this.form.patchValue({
      first_name,
      last_name,
      identification_type,
      identification_number,
      birthday,
      sex,
      start_date: new Date(start_date),
      department_position_id: department_position_id.toString(),
      location_id: location_id.toString(),
      city_id: city_id.toString(),
    })

    if (this.user.person) {
      this.form.get('identification_type')?.disable();
      this.form.get('identification_number')?.disable();
      this.form.get('birthday')?.disable();
      this.form.get('sex')?.disable();
      this.form.get('start_date')?.disable();
    }
  }

  getInfoForForm(): void {
    this.isLoading = true
    this.methodsHttp.methodGet("user/people/create").subscribe({
      next: (response) => {
        if (!response?.success) {
          return
        }
        const { cities, locations, positions, sexes, id_types } = response.data
        this.cities = cities
        this.locations = locations
        this.positions = positions
        this.sexes = sexes
        this.types_id = id_types
        this.fillForm()
        this.isLoading = false
      },
      error: () => {
        this.isLoading = false
      },
    })
  }

  saveInServer(): void {
    console.log(this.form.value)
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }
    if (this.user.person) {
      this.updatePerson()
    } else {
      this.storePerson()
    }
  }

  updatePerson(): void {
    this.isLoading = true
    this.methodsHttp.methodPut(`admin/people/${this.user?.person?.id}`, this.getFormData()).subscribe({
      next: (response) => {
        this.isLoading = false
        this.user.person = response.data.person
        this.storageService.setCurrentUser(this.user)
        SwalService.swalFire({ icon: "success", text: "Datos guardados correctamente" })
      },
      error: () => {
        this.isLoading = false
      },
    })
  }

  storePerson(): void {
    this.isLoading = true
    this.methodsHttp.methodPost(`user/${this.user.id}/people`, this.getFormData()).subscribe({
      next: () => {
        this.isLoading = false
        SwalService.swalFire({ icon: "success", text: "Datos guardados correctamente" })
      },
      error: () => {
        this.isLoading = false
      },
    })
  }

  getFormData(): FormData {
    const formData = new FormData()
    const data = this.form.getRawValue()
    data.birthday = convertFormatDate(data.birthday)
    data.start_date = convertFormatDate(data.start_date)
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })
    return data
  }
}
