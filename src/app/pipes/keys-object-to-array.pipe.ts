import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keysObjectToArray'
})
export class KeysObjectToArrayPipe implements PipeTransform {

  transform(value:Object): any {
    return Object.keys(value);
  }
}
