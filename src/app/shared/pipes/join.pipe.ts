import { Pipe, PipeTransform } from '@angular/core';

type JoinTypes = 'array' | 'array-object' | 'object';
@Pipe({
  standalone: true,
  name: 'join'
})
export class JoinPipe implements PipeTransform {

  transform(value: any, type: JoinTypes="array-object", key: string = 'name', separator: string=", "  /* args?: any */): any {
    if (type === 'array') {
      return value.join(separator);
    }
    if (type === 'array-object') {
      return value.map((item) => item?.[key]).join(separator);
    }
    if (type === 'object') {
      return Object.values(value).join(separator);
    }
    return '';
  }

}
