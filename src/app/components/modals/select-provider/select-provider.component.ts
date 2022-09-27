import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StandartSearchService } from '../../../services/standart-search.service';

@Component({
  selector: 'app-select-provider',
  templateUrl: './select-provider.component.html',
  styleUrls: ['./select-provider.component.css']
})
export class SelectProviderComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data,private s_standart:StandartSearchService) { }
  providerSearch:String;

  searchBar(){
    this.s_standart.searchOnly('purchase-department/providers/search',this.providerSearch).subscribe(()=>{
    })
  }

}
