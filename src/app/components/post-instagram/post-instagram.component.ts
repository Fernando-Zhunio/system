import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IinstagramPost } from '../../interfaces/ipost-product';

@Component({
  selector: 'app-post-instagram',
  templateUrl: './post-instagram.component.html',
  styleUrls: ['./post-instagram.component.css']
})
export class PostInstagramComponent implements OnInit {

  constructor() { }
  @Input() post_ig: IinstagramPost;
  isTextTruncate: boolean = true;
  size = 'auto';
  @ViewChild('image') image: ElementRef;
  state_look: 'Ver mas'|'Ver menos' = 'Ver mas';
  ngOnInit(): void {
  }
  verMas(): void{
    this.isTextTruncate = !this.isTextTruncate;
    if (this.isTextTruncate) {
      this.size = 'auto';
      this.state_look = 'Ver mas';

    } else {
      this.size = this.image.nativeElement.offsetHeight + 'px';
      this.state_look = 'Ver menos';
    }
  }
}
