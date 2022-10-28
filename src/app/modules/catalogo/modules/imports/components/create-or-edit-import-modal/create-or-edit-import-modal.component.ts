import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
import { SharedService } from '../../../../../../services/shared/shared.service';
import { Import } from '../../interfaces/imports';
import { Origin } from '../../interfaces/origin';
import { IMPORT_ROUTE_API_CREATE, IMPORT_ROUTE_API_EDIT } from '../../routes-api/imports-routes-api';

@Component({
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
  ],
  selector: 'app-create-or-edit-import-modal',
  templateUrl: './create-or-edit-import-modal.component.html',
  styleUrls: ['./create-or-edit-import-modal.component.scss']
})
export class CreateOrEditImportModalComponent implements OnInit {

  title: string = 'Creando Importación';
  constructor(private dialogRef: MatDialogRef<CreateOrEditImportModalComponent>,
    private mhs: MethodsHttpService,
    @Inject(MAT_DIALOG_DATA) public externalData: { id?: number, isEdit?: boolean  }) { }

  form: FormGroup = new FormGroup({
    origin_id: new FormControl(null, [Validators.required]),
    sequence_number: new FormControl(null),
    arrival_date: new FormControl(null),
  });
  origins: Origin[] = [];
  isLoading: boolean = false;
  ngOnInit() {
    if (this.externalData?.isEdit) {
      this.title = 'Editando Importación';
      this.editDataImport(this.externalData.id);
      this.form.get('arrival_date')!.setValidators([Validators.required]);
      this.form.get('sequence_number')!.disable();
      this.form.get('origin_id')!.disable();

    } else {
      this.createDataImport();
    }
  }

  editDataImport(id): void {
    this.isLoading = true;
    this.mhs.methodGet(IMPORT_ROUTE_API_EDIT(id))
      .subscribe((response) => {
        if (response.success) {
          const importation: Import = response.data.import;
          this.fillForm(importation);
          this.origins = response.data.origins;
          console.log(this.origins);
          this.isLoading = false;
        }
      });
  }

  fillForm(importation: Import): void {
    this.form.patchValue({
      origin_id: importation.sequence?.import_origin_id,
      sequence_number: importation.sequence?.sequence_number,
      arrival_date: importation?.arrival_date
    });
  }

  createDataImport(): void {
    this.isLoading = true;
    this.mhs.methodGet(IMPORT_ROUTE_API_CREATE)
      .subscribe((response) => {
        if (response.success) {
          this.origins = response.data.origins;
          this.isLoading = false;
        }
      });
  }

  saveInServer(): void {
    if (this.form.valid) {
      const url = this.externalData?.isEdit ? `catalogs/imports/${this.externalData.id}` : 'catalogs/imports';
      const values = this.form.value;
      if (values.arrival_date) {
        values.arrival_date = SharedService.convertDateForLaravelOfDataPicker(values.arrival_date, 'yyyy-MM-dd');
      }
      this.isLoading = true;
      const method = this.externalData?.isEdit ? this.mhs.methodPut(url, values) : this.mhs.methodPost(url, values);
      method.subscribe({
        next: (response) => {
          this.dialogRef.close(response);
          this.isLoading = false;
        },
        error: () => { this.isLoading = false; }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

}
