import { Component, OnInit } from '@angular/core';
import { MethodsHttpService } from '../../../services/methods-http.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {

  constructor(private methodHttp: MethodsHttpService) { }

  ngOnInit() {
    this.getStores();
  }
  stores: any = null;

  getStores() {
    const url = 'company/stores/vtex';
    this.methodHttp.methodGet(url).subscribe(
      {
        next: (data: any) => {
          try{
            this.stores = data.data?.properties;
            console.log(this.stores);
          } catch(ex){
            console.log(ex);

          }
        }
      }
    );
  }

}
