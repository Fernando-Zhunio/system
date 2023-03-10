import { type CreateOrEditDialogData } from './../../../../interfaces/create-or-edit-dialog-data';
import { ChatService } from '../../services/chat.service';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import {
  Component,
  OnInit,
  ViewChild,
  // ElementRef,
  OnDestroy,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import collect from 'collect.js';
import { FilePondOptions } from 'filepond';
import { finalize, Subject, takeUntil, type Observable } from 'rxjs';
import autosize from 'autosize';
import { environment } from '../../../../../../environments/environment';
import { SharedService } from '../../../../../services/shared/shared.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Token, User } from '../../../../../class/fast-data';
import { ChatRef } from '../../class/chat-ref';
import { Chat } from '../../types/chat';
import { ChatMessage } from '../../types/chat-message';
import { SwalService } from '../../../../../services/swal.service';
import { CreateOrEditChatGroupComponent } from '../create-or-edit-chat-group/create-or-edit-chat-group.component';
import { StatusCreateOrEdit } from '../../../../enums/status-create-or-edit';
import { checkInView } from '../../../../class/tools';
import { ResponsePaginateApi } from '../../../../interfaces/response-api';
import { ChatScroller } from '../../tools/chat-scroller';


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

interface InfoMessage {
  text: string;
  callback?: () => void;
  isOpen: boolean;
}
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent extends ChatScroller implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private dialog: MatDialog,
    private methodHttp: MethodsHttpService,
    private s_shared: SharedService,
    private chatService: ChatService,
    private chatRef: ChatRef,
  ) {
    super();
    this.chat = this.chatRef.getChat();
    this.myId = User.getUser().id;
  }
  // @ViewChild('textMessage') textMessage: ElementRef;
  @ViewChild('myPond') myPond: any;
  chat: Chat;
  myId: number;
  hasFile: boolean = false;
  sendTyping: boolean = true;
  // hasNewMessages: boolean = false;
  // page: number = 1;
  // notMoreOldMessage: boolean = false;
  // disableScroll: boolean = false;
  attachments: { url: any; file: File, type: 'image' }[] = [];
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
  // elementMessages: HTMLElement;

  textInfo: InfoMessage;
  // forceBackScroll: boolean = false;

  participantsJoins = '';
  messages: ChatMessage[] = [];
  isTyping = false;
  destroy$ = new Subject<boolean>();
  isOpenDetails = false;

  ngOnInit(): void {
    if (this.chat) {
      this.markReadMessage(this.chat.id);
      this.getFirstMessages();
      if (this.chat.participants) {
        this.participantsJoins = this.chat.participants.filter(x => x.id !== this.myId).map(x => x.info.name).join(', ');
      }
      this.subscriptionChat();
    }
    autosize(document.querySelectorAll('#textarea-chat'));
  }

  getFirstMessages(): void {
    this.getMessagesObservable().subscribe({
      next: (response) => {
        this.messages = response.data.data?.reverse();
        this.notMoreOldMessages = response.data.data.length < this.MESSAGES_PER_PAGE;
        this.goBackScroll();
      }, error: () => {
        this.openInfo('No se pudo cargar los mensajes', this.getFirstMessages.bind(this));
      }
    });
  }

  closeInfo(): void {
    this.textInfo = {
      text: '',
      isOpen: false,
    };
    // this.isOpenInfo = false;
  }

  isBottomScroll(): boolean {
    const elementMessages = this.getElementContainerMessages();
    const lastMessageElement = elementMessages?.lastElementChild;
    if (!lastMessageElement) {
      return true;
    }

    return checkInView(elementMessages, lastMessageElement);
  }

  openInfo(text: string, callback?: () => void): void {
    this.textInfo = {
      text,
      callback,
      isOpen: true,
    };
  }

  subscriptionChat(): void {
    this.chatService.getChatOpen(this.chat.id)!.messagesOrTyping$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((message) => {
      if (!message) {
        return
      }
      if (message === 'typing') {
        this.isTyping = true;
        setTimeout(() => {
          this.isTyping = false;
        }, 2000);
        return;
      }
      if (message.event === 'new') {
        const isMyMessage = message.message.author_user_id === this.myId;
        if (isMyMessage) {
          this.addMyMessage(message.message);
        } else {
          this.addNotMyMessage(message.message);
        }
        return;
      }
      const index = this.messages.findIndex(x => x._id === message.id);
      if (index === -1) {
        return;
      }

      if (message.event === 'delivery') {
        this.messages[index].is_delivered_for_all = true;
        return;
      }

      if (message.event === 'read') {
        this.messages[index].is_readed_for_all = true;
        return;
      }

      this.markReadMessage(this.chat.id);
      if (this.isBottomScroll()) {
        this.hasNewMessages = false;
      }
    });
  }

  addMyMessage(message: ChatMessage): void {
    this.messages.push(message);
    this.goBackScroll();
  }

  addNotMyMessage(message: ChatMessage): void {
    this.messages.push(message);
    const elementChat = this.getElementContainerMessages();
    if (!elementChat) return;
    if (this.isBottomScroll()) {
      this.goBackScroll();
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.dialog.closeAll();
  }

  @HostListener('window:focus', ['$event'])
  windowActive(): void {
    this.isActiveWindow = true;
    // if (this.chat.id === this.id) {
    //   this.markReadMessage(this.chat.id);
    // }
  }

  @HostListener('window:blur', ['$event'])
  windowInactive(_$event): void {
    this.isActiveWindow = false;
  }

  successFiles(_event): void {
    this.hasFile = false;
  }

  getMessagesObservable(params = {}): Observable<ResponsePaginateApi<ChatMessage>> {
    SharedService.disabled_loader = true;
    this.openInfo('Cargando mensajes...');
    return this.methodHttp.methodGet(`chats/${this.chat.id}/messages`, params)
    .pipe(finalize(() => this.closeInfo()))
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

  ngAfterViewInit() {
    // this.textMessage.nativeElement.focus();
    // doc
    console.log('E nacido');
  }

  closeChat(_res?: any): void {
    this.chatRef.close();
  }

  delete({ textQuestion, path, cb }: { textQuestion: string, path: string, cb?: (res) => any }): void {
    SwalService
      .swalConfirmation('Eliminar', textQuestion, 'info')
      .then((result) => {
        if (result.isConfirmed) {
          this.methodHttp.methodDelete(path).subscribe((res) => {
            if (cb) {
              cb(res);
            }
          });
        }
      });
  }

  deleteChat() {
    this.delete({
      textQuestion: 'Seguro que desea eliminar este chat?',
      path: `chats/users/${this.chat.id}`,
      cb: this.closeChat.bind(this)
    })
  }

  deleteParticipant(participantId): void {
    this.delete({
      textQuestion: 'Seguro que desea eliminar este participante?',
      path: `chats/groups/${this.chat.id}/participants/${participantId}`,
      cb: (res) => {
        if (!res?.success) {
          return;
        }
        this.chat.participants = this.chat.participants?.filter(p => p.id != participantId);
        SwalService.swalFire({ icon: 'success', title: 'Eliminado', text: 'Esta participante a sido eliminado con éxito' });
      }
    })
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

  getPhoto(user): string {
    return SharedService.rediredImageNull(
      user,
      'https://material.angular.io/assets/img/examples/shiba1.jpg'
    );
  }

  markReadMessage(chat_id): void {
    SharedService.disabled_loader = true;
    this.methodHttp
      .methodPut(`chats/${chat_id}/mark-read`)
      .subscribe(() => {
        this.chat.unreadMessages = 0;
      });
  }

  openEditGroup(): void {
    const data: CreateOrEditDialogData = {
      status: StatusCreateOrEdit.Edit,
      id: this.chat.id
    }
    this.dialog.open(CreateOrEditChatGroupComponent, {
      data
    });
  }

  sendMessage(message: string | File ): void {
    if (!message || (typeof message === 'string' && message.trim() === '')) { return }

    // console.log(event);
    return
    // SharedService.disabled_loader = true;
    // if (event) { event.preventDefault(); }
    // const text = this.textMessage.nativeElement.value;
    // if (text.trim() === '') {
    //   return false;
    // }
    // this.sendOneMessage(text);
    // this.textMessage.nativeElement.value = '';
    // autosize.update(this.textMessage.nativeElement);
    // return false;
  }

  sendFile(file: File): void {
    const formData = new FormData();
    formData.append('file', file);
    this.methodHttp
      .methodPost(`chats/user/attachments`, formData)
      .subscribe(() => {
      });
  }

  sendText(text: string): void {
    this.sendOneMessage(text);
  }

  sendOneMessage(text: any, attach_ids: any = null): any {
    const data = {};
    data['message'] = text;
    if (attach_ids) {
      data['attachments_ids'] = attach_ids;
    }
    data['chat_id'] = this.chat.id;

    this.methodHttp
      .methodPost(`chats/user/messages`, data)
      .subscribe(() => {
      });
  }

  trackByMessage(_index, item: ChatMessage): string {
    return item._id;
  }
}
