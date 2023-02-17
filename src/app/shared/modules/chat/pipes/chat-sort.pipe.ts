import { Pipe, PipeTransform } from '@angular/core';
import { Chat } from '../types/chat';

@Pipe({
  name: 'chatSort',
  pure: false
})
export class ChatSortPipe implements PipeTransform {

  transform(value: Map<any, Chat>, _args?: any): Chat[] {
    if(value?.size === 0) [];
    const arrSort = Array.from(value.values()).sort((a, b) => {
        if (!a.lastMessage || !b.lastMessage) return 1;
        if (a.lastMessage.created_at > b.lastMessage.created_at) return -1;
        return 1;
    });
    return arrSort;
  }

}
