import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cperson } from '../../../../../class/cperson';
import { StandartSearchService } from './../../../../../services/standart-search.service';

@Component({
  selector: 'app-modal-assign-user',
  templateUrl: './modal-assign-user.component.html',
  styleUrls: ['./modal-assign-user.component.css']
})
export class ModalAssignUserComponent {

  constructor(private router: Router, private dialogRef: MatDialogRef<ModalAssignUserComponent>, @Inject(MAT_DIALOG_DATA) public data, private s_standart: StandartSearchService) { }
  isloadPersons: boolean = false;
  persons: Cperson[] = [];
  person: Cperson;
  search_person: string;


  searchPerson(): void {
    this.isloadPersons = true;
    this.persons.length = 0;
    this.s_standart
      .show('admin/user/people?search=' + this.search_person)
      .subscribe((res) => {
        if (res.success) {
          this.persons = res.data;
        }
        this.isloadPersons = false;
      });
  }

  captureUser(id): void {
    const person = this.persons.find((x) => x.id === id);
    if (person) {
      this.person = person;
    }
  }

  go(): void {
    if (!this.data.person) {
      this.router.navigate(['/administracion-sistema/usuarios']);
    }
  }

  assignPerson(): void {
    this.dialogRef.close(this.person);
  }

}
