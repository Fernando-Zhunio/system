import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Crud } from '../../../../../class/crud';
import { INewsLetter } from '../../types/newsletter';
import { MethodsHttpService } from '../../../../../services/methods-http.service';

@Component({
  selector: 'app-index',
  templateUrl: './index-newsletters.component.html',
  styleUrls: ['./index-newsletters.component.css']
})
export class IndexNewLettersComponent extends Crud<INewsLetter>  {

  constructor(protected methodsHttp: MethodsHttpService,
   protected snackBar: MatSnackBar, public router: Router) {
    super();
  }

  newsletters: Map<number, INewsLetter>  = new Map<number, INewsLetter>();

  url = 'admin/newsletter';

  override getData(e: {data: {data: INewsLetter[]}}) {
    console.log(e)
    const data = e.data.data;
    this.newsletters = new Map<number, INewsLetter>( data.map( (item: INewsLetter) => [item.id, item]));
  }

  deleteItem(id: number) {
    this.newsletters.delete(id);
  }


}
