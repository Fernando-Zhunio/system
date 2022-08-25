import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Iimportation } from '../../interfaces/Imports/invoice-item';
import { StandartSearchService } from '../../services/standart-search.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  @Input() import: Iimportation;
  @Output() delete: EventEmitter<Iimportation> = new EventEmitter();
  isLoad: boolean = false;
  permissions_component: {show: string, edit: string, destroy: string} = {
    show: "purchase-department.imports.show",
    edit: "purchase-department.imports.edit",
    destroy: "purchase-department.imports.destroy"
  }
  constructor(private router: Router , private s_standart: StandartSearchService) { }

  ngOnInit(): void {
  }


  destroyImport() {
    this.isLoad = true;
    const url = `purchase-department/imports/${this.import.id}`;
    this.s_standart.destory(url).subscribe((res: {success: boolean, data: Iimportation}) => {
      if (res.success) {
        this.delete.emit(res.data);
        this.isLoad = false;
      }
    }, () => {
      this.isLoad = false;
    });
  }

  goEdit(): void {
    this.router.navigate(['importaciones/edit/' + this.import.id]);
  }

}
