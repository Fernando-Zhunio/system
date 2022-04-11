import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NullPipe } from './null.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NullPipe],
  exports: [
    NullPipe
  ]
})
export class NullModule { }
