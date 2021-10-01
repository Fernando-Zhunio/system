import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cperson } from '../../../../../class/cperson';
import { StandartSearchService } from './../../../../../services/standart-search.service';

@Component({
  selector: 'app-modal-assign-user',
  templateUrl: './modal-assign-user.component.html',
  styleUrls: ['./modal-assign-user.component.css']
})
export class ModalAssignUserComponent implements OnInit {

  constructor( private dialogRef: MatDialogRef<ModalAssignUserComponent>, @Inject(MAT_DIALOG_DATA) public data, private s_standart: StandartSearchService) { }
  isloadPersons: boolean = false;
  persons: Cperson[] = [];
  person: Cperson;
  search_person: string;
  ngOnInit(): void {
    console.log(this.data);
  }

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
    console.log(person);
    if (person) {
      this.person = person;
    }
  }

  assignPerson(): void {
    console.log(this.person);
    this.dialogRef.close(this.person);
  }

}
