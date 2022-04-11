import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-null',
  template: `<div class="row">
    <div class= "col-md-6" >
      <img src="/assets/img/respuesta_vacia.svg" alt = "" width="100%" >
      </div>
      <div class= "col-md-6 font-facebook font-5xl font-italic d-flex align-items-center" >
        Ups! Sin resultados en tu búsqueda
    </div>
  </div>`,
  styleUrls: ['./search-null.component.scss']
})
export class SearchNullComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
