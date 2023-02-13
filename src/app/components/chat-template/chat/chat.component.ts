import { ChatService } from './../../../modules/chats/services/chat.service';
import { MethodsHttpService } from './../../../services/methods-http.service';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
  OnDestroy,
  AfterViewInit,
  // ChangeDetectorRef,
  HostListener,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import collect from 'collect.js';
import { FilePondOptions } from 'filepond';
import { Subscription } from 'rxjs';
import autosize from 'autosize';
import { environment } from '../../../../environments/environment';
import { SharedService } from '../../../services/shared/shared.service';
// import { StandartSearchService } from '../../../services/standart-search.service';
// import { StorageService } from '../../../services/storage.service';
import { UsersGroupsChatModalComponent } from '../users-groups-chat-modal/users-groups-chat-modal.component';
import { ChatMessage, Chat } from './../../../interfaces/chats/ichats';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Token, User } from '../../../class/fast-data';


export interface ParticipantChatGroup {
  _id: string;
  id: number;
  info: {
    id: number;
    name: string;
    photo: string;
    position: {
      id: number;
      name: string;
      department_id: number;
    }
  }
  last_seen: string;
  status: 'online' | 'offline';
  type: 'user' | 'group';
}
@Component({ 
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private dialog: MatDialog, 
    private methodHttp: MethodsHttpService, 
    private s_shared: SharedService, 
    private chatService: ChatService,
  ) { }
  @ViewChild('scrollMe') private scrollFrame: ElementRef;
  @ViewChildren('ngfor') ngfor: QueryList<any>;
  @ViewChild('textMessage') textMessage: ElementRef;
  @ViewChild('myPond') myPond: any;
  @Input() chat: Chat;
  // @Input() current_chat_id: string;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Input() myUserId: number;
  @Input() id: string;
  hasFile: boolean = false;
  scrollContainer: any = null;
  sendTyping: boolean = true;
  subscripted: Subscription;
  hasNewMessages: boolean = false;
  page: number = 1;
  notMoreOldMessage: boolean = false;
  // not_bottom: boolean = false;
  disableScroll: boolean = false;
  attachments: { url: any; file: File, type: 'image' }[] = [];
  firstScroll: boolean = true;
  positionScroll: number = 0;
  loadingMessages: boolean = false;
  pondOptions: FilePondOptions = {
    allowMultiple: true,
    labelIdle: 'Arrastre o presione aquí',
    name: 'file',
    maxParallelUploads: 5,
    server: {
      url: `${environment.server}`,
      process: {
        url: 'storage/attachments/upload',
        headers: {
          Authorization: `Bearer ${Token.getToken()}`,
          Accept: 'application/json',
        },
        onload: (response: any) => {
          const data = JSON.parse(response);
          this.sendOneMessage(null, [data?.id]);
          return data.id;
        }
      },
    }
  };
  isActiveWindow: boolean = true;

  user = User.getUser();
  inLineOrWrite: 'En línea' | 'Escribiendo...' = 'En línea';
  participantsJoins = '';
  messages: ChatMessage[] = [];
  

  ngOnInit(): void {

    if (this.chat.data) {
      this.markReadMessage(this.chat.data._id);
      this.loadingMessages = true;
      this.getMessages();
      if (this.chat.data.participants) {
        this.participantsJoins = this.chat.data.participants.filter(x => x.id !== this.user.id).map(x => x.info.name).join(', ');
        // console.log(this.chat?.data?.type)
      }
      this.subscriptionChat();
    }
    autosize(document.querySelectorAll('#textarea-chat'));
  }
  subscriptionChat(): void {
    this.chatService.getChatActive(this.id)!.subscribe((message: ChatMessage) => {
      if (!message) {
        return
      }
      this.messages.push(message);
      this.markReadMessage(this.chat.data._id);
      if (this.isBottomScroll()) {
        this.hasNewMessages = false;
      }
      
    });
  }

  goBackScroll(): void {
    this.scrollContainer.scrollTop = this.scrollContainer.scrollHeight;
  }

  ngOnDestroy() {
    if (this.subscripted) {
      this.subscripted.unsubscribe();
    }
    if (this.subscriptionModal) {
      this.subscriptionModal.unsubscribe();
    }
    this.dialog.closeAll();
  }

  @HostListener('window:focus', ['$event'])
  windowActive(): void {
    this.isActiveWindow = true;
    if (this.chat.id == this.id) {
      this.markReadMessage(this.chat.data._id);
    }
  }

  @HostListener('window:blur', ['$event'])
  windowInactive(_$event): void {
    this.isActiveWindow = false;

  }

  successFiles(_event): void {
    this.hasFile = false;
  }

  getPreviousMessages(): void {
    this.page++;
    this.getMessages();
  }

  trackByMessage(_index, item: ChatMessage): string {
    return item._id;
  }

  getMessages(): void {
    SharedService.disabled_loader = true;
    this.methodHttp
      .methodGet(`chats/${this.chat.data._id}/messages?page=${this.page}`)
      .subscribe((res) => {
        // if (!Array.isArray(this.chat.messages)) {
        //   this.chat.messages = [];
        // }
        // if (goBottom) {
        //   this.not_bottom = true;
        //   const data = res.data.data;
        //   if (data.length <= 0) {
        //     this.notMoreOldMessage = true;
        //   }
        //   this.scrollContainer.scrollTop += 10;
        //   // data.forEach((item) => {
        //   //   this.chat.messages.unshift(item);
        //   // });
        //   this.messages = data
        // } else {
          const data = res.data.data;
          if (data?.length <= 0) {
            this.notMoreOldMessage = true;
            return;
          }
          this.scrollContainer.scrollTop += 10;
          const dataInverse = collect(data).reverse().all() as any;
          this.messages = [...dataInverse, ...this.messages];
        // }
        this.loadingMessages = false;
      });
  }

  // getMessageReconnected(): void {
  //   SharedService.disabled_loader = true;
  //   this.page = 1;
  //   this.methodHttp
  //     .methodGet(`chats/${this.chat.data._id}/messages?page=${this.page}`)
  //     .subscribe((res) => {
  //       this.not_bottom = true;
  //       this.notMoreOldMessage = true;
  //       this.scrollContainer.scrollTop += 10;
  //       const data = collect(res.data.data).reverse().all() as any;
  //       this.messages = data;
  //     }
  //     );
  // }

  typingMessage(): void {
    if (this.sendTyping) {
      SharedService.disabled_loader = true;
      this.sendTyping = false;
      this.methodHttp.methodPut(`chats/${this.chat.id}/typing`, {}).subscribe();
      setTimeout(() => {
        this.sendTyping = true;
      }, 2000);
    }
  }

  addAttachments(event): void {
    Array.from(event.target.files).forEach((file: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.attachments.push({ url: reader.result, file, type: file.type });
      };
      // reader.onerror = function (error) {
      // };
    });
  }

  removeAttach(index): void {
    this.attachments.splice(index, 1);
  }

  isBottomScroll(): boolean {
    return this.scrollContainer.scrollTop + this.scrollContainer.clientHeight >= this.scrollContainer.scrollHeight - 100;
  }

  ngAfterViewInit() {
    this.textMessage.nativeElement.focus();
    this.scrollContainer = this.scrollFrame.nativeElement;
    // this.subscripted = this.ngfor.changes.subscribe((_data) => {
    //   // const hasBottom = this.scrollContainer.scrollTop + this.scrollContainer.clientHeight < this.scrollContainer.scrollHeight - (this.scrollContainer.clientHeight * 2);
    //   // if (hasBottom && !this.firstScroll) {
    //   //   this.hasNewMessages = (!this.not_bottom && !data.last.nativeElement.className.includes('text-right'));
    //   //   this.disableScroll = true;
    //   //   this.positionScroll = this.scrollContainer.scrollTop;
    //   // } else {
    //   //   this.hasNewMessages = false;
    //   //   this.disableScroll = false;
    //   //   this.positionScroll = this.scrollContainer.scrollHeight;
    //   // }
    //   this.changed_detector.detectChanges();
    //   // this.not_bottom = false;
    //   this.firstScroll = false;
    //   if (this.chat.id == this.current_chat_id && this.isActiveWindow) {
    //     this.markReadMessage(this.chat.data._id);
    //   }
    // });
  }

  scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
    this.hasNewMessages = false;
    this.disableScroll = false;
  }

  closeChat(): void {
    this.delete.emit(this.chat.id);
  }

  getPhoto(user): string {
    return SharedService.rediredImageNull(
      user,
      'https://material.angular.io/assets/img/examples/shiba1.jpg'
    );
  }

  onScrollUp(): void {
    this.getPreviousMessages();
  }


  sendMessage($event: any = null): boolean {
    SharedService.disabled_loader = true;
    if ($event) { $event.preventDefault(); }
    const text = this.textMessage.nativeElement.value;
    if (text.trim() === '') {
      return false;
    }
    this.sendOneMessage(text);
    this.textMessage.nativeElement.value = '';
    autosize.update(this.textMessage.nativeElement);
    return false;
  }

  sendOneMessage(text: any, attach_ids: any = null): any {
    const data = {};
    data['message'] = text;
    if (attach_ids) {
      data['attachments_ids'] = attach_ids;
    }
    data['chat_id'] = this.chat.data._id;

    this.methodHttp
      .methodPost(`chats/user/messages`, data)
      .subscribe(() => {
      });
  }

  markReadMessage(chat_id): void {
    SharedService.disabled_loader = true;
    this.methodHttp
      .methodPut(`chats/${chat_id}/mark-read`)
      .subscribe(() => {
        this.chat.data.unread_messages_count = 0;
      });
  }

  subscriptionModal: Subscription;
  openViewUsersGroupModal(): void {
    this.subscriptionModal = this.dialog.open(UsersGroupsChatModalComponent, {
      data: {
        title: this.chat.name,
        participants: this.chat.data.participants.filter(x => x.id != this.myUserId),
        img: this.getPhoto(this.chat?.data?.img ? this.chat?.data?.img : this.chat?.data?.participants ? this.chat?.data?.participants[0]?.info?.photo : null),
        isGroup: this.chat.data.type == 'group', myId: this.myUserId, id_chat: this.chat.data._id,
        admins: this.chat.data.admins,
        is_admin: this.chat.data.owner_is_admin
      }
    }).beforeClosed().subscribe((res) => {
      if (res && typeof res === 'object' && res.state === 'deleted') {
        this.delete.emit(this.chat.id as number);
      }
    });
  }

  downloadResource(file, name, id) {
    const message = this.messages.find(x => x._id == id);
    if (message == undefined) { return; }
    message.files[0]['isload'] = true;
    this.s_shared.download(`storage/attachments?file=${file}`)
      .subscribe((event: HttpEvent<Blob>) => {
        let progress = 0;
        switch (event.type) {
          case HttpEventType.Sent:
            break;
          case HttpEventType.ResponseHeader:
            break;
          case HttpEventType.DownloadProgress:
            progress = Math.round(event.loaded / event.total! * 100);
            message.files[0].progress = progress;
            break;
          case HttpEventType.Response:
            const blob = new Blob([event.body!], { type: 'application/ms-Excel' });
            const urlDownload = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.setAttribute('style', 'display: none');
            a.href = urlDownload;
            a.download = name;
            a.click();
            window.URL.revokeObjectURL(urlDownload);
            a.remove();
            setTimeout(() => {
              message.files[0]['isload'] = false;
              message.files[0].progress = 0;
            }, 1500);

        }
      }, () => { message.files[0]['isload'] = false; });
  }

}
