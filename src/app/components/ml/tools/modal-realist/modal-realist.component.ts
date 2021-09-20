import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImlInfo } from '../../../../interfaces/iml-info';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SwalService } from '../../../../services/swal.service';
import { CreateEmailModalComponent } from '../../../modals/create-email-modal/create-email-modal.component';

@Component({
  selector: 'app-modal-realist',
  templateUrl: './modal-realist.component.html',
  styleUrls: ['./modal-realist.component.css']
})
export class ModalRealistComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public ml: ImlInfo, private dialogRef: MatDialogRef<CreateEmailModalComponent>) { }

  form: FormGroup = new FormGroup({
    price: new FormControl(this.ml.price, [Validators.required]),
    quantity: new FormControl(this.ml.stock.initial_quantity, [Validators.required]),
    listing_type_id: new FormControl(this.ml.listing_type_id, [Validators.required]),
  });
  ngOnInit(): void {
    console.log(this.ml.name);

  }

  saveInServer() {
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('valid');
      this.dialogRef.close(this.form.value);
    } else {
      console.log('invalid');
      SwalService.swalToast('Formulario invalido', 'error');
    }
  }

}
