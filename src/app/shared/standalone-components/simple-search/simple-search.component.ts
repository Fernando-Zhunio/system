import { Component, OnInit } from '@angular/core';
import { MethodsHttpService } from '../../../services/methods-http.service';

@Component({
  standalone: true,
  selector: 'app-simple-search',
  templateUrl: './simple-search.component.html',
  styleUrls: ['./simple-search.component.scss']
})
export class SimpleSearchComponent implements OnInit {
  
  constructor(private methodsHttp: MethodsHttpService) { }

  ngOnInit() {
    
  }

}
