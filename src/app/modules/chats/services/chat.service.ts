import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class ChatService {

constructor() { }

chatsActive = new Map<string, Subject<any>>();

getChatActive(id: string): Subject<any> | null {
  if (!this.chatsActive.has(id)) {
    return null
  }
  return this.chatsActive.get(id) as Subject<any>;
}

hasChatActive(id: string) {
  return this.chatsActive.has(id);
}

setChatActive(id: string, data: any) {
  if (this.hasChatActive(id)) {
    this.getChatActive(id)?.next(data);
  }
  this.chatsActive.set(id, new Subject<any>());
  
}

  
}
