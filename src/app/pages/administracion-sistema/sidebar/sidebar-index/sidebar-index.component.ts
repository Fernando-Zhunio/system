import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Crud } from '../../../../class/crud';
import { IndexWithMatTable } from '../../../../class/index-with-mat-table';
import { StandartSearchService } from '../../../../services/standart-search.service';

@Component({
  selector: 'app-sidebar-index',
  templateUrl: './sidebar-index.component.html',
  styleUrls: ['./sidebar-index.component.css']
})
export class SidebarIndexComponent extends IndexWithMatTable<any> /* Crud<any> */ implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'url', 'icon', 'created_at', 'actions'];
  permissions: { create: string[]; edit: string[]; destroy: string[]; };
  itemRows: { key: string; title: string; isEditable: boolean; }[] = [
    { key: 'id', title: 'Id', isEditable: false },
    { key: 'name', title: 'Nombre', isEditable: false },
    { key: 'url', title: 'Url', isEditable: false },
    { key: 'icon', title: 'Icono', isEditable: false },
    { key: 'created_at', title: 'Creado', isEditable: false },
    { key: 'acciones', title: 'Acciones', isEditable: false }
  ];
  url: string = 'admin/sidebar';

  constructor( s_standard: StandartSearchService, snack: MatSnackBar, router: Router) {
    super(s_standard, snack, router);
  }



  ngOnInit(): void {
  }

  editItem(event): void {
    this.router.navigate(['/administracion-sistema/sidebar/item', event, 'edit']);
  }

  createItem(): void {
    this.router.navigate(['/administracion-sistema/sidebar/item/create']);
  }
}
