import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IndexWithMatTable } from '../../../../class/index-with-mat-table';
import { StandartSearchService } from '../../../../services/standart-search.service';

interface IVersionApp {
  id: number;
  version: string;
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
@Component({
  selector: 'app-version-index',
  templateUrl: './version-index.component.html',
  styleUrls: ['./version-index.component.css']
})
export class VersionIndexComponent extends IndexWithMatTable<any> implements OnInit {
  displayedColumns: string[];
  permissions: { create: string[]; edit: string[]; destroy: string[]; };
  itemRows: { key: string; title: string; isEditable: boolean; }[];
  url: string = 'version-frontend';

  constructor( s_standard: StandartSearchService, snackbar: MatSnackBar, router: Router) { 
    super( s_standard, snackbar, router );
  }

  ngOnInit(): void {
  }

}
