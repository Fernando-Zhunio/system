import { Pipe, PipeTransform } from '@angular/core';
import { trans } from '../class/translations';

@Pipe({
  name: 'translatefz'
})
export class TranslatefzPipe implements PipeTransform {

  transform(value: string, ...args: string[]): unknown {
    // console.log(value);
    // console.log(args[0]);
    // console.log(trans(value, 'promotions'));
    args[0] = args[0] || 'default';
    return trans(value, args[0]) || value;
  }

}
