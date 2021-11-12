import { Pipe, PipeTransform } from '@angular/core';
import  marked  from 'marked';




@Pipe({
  name: 'markdwon'
})
export class MarkdwonPipe implements PipeTransform {

  transform(value: any, args?: any[]): any {
    if (value && value.length > 0) {
      // console.log(marked);
      // return value;
      return marked.parse(value);
    }
    return  value;
  }

}
