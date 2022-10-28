import { Component, Input, OnInit } from '@angular/core';
import { IMPORT_ROUTE_API_INDEX } from '../../../imports/routes-api/imports-routes-api';

@Component({
  selector: 'app-search-import-dialog',
  templateUrl: './search-import-dialog.component.html',
  styleUrls: ['./search-import-dialog.component.css']
})
export class SearchImportDialogComponent implements OnInit {

  @Input() url: string = IMPORT_ROUTE_API_INDEX;
  @Input() onlyOne: boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
