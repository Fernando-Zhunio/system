import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Crud } from '../../../../class/crud';
import { Inewsletter } from '../../../../interfaces/inewsletter';
import { StandartSearchService } from '../../../../services/standart-search.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent extends Crud implements OnInit {

  constructor(standardService: StandartSearchService,
    snackBar: MatSnackBar, private router: Router) {
    super(standardService, snackBar);
  }

  newsletters: Map<number, Inewsletter>  = new Map<number, Inewsletter>();

  url = 'admin/newsletter';

  ngOnInit(): void {
    console.log(this.newsletters);
    
  }

  getData(data: Inewsletter[]) {
    this.newsletters = new Map<number, Inewsletter>( data.map( (item: Inewsletter) => [item.id, item]));
  }

  deleteItem(id: number) {
    console.log({id,new: this.newsletters});
    this.newsletters.delete(id);
  }


}
