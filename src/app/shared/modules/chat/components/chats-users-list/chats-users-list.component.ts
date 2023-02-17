// import { UserChatSearch } from './../../../../../interfaces/chats/ichats';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, Observable, switchMap } from 'rxjs';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import type { ChatUserSearch } from '../../types/chat-tools';

@Component({
  selector: 'app-chats-users-list',
  templateUrl: './chats-users-list.component.html',
  styleUrls: ['./chats-users-list.component.scss']
})
export class ChatsUsersListComponent implements OnInit {

  @Output() openChatEmit= new EventEmitter<number>();
  constructor(private methodsHttp: MethodsHttpService) { }
  formSearch = new FormControl(null);
  isLoading = false;
  users: ChatUserSearch[] = [];
  page = 1;
  ngOnInit() {
    this.formSearch.valueChanges
    .pipe(
      debounceTime(500),
      switchMap(search => 
        this.searchUsersObservable(search)
      )
    )
    .subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.data.data?.length === 0) {
          if (this.page === 1) {
            this.users = [];
          }
          return;
        }
        const users: ChatUserSearch[] =  response.data.data.map(user => {
          
            const { connected, id, name, person, } = user;
            const _name = person ? `${person.first_name} ${person.last_name}` : name;
            return { connected, id, name: _name, person,}
        })
        this.users = users;
      },
      error: () => {
        this.isLoading = false;
      },
    })
  }

  searchUsersObservable(search): Observable<any> {
    this.isLoading = true;
    return this.methodsHttp
    .methodGet('chats',{search, page: this.page, pageSize: 300})
  }

  searchNow() {
    this.formSearch.updateValueAndValidity();
  }

  trackByUser(_index, user: ChatUserSearch): number {
    return user.id
  }

  openChatEmitFn(userId: number): void {
    this.openChatEmit.emit(userId);
  }

}
