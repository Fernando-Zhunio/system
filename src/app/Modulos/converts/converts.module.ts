import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertObjectToArrayPipe } from '../../pipes/convert-object-to-array.pipe';



@NgModule({
  declarations: [ConvertObjectToArrayPipe],
  // imports: [
  //   CommonModule
  // ],
  exports:[ConvertObjectToArrayPipe]
})
export class ConvertsModule { }
