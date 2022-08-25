import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IndexWithMatTable } from '../../../../class/index-with-mat-table';
import { StandartSearchService } from '../../../../services/standart-search.service';

@Component({
  selector: 'app-version-index',
  templateUrl: './version-index.component.html',
  styleUrls: ['./version-index.component.css']
})
export class VersionIndexComponent extends IndexWithMatTable<any> implements OnInit {
  displayedColumns: string[] = ['id', 'version', 'description', 'actions'];
  permissions: { create: string[]; edit: string[]; destroy: string[]; };
  itemRows: { key: string; title: string; isEditable: boolean; }[] = [
    { key: 'id', title: 'Id', isEditable: false },
    { key: 'version', title: 'Version', isEditable: true },
    { key: 'description', title: 'Descripción', isEditable: true },
    { key: 'created_at', title: 'Creado', isEditable: false },
    { key: 'acciones', title: 'Acciones', isEditable: false },
  ];
  url: string = 'admin/version-frontend';

  constructor( s_standard: StandartSearchService, snackbar: MatSnackBar, router: Router) {
    super( s_standard, snackbar, router );
  }

  ngOnInit(): void {
  }

}
