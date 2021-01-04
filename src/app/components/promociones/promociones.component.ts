import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent implements OnInit {

  @Input() promotion;
  constructor() { }

  ngOnInit(): void {
  }

}
