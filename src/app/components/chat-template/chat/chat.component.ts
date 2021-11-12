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
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import collect from 'collect.js';
import { FilePondOptions } from 'filepond';
import { forkJoin, Subscription } from 'rxjs';
import autosize from 'autosize';
import { environment } from '../../../../environments/environment';
import { SharedService } from '../../../services/shared/shared.service';
import { StandartSearchService } from '../../../services/standart-search.service';
import { StorageService } from '../../../services/storage.service';
import { UsersGroupsChatModalComponent } from '../users-groups-chat-modal/users-groups-chat-modal.component';
import { IuserChat } from './../../../interfaces/chats/ichats';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  constructor(private dialog: MatDialog, private s_standart: StandartSearchService, private s_storage: StorageService, private s_shared: SharedService) { }
  @ViewChild('scrollMe') private scrollFrame: ElementRef;
  @ViewChildren('ngfor') ngfor: QueryList<any>;
  @ViewChild('textMessage') textMessage: ElementRef;
  @ViewChild('myPond') myPond: any;
  @Input() userchat: IuserChat;
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Input() my_id: number;
  hasFile: boolean = false;
  scrollContainer: any = null;
  toggled: boolean = false;
  suscripted: Subscription;
  hasNewMessages: boolean = false;
  page: number = 1;
  notMoreOldMessage: boolean = false;
  not_bottom: boolean = false;
  disableScroll: boolean = false;
  attachments: { url: any; file: File, type: 'image' }[] = [];

  firstScroll: boolean = true;
  pondOptions: FilePondOptions = {
    allowMultiple: true,
    labelIdle: 'Arrastre o presione aqui',
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
          // console.log({ 'File_upload': data });
          // console.log(data.id);
          this.sendOneMessage(null, [data.id]);
          // this.hasFile = false;
          return data.id;
        }
      },
    }
  };

  ngOnInit(): void {
    if (this.userchat.data_chat) {
      this.markReadMessage(this.userchat.data_chat._id);
      this.getMessages();
      autosize(document.querySelectorAll('#textarea-chat'));
      // console.log(autosize);
    } else {
      this.s_standart
        .store(`chats/user`, { participants: [this.userchat.id] })
        .subscribe((data) => {
          // console.log(data);
          this.userchat.data_chat = data.data.chats;
          this.userchat.messages =  data.data.messages.data.reverse();
        });
        autosize(document.querySelectorAll('#textarea-chat'));
        // console.log(autosize);
        // document.getElementById('textarea-chat')
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') {
            this.markReadMessage(this.userchat.data_chat._id);
          }
        });
    }
  }

  successFiles(event): void {
    console.log(event);
    // if(event.error == null){
      this.hasFile = false;
    // }
  }
  getMessages(goBottom = false): void {
    this.s_standart
      .show(`chats/${this.userchat.data_chat._id}/messages?page=${this.page}`)
      .subscribe((res) => {
        if (!Array.isArray(this.userchat.messages)) {
          this.userchat.messages = [];
        }
        if (goBottom) {
          this.not_bottom = true;
          const data = res.data.data;
          if (data.length <= 0) {
            this.notMoreOldMessage = true;
          }
          this.scrollContainer.scrollTop += 10;
          data.forEach((item) => {
            this.userchat.messages.unshift(item);
          });
        } else {
          const data = collect(res.data.data).reverse().all() as any;
          this.userchat.messages = this.userchat.messages.concat(data);
        }
        this.page++;
      });
  }

  typingMessage(): void {
    // this.s_standart.index('chats/users_connected').subscribe(
    // );
  }

  addAttachments(event): void {
    Array.from(event.target.files).forEach((file: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // reader.result;
        this.attachments.push({ url: reader.result, file, type: file.type });
        // console.log(this.attachments);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    });
  }

  removeAttach(index): void {
    this.attachments.splice(index, 1);
  }


  ngAfterViewInit() {
    this.scrollContainer = this.scrollFrame.nativeElement;
    this.suscripted = this.ngfor.changes.subscribe((data) => {
      // console.log(data);
      const hasBottom = this.scrollContainer.scrollTop + this.scrollContainer.clientHeight  < this.scrollContainer.scrollHeight - (this.scrollContainer.clientHeight * 2) 
      // console.log(hasBottom);
      if (hasBottom && !this.firstScroll) {
        this.hasNewMessages = (!this.not_bottom && !data.last.nativeElement.className.includes('text-right'));
        this.disableScroll = true;
      } else {
        this.hasNewMessages = false;
        this.disableScroll = false;
      }
      this.not_bottom = false;
      this.firstScroll = false;
      this.markReadMessage(this.userchat.data_chat._id);
    });
  }

  ngOnDestroy() {
    if (this.suscripted) {
      console.log('destroy suscripted');
      this.suscripted.unsubscribe();
    }
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
    console.log('close chat');
    this.delete.emit(this.userchat.id as number);
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
    console.log(event.char);
  }

  sendMessage($event = null): boolean {
    if ($event) {$event.preventDefault(); }
    const text = this.textMessage.nativeElement.value;
    if (text.trim() === '') {
      return false;
    }
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
    data['chat_id'] = this.userchat.data_chat._id;
    // console.log(data);

    this.s_standart
      .store(`chats/user/messages`, data)
      .subscribe((res) => {
        // console.log(res);
      });
    // this.text_message = '';
  }

  markReadMessage(chat_id): void {
    SharedService.disabled_loader = true;
    this.s_standart
      .updatePut(`chats/${chat_id}/mark-read`, {}, false)
      .subscribe((res) => {
        // console.log(res);
        this.userchat.data_chat.unread_messages_count = 0;
      });
  }

  openViewUsersGroupModal(): void {
    this.dialog.open(UsersGroupsChatModalComponent, {
      data: {title: this.userchat.name,
         participants: this.userchat.data_chat.participants,
         img: this.getPhoto(this.userchat?.data_chat?.img ? this.userchat?.data_chat?.img : this.userchat?.data_chat?.participants ? this.userchat?.data_chat?.participants[0]?.info?.photo : null),
         isGroup: this.userchat.data_chat.type == 'group', myId: this.my_id, id_chat: this.userchat.data_chat._id}
    }).beforeClosed().subscribe((res) => {
      // console.log(res);
      if (res && typeof res === 'object' && res.state === 'deleted') {
        this.delete.emit(this.userchat.id as number);
    }
    });
  }

  downloadResource(file, name, id) {
    console.log(id);
    const message = this.userchat.messages.find(x => x._id == id);
    if (message == undefined) { return; }
    message.files[0]['isload'] = true;
    this.s_shared.download(`storage/attachments?file=${file}`)
      .subscribe((event:  HttpEvent<Blob> ) => {
        // if (event.type === HttpEventType.UploadProgress) {
        //   // This is an upload progress event. Compute and show the % done:
        //   const percentDone = Math.round(100 * event.loaded / event.total);
        //   console.log(`File is ${percentDone}% uploaded.`);
        // } else if (event instanceof  Blob) {
        //   console.log('File is completely uploaded!');
        //   const blob = new Blob([event], { type: 'application/ms-Excel' });
        //   const urlDownload = window.URL.createObjectURL(blob);
        //   const a = document.createElement('a');
        //   document.body.appendChild(a);
        //   a.setAttribute('style', 'display: none');
        //   a.href = urlDownload;
        //   a.download = name;
        //   a.click();
        //   window.URL.revokeObjectURL(urlDownload);
        //   a.remove();
        //   message.files[0]['isload'] = false;
        // }
        let progress = 0;
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.DownloadProgress:
            console.log(event);
            console.log(event.loaded , event.total);
            
            progress = Math.round(event.loaded / event.total * 100);
            message.files[0].progress = progress;
            console.log(`Uploaded! ${progress}%`);
            break;
          case HttpEventType.Response:
            console.log('File is completely uploaded!');
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
            console.log('User successfully created!', event.body);
            
        }
      }, err => {message.files[0]['isload'] = false; });
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
