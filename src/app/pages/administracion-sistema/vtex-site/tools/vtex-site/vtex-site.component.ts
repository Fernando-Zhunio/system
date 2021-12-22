import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SwalService } from '../../../../../services/swal.service';
import { IvtexSite } from './../../../../../interfaces/vtex/ivtex-site';

@Component({
  selector: 'app-vtex-site',
  templateUrl: './vtex-site.component.html',
  styleUrls: ['./vtex-site.component.css']
})
export class VtexSiteComponent implements OnInit {

  constructor() { }
  @Input() vtexSite: IvtexSite;
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
  }

  deleteVtexSite(): void {
    this.delete.emit(this.vtexSite.id);
  }


}
