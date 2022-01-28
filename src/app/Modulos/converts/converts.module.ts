import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertObjectToArrayPipe } from '../../pipes/convert-object-to-array.pipe';
import { KeysObjectToArrayPipe } from '../../pipes/keys-object-to-array.pipe';



@NgModule({
  declarations: [ConvertObjectToArrayPipe,KeysObjectToArrayPipe],
  exports:[ConvertObjectToArrayPipe,KeysObjectToArrayPipe]
})
export class ConvertsModule { }
