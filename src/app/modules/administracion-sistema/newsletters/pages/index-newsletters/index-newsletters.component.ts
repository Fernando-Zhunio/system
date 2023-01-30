import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Crud } from '../../../../../class/crud';
import { Inewsletter } from '../../../../../interfaces/inewsletter';
import { MethodsHttpService } from '../../../../../services/methods-http.service';

@Component({
  selector: 'app-index',
  templateUrl: './index-newsletters.component.html',
  styleUrls: ['./index-newsletters.component.css']
})
export class IndexNewLettersComponent extends Crud<Inewsletter>  {

  constructor(protected methodsHttp: MethodsHttpService,
   protected snackBar: MatSnackBar, public router: Router) {
    super();
  }

  newsletters: Map<number, Inewsletter>  = new Map<number, Inewsletter>();

  url = 'admin/newsletter';

  override getData(data: Inewsletter[]) {
    this.newsletters = new Map<number, Inewsletter>( data.map( (item: Inewsletter) => [item.id, item]));
  }

  deleteItem(id: number) {
    this.newsletters.delete(id);
  }


}
