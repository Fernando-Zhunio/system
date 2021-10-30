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
  AfterViewInit,
  OnDestroy,
  HostListener,
  SimpleChanges,
} from '@angular/core';
import collect from 'collect.js';
import { FilePondOptions } from 'filepond';
import {forkJoin, Observable, Subject, Subscription } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { SharedService } from '../../../services/shared/shared.service';
import { StandartSearchService } from '../../../services/standart-search.service';
import { StorageService } from '../../../services/storage.service';
import { IuserChat } from './../../../interfaces/chats/ichats';
// import { FilePondComponent } from 'ngx-filepond';
// import { FilePondOptions } from 'filepond';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  constructor(private s_standart: StandartSearchService, private s_storage: StorageService) { }
  @ViewChild('scrollMe') private scrollFrame: ElementRef;
  @ViewChildren('ngfor') ngfor: QueryList<any>;
  @ViewChild('myPond') myPond: any;
  @Input() userchat: IuserChat;
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Input() my_id: number;
  hasFile: boolean = false;
  _scrollContainer: any;
  text_message: string = '';
  toggled: boolean = false;
  suscripted: Subscription;
  hasNewMessages: boolean = false;
  page: number = 1;
  not_bottom: boolean = false;
  disableScroll: boolean = false;
  attachments: { url: any; file: File, type: 'image' }[] = [];
  pondOptions: FilePondOptions = {
    allowMultiple: true,
    labelIdle: 'Arrastre o presione aqui',
    name: 'file',
    server: {
      url: `${environment.server}`,
      timeout: 5000,
      process: {
        url: 'storage/attachments/upload',
        headers: {
          Authorization: `Bearer ${this.s_storage.getCurrentToken()}`,
          Accept: 'application/json',
        },
        onload: (response: any) => {
          const data = JSON.parse(response);
          console.log({ 'File_upload': data });
          console.log(data.id);
          this.sendOneMessage([data.id]);
          return data.id;
        }
      },
    }
  };
  eventScroll: any = null;
  subjectScroll$: Subject<any> = new Subject<any>();;
  observerScroll: Observable<any> = this.subjectScroll$.asObservable();

  set scrollContainer(val: any) {
    this._scrollContainer = val; // Set the new value
    this.subjectScroll$.next(val); // Trigger the subject, which triggers the Observable
  }

  get scrollContainer() {
    return this._scrollContainer;
  }

  ngOnInit(): void {
    if (this.userchat.data_chat) {
      this.markReadMessage(this.userchat.data_chat._id);
      this.getMessages();
    } else {
      this.s_standart
        .store(`chats/user`, { participants: [this.userchat.id] })
        .subscribe((data) => {
          console.log(data);
          this.userchat.data_chat = data.data.chats;
          this.userchat.messages = data.data.messages.data;
        });
    }
  }
  getMessages(goBottom = false): void {
    // this.hasNewMessages = false;
    this.s_standart
      .show(`chats/${this.userchat.data_chat._id}/messages?page=${this.page}`)
      .subscribe((res) => {
        if (!Array.isArray(this.userchat.messages)) {
          this.userchat.messages = [];
        }
        if (goBottom) {
          this.not_bottom = false;
          const data = res.data.data;
          if (data.length <= 0) {
            this.disableScroll = true;
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
        console.log(this.attachments);
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
    // this.checked = true;
    // this.scrollContainer = this.scrollFrame.nativeElement;
    // this.eventScroll = this.observerScroll.subscribe((e) => alert(e));
    // this.eventScroll = new ResizeObserver((entries) => {
    //   console.log(entries);
    //   console.log(entries[0].scrollHeight);
    // });

    // this.eventScroll.observe(this.scrollFrame.nativeElement);

    // this.suscripted = this.ngfor.changes.subscribe((_) => {
    //   if ( this.scrollContainer.scrollTop + this.scrollContainer.clientHeight < this.scrollContainer.scrollHeight - 20 ) {
    //     this.hasNewMessages = true;
    //     return;
    //   } else {
    //     this.hasNewMessages = false;
    //     if (this.not_bottom) {
    //     this.markReadMessage(this.userchat.data_chat._id);
    //     this.scrollToBottom();
    //   }}
    //   this.not_bottom = true;
    // });
  }

  ngOnDestroy() {
    if (this.suscripted) {
      console.log('destroy suscripted');
      this.suscripted.unsubscribe();
    }
  }

  // checked: boolean = false;
  scrollToBottom(): void {

   try {
        
      this.scrollContainer = this.scrollFrame.nativeElement;

     const maxHeight = this.scrollContainer.scrollHeight;
     const hasScrollBar = this.scrollContainer.scrollHeight > this.scrollContainer.clientHeight;
     // this.scrollContainer.scrollTop = this.scrollContainer.scrollHeight;
    //  this.scrollContainer.scroll({
    //    top: this.scrollContainer.scrollHeight,
    //    left: 0,
    //    behavior: 'smooth',
    //  });
    return maxHeight;
   } catch (exception) {
    console.log(exception);
   }
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

  sendMessage(): void {
    if (this.attachments.length > 0) {
      const suscritions_send = [];
      this.attachments.map((item) => {
        const formData = new FormData();
        formData.append('file', item.file);
        suscritions_send.push(
          this.s_standart.uploadFormData('storage/attachments/upload', formData)
        );
      });
      forkJoin(suscritions_send).subscribe((res) => {
        console.log(res);
        const attach_ids = res.map((item: any) => item.id);
        this.sendOneMessage(attach_ids);
        this.attachments = [];
      });
    } else if (this.text_message) {
      this.sendOneMessage();
    }
  }

  sendOneMessage(attach_ids = null): any {
    const data = {};
    data['message'] = this.text_message;
    if (attach_ids) {
      data['attachments_ids'] = attach_ids;
    }
    data['chat_id'] = this.userchat.data_chat._id;
    console.log(data);

    this.s_standart
      .store(`chats/user/messages`, data)
      .subscribe((res) => {
        console.log(res);
      });
    this.text_message = '';
  }

  markReadMessage(chat_id): void {
    SharedService.disabled_loader = true;
    this.s_standart
      .updatePut(`chats/${chat_id}/mark-read`, {}, false)
      .subscribe((res) => {
        console.log(res);
        this.userchat.data_chat.unread_messages_count = 0;
      });
  }

  // #region descargar archivo
  downloadResource(url, filename) {
    if (!filename) { filename = url.split('\\').pop().split('/').pop(); }
    this.s_standart.customUrlGet(url)
      .subscribe((response: any) => {
        const blob = response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        this.forceDownload(blobUrl, filename);
      });
    // .catch(e => console.error(e));
  }

  forceDownload(blob, filename) {
    const a = document.createElement('a');
    a.download = filename;
    a.href = blob;
    // For Firefox https://stackoverflow.com/a/32226068
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  // #endregion descargar archivo




  pondHandleInit() {
    console.log('FilePond has initialised', this.myPond);
  }

  pondHandleAddFile(event: any) {
    console.log('A file was added', event);
  }

  pondHandleActivateFile(event: any) {
    console.log('A file was activated', event);
  }

  generateParticipantTooltip(participant): string {
    return `<span class="text-truncate p-2">
    <img src="${this.getPhoto(participant?.info?.photo)}" alt="">${participant?.info?.name}
      </span>`;
  }
}
