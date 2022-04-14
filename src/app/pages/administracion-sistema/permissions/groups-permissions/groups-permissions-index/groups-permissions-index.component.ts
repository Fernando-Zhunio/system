import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IndexWithMatTable } from '../../../../../class/index-with-mat-table';
import { StandartSearchService } from '../../../../../services/standart-search.service';

@Component({
  selector: 'app-groups-permissions-index',
  templateUrl: './groups-permissions-index.component.html',
  styleUrls: ['./groups-permissions-index.component.css']
})
export class GroupsPermissionsIndexComponent extends IndexWithMatTable<any> implements OnInit {
  displayedColumns: string[];
  permissions: { create: string[]; edit: string[]; destroy: string[]; };
  itemRows: { key: string; title: string; isEditable: boolean; }[];
  url: string = 'admin/groups-permissions';

  constructor(private standard: StandartSearchService, private snack: MatSnackBar, public router: Router, private btnSheet: MatBottomSheet) {
    super(standard, snack, router);
    this.displayedColumns = ['id', 'name', 'slug', 'position', 'actions'];
    this.permissions = {
      create: ['super-admin', 'admin.permissions.create'],
      edit: ['super-admin', 'admin.permissions.edit'],
      destroy: ['super-admin', 'admin.permissions.destroy'],
    };
    this.itemRows = [
      { key: 'id', title: 'Id', isEditable: false },
      { key: 'name', title: 'Nombre', isEditable: true },
      { key: 'slug', title: 'Slug', isEditable: true },
      { key: 'position', title: 'Posición', isEditable: true },
      { key: 'acciones', title: 'Acciones', isEditable: false },
    ];
   }

  ngOnInit(): void {

  }

  creating(): void {
    // alert('creando');
    const scrollModal = document.getElementsByClassName('mat-dialog-content')[0];
    scrollModal.scrollTop = scrollModal.scrollHeight;
  }

}
