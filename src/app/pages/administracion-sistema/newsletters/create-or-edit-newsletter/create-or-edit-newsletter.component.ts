import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Inewsletter } from '../../../../interfaces/inewsletter';
import { SharedService } from '../../../../services/shared/shared.service';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { SwalService } from '../../../../services/swal.service';
import { CreateOrEdit } from './../../../../class/create-or-edit';

@Component({
  selector: 'app-create-or-edit-newsletter',
  templateUrl: './create-or-edit-newsletter.component.html',
  styleUrls: ['./create-or-edit-newsletter.component.css']
})
export class CreateOrEditNewsletterComponent extends CreateOrEdit<Inewsletter> implements OnInit {

  constructor(actived_router: ActivatedRoute, standard_service: StandartSearchService, router: Router) {
    super(actived_router, standard_service, router);
  }

  urlEdit = 'admin/newsletter/edit/';
  urlSave = 'admin/newsletter';
  title = 'Novedad del sistema';
  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl(null),
    start_date: new FormControl('', [Validators.required]),
    end_date: new FormControl('', [Validators.required]),
  });
  editorStyle = {
    height: '200px'
  };


  ngOnInit(): void {
    this.init();
  }

  getDataForSendServer() {
    if (this.form.valid) {
      const data = this.form.value;
      data.start_date = SharedService.convertDateForLaravelOfDataPicker(data.start_date);
      data.end_date = SharedService.convertDateForLaravelOfDataPicker(data.end_date);
      return data;
    } else {
      SwalService.swalFire({ text: 'Debe completar todos los campos', icon: 'warning' });
      return null;
    }
  }

  setData(data) {
    this.form.setValue({
      title: data.title,
      description: data.description,
      image: data.image,
      start_date: new Date(SharedService.convertDateForLaravelOfDataPicker(data.start_date)),
      end_date: new Date(SharedService.convertDateForLaravelOfDataPicker(data.end_date)),
    });
  }

  go() {
      this.router.navigate(['/administracion-sistema/newsletter']);
  }

}
