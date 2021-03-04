import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IfacebookPost } from '../../interfaces/ipost-product';

@Component({
  selector: 'app-facebook-post',
  templateUrl: './post-facebook.component.html',
  styleUrls: ['./post-facebook.component.css']
})
export class PostFacebookComponent implements OnInit {

  constructor() { }
  @Input() post:IfacebookPost;
  isTextTruncate:boolean = true;
  size = "auto"
  @ViewChild('image') image:ElementRef;
  state_look:'Ver mas'|'Ver menos' = "Ver mas";
  ngOnInit(): void {
  }

  verMas():void{
    this.isTextTruncate = !this.isTextTruncate;
    if(this.isTextTruncate){
      this.size = "auto"
      this.state_look = "Ver mas"

    }
    else{
      this.size = this.image.nativeElement.offsetHeight+"px";
      this.state_look = "Ver menos";
    }
  }

}
