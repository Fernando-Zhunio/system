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
    console.log(args);

    if (args[0] == 'img' && !value) {
      return 'assets/img/img_not_available.png';
    }
     console.log({value});

    if (value === null || value === undefined) {
      return 'texto vació';
    }

    return value;

  }

}
