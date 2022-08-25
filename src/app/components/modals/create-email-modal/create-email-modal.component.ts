import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TYPE_CORP_EMAIL } from '../../../class/cperson';
import { StandartSearchService } from '../../../services/standart-search.service';

@Component({
  selector: 'app-create-email-modal',
  templateUrl: './create-email-modal.component.html',
  styleUrls: ['./create-email-modal.component.css']
})
export class CreateEmailModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {person}, private s_standart: StandartSearchService, private dialogRef: MatDialogRef<CreateEmailModalComponent>) { }

  form_email: FormControl = new FormControl(null, [Validators.required, Validators.email]);
  isLoad: boolean = false;
  ngOnInit(): void {
  }

  saveInServer(): void {
    if (this.form_email.valid) {
      this.isLoad = true;
      this.s_standart.store('admin/people/' + this.data.person.id + '/contact-info', {type: TYPE_CORP_EMAIL, value: this.form_email.value}).subscribe(res => {
        if (res && res.hasOwnProperty('success') && res.success) {
          this.dialogRef.close(res);
        }

      }, () => {this.isLoad = false; });
    }
  }



}
