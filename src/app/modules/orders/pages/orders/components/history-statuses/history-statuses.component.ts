import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IStatus } from '../../../../../../interfaces/iorder';

@Component({
  selector: 'app-history-statuses',
  templateUrl: './history-statuses.component.html',
  styleUrls: ['./history-statuses.component.scss']
})
export class HistoryStatusesComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public dataExternal: {list: IStatus[], title: string}) { }

  ngOnInit() {
  }

}
