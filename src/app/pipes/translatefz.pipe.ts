import { Pipe, PipeTransform } from '@angular/core';
import { trans } from '../class/translations';

@Pipe({
  name: 'translatefz'
})
export class TranslatefzPipe implements PipeTransform {

  transform(value: string, ...args: string[]): unknown {
    args[0] = args[0] || 'default';
    return trans(value, args[0]) || value;
  }

}
