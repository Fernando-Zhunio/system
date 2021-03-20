import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertObjectToArray'
})
export class ConvertObjectToArrayPipe implements PipeTransform {

  transform(value:any = []): any {
    // return null;
    return Object.values(value);
  }

}
