import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatefzPipe } from '../../pipes/translatefz.pipe';



@NgModule({
  declarations: [TranslatefzPipe],
  exports: [TranslatefzPipe]
})
export class TranslatefzModule { }
