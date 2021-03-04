import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'ngx-moment';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { PostFacebookComponent } from '../components/post/post-facebook.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PostInstagramComponent } from '../components/post-instagram/post-instagram.component';




@NgModule({
  declarations: [PostFacebookComponent,PostInstagramComponent],
  imports: [
    MatCardModule,
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    CarouselModule
   
  ],
  exports: [PostFacebookComponent,PostInstagramComponent ]
})
export class PostModule { }
