import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MercadoLibre } from '../../../../../../interfaces/iml-info';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SwalService } from '../../../../../../services/swal.service';
import { CreateEmailModalComponent } from '../../../../../../components/modals/create-email-modal/create-email-modal.component';

@Component({
  selector: 'app-modal-realist',
  templateUrl: './modal-realist.component.html',
  styleUrls: ['./modal-realist.component.css']
})
export class ModalRealistComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public ml: MercadoLibre, private dialogRef: MatDialogRef<CreateEmailModalComponent>) { }

  form: FormGroup = new FormGroup({
    price: new FormControl(this.ml.price, [Validators.required]),
    quantity: new FormControl(this.ml.stock.initial_quantity, [Validators.required]),
    listing_type_id: new FormControl(this.ml.listing_type_id, [Validators.required]),
  });

  saveInServer() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    } else {
      SwalService.swalToast('Formulario invalido', 'error');
    }
  }

}
