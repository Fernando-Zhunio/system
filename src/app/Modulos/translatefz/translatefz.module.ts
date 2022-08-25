import { NgModule } from '@angular/core';
import { TranslatefzPipe } from '../../pipes/translatefz.pipe';

@NgModule({
  declarations: [TranslatefzPipe],
  exports: [TranslatefzPipe]
})
export class TranslatefzModule { }
