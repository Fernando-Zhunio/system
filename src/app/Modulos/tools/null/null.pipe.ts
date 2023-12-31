import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullFz'
})
export class NullPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      args = [];
      args[0] = 'default';
    }
    if (args[0] == 'img' && !value) {
      return 'assets/img/img_not_available.png';
    }
    if (value === null || value === undefined) {
      return 'texto vacío';
    }

    return value;

  }

}
