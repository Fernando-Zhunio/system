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
  ChangeDetectorRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import collect from 'collect.js';
import { FilePondOptions } from 'filepond';
import { Subscription } from 'rxjs';
import autosize from 'autosize';
import { environment } from '../../../../environments/environment';
import { SharedService } from '../../../services/shared/shared.service';
import { StandartSearchService } from '../../../services/standart-search.service';
import { StorageService } from '../../../services/storage.service';
import { UsersGroupsChatModalComponent } from '../users-groups-chat-modal/users-groups-chat-modal.component';
import { IchatBubble } from './../../../interfaces/chats/ichats';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private dialog: MatDialog, private s_standard: StandartSearchService, private s_storage: StorageService, private s_shared: SharedService, private changed_detector: ChangeDetectorRef) { }
  @ViewChild('scrollMe') private scrollFrame: ElementRef;
  @ViewChildren('ngfor') ngfor: QueryList<any>;
  @ViewChild('textMessage') textMessage: ElementRef;
  @ViewChild('myPond') myPond: any;
  @Input() chat: IchatBubble;
  @Input() current_chat_id: string;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  // @Output() newId: EventEmitter<{old_id: any, new_id: any}> = new EventEmitter();
  @Input() my_id: number;
  hasFile: boolean = false;
  scrollContainer: any = null;
  sendTyping: boolean = true;
  // toggled: boolean = false;
  subscripted: Subscription;
  hasNewMessages: boolean = false;
  page: number = 1;
  notMoreOldMessage: boolean = false;
  not_bottom: boolean = false;
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
          Authorization: `Bearer ${this.s_storage.getCurrentToken()}`,
          Accept: 'application/json',
        },
        onload: (response: any) => {
          const data = JSON.parse(response);
          this.sendOneMessage(null, [data.id]);
          return data.id;
        }
      },
    }
  };

  isActiveWindow: boolean = false;

  ngOnInit(): void {
    if (this.chat.data) {
      this.markReadMessage(this.chat.data._id);
      this.loadingMessages = true;
      this.getMessages();
    }
    autosize(document.querySelectorAll('#textarea-chat'));
    this.windowActive();
  }

  windowActive(): void {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        console.log('Hidden');
        this.isActiveWindow = false;
      } else {
        console.log('SHOWN');
        this.isActiveWindow = true;
        if (this.chat.id == this.current_chat_id) {
          this.markReadMessage(this.chat.data._id);
        }
      }
    });
  }

  successFiles(event): void {
    this.hasFile = false;
  }

  getMessages(goBottom = false): void {
    this.s_standard
      .show(`chats/${this.chat.data._id}/messages?page=${this.page}`)
      .subscribe((res) => {
        if (!Array.isArray(this.chat.messages)) {
          this.chat.messages = [];
        }
        if (goBottom) {
          this.not_bottom = true;
          const data = res.data.data;
          if (data.length <= 0) {
            this.notMoreOldMessage = true;
          }
          this.scrollContainer.scrollTop += 10;
          data.forEach((item) => {
            this.chat.messages.unshift(item);
          });
        } else {
          const data = collect(res.data.data).reverse().all() as any;
          this.chat.messages = this.chat.messages.concat(data);
        }
        this.page++;
        this.loadingMessages = false;
      });
  }

  getMessageReconnected(): void {
    this.page = 1;
    this.s_standard
      .show(`chats/${this.chat.data._id}/messages?page=${this.page}`)
      .subscribe((res) => {
        this.not_bottom = true;
        this.notMoreOldMessage = true;
        this.scrollContainer.scrollTop += 10;
        const data = collect(res.data.data).reverse().all() as any;
        this.chat.messages = data;
      }
      );
  }


  typingMessage(): void {
    if (this.sendTyping) {
      SharedService.disabled_loader = true;
      this.sendTyping = false;
      this.s_standard.updatePut(`chats/${this.chat.id}/typing`, {}).subscribe();
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
      reader.onerror = function (error) {
      };
    });
  }

  removeAttach(index): void {
    this.attachments.splice(index, 1);
  }
  ngAfterViewInit() {
    this.textMessage.nativeElement.focus();
    this.scrollContainer = this.scrollFrame.nativeElement;
    this.subscripted = this.ngfor.changes.subscribe((data) => {
      const hasBottom = this.scrollContainer.scrollTop + this.scrollContainer.clientHeight < this.scrollContainer.scrollHeight - (this.scrollContainer.clientHeight * 2);
      if (hasBottom && !this.firstScroll) {
        this.hasNewMessages = (!this.not_bottom && !data.last.nativeElement.className.includes('text-right'));
        this.disableScroll = true;
        this.positionScroll = this.scrollContainer.scrollTop;
      } else {
        this.hasNewMessages = false;
        this.disableScroll = false;
        this.positionScroll = this.scrollContainer.scrollHeight;
      }
      this.changed_detector.detectChanges();
      // console.log('fer');
      this.not_bottom = false;
      this.firstScroll = false;
      if (this.chat.id == this.current_chat_id && this.isActiveWindow) {
        this.markReadMessage(this.chat.data._id);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscripted) {
      this.subscripted.unsubscribe();
    }
    if (this.suscription_modal) {
      this.suscription_modal.unsubscribe();
    }
    this.dialog.closeAll();
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
    this.getMessages(true);
  }

  handleSelection(event) {
  }

  sendMessage($event = null): boolean {
    if ($event) { $event.preventDefault(); }
    const text = this.textMessage.nativeElement.value;
    if (text.trim() === '') {
      return false;
    }

    //  //! codigo de estres
    //  if(text == 'estres'){
    //    setInterval(() => {
    //     this.sendOneMessage(text);
    //    }, 500);
    //  }




    this.sendOneMessage(text);
    this.textMessage.nativeElement.value = '';
    autosize.update(this.textMessage.nativeElement);
    return false;
  }

  sendOneMessage(text, attach_ids = null): any {
    const data = {};
    data['message'] = text;
    if (attach_ids) {
      data['attachments_ids'] = attach_ids;
    }
    data['chat_id'] = this.chat.data._id;
    // console.log(data);

    this.s_standard
      .store(`chats/user/messages`, data)
      .subscribe((res) => {
        // console.log(res);
      });
    // this.text_message = '';
  }

  markReadMessage(chat_id): void {
    SharedService.disabled_loader = true;
    this.s_standard
      .updatePut(`chats/${chat_id}/mark-read`, {}, false)
      .subscribe((res) => {
        // console.log(res);
        this.chat.data.unread_messages_count = 0;
      });
  }

  suscription_modal: Subscription;
  openViewUsersGroupModal(): void {
    this.suscription_modal = this.dialog.open(UsersGroupsChatModalComponent, {
      data: {
        title: this.chat.name,
        participants: this.chat.data.participants.filter(x => x.id != this.my_id),
        img: this.getPhoto(this.chat?.data?.img ? this.chat?.data?.img : this.chat?.data?.participants ? this.chat?.data?.participants[0]?.info?.photo : null),
        isGroup: this.chat.data.type == 'group', myId: this.my_id, id_chat: this.chat.data._id,
        admins: this.chat.data.admins,
        is_admin: this.chat.data.owner_is_admin
      }
    }).beforeClosed().subscribe((res) => {
      // console.log(res);
      if (res && typeof res === 'object' && res.state === 'deleted') {
        this.delete.emit(this.chat.id as number);
      }
    });
  }

  downloadResource(file, name, id) {
    const message = this.chat.messages.find(x => x._id == id);
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
            progress = Math.round(event.loaded / event.total * 100);
            message.files[0].progress = progress;
            break;
          case HttpEventType.Response:
            const blob = new Blob([event.body], { type: 'application/ms-Excel' });
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
      }, err => { message.files[0]['isload'] = false; });
  }

  // pondHandleInit() {
  //   console.log('FilePond has initialised', this.myPond);
  // }

  // pondHandleAddFile(event: any) {
  //   console.log('A file was added', event);
  // }

  // pondHandleActivateFile(event: any) {
  //   console.log('A file was activated', event);
  // }

  generateParticipantTooltip(participant): string {
    return `<span class="text-truncate p-2">
    <img style="width: 100px;" src="${this.getPhoto(participant?.info?.photo)}" alt="">${participant?.info?.name}
      </span>`;
  }



}
