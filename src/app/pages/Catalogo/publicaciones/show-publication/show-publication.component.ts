import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iresponse } from '../../../../interfaces/Imports/invoice-item';
import { Ipublication } from '../../../../interfaces/ipublication';
import { StandartSearchService } from '../../../../services/standart-search.service';

@Component({
  selector: 'app-show-publication',
  templateUrl: './show-publication.component.html',
  styleUrls: ['./show-publication.component.css']
})
export class ShowPublicationComponent implements OnInit {

  constructor(private active_router:ActivatedRoute,private s_standart:StandartSearchService) { }

  publication:Ipublication = {} as Ipublication;
  isLoadPublication:boolean = false;
  ngOnInit(): void {
    const id = Number.parseInt(this.active_router.snapshot.paramMap.get("id"));
    this.publication.id = id;
    this.changePublication();
  }

  changePublication(){
    this.isLoadPublication = true;
    this.s_standart.show('catalogs/publications/'+this.publication.id).subscribe((res:Iresponse)=>{
      this.publication = res.data;
      this.isLoadPublication = false;
    },err=>{
      console.log(err);
      this.isLoadPublication = false;
    })
  }

  destroyPublication(event):void{
    console.log(event);
    
  }

}
