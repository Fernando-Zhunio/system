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
} from '@angular/core';
import collect from 'collect.js';
import { FilePondOptions } from 'filepond';
// import { FilePondComponent } from 'ngx-filepond/filepond.component';
// import { FilePondComponent } from 'ngx-filepond';
import { forkJoin, Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SharedService } from '../../../services/shared/shared.service';
import { StandartSearchService } from '../../../services/standart-search.service';
import { StorageService } from '../../../services/storage.service';
import { ImessageChat, IuserChat } from './../../../interfaces/chats/ichats';
// import { FilePondComponent } from 'ngx-filepond';
// import { FilePondOptions } from 'filepond';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private s_standart: StandartSearchService, private s_storage: StorageService) {}
  @ViewChild('scrollMe') private scrollFrame: ElementRef;
  @ViewChildren('ngfor') ngfor: QueryList<any>;
  @ViewChild('myPond') myPond: any;
  hasFile: boolean = false;

  @Input() userchat: IuserChat;
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Input() my_id: number;
  scrollContainer: any;
  text_message: string = '';
  toggled: boolean = false;
  suscripted: Subscription;
  page: number = 1;
  not_bottom: boolean = true;
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
          console.log({'File_upload': data});
          console.log(data.id);
          this.sendOneMessage([data.id]);
          return data.id;
        }


      },
      // process: `${environment.server}storage/attachments/upload`,
    }
  };

  // pondFiles: FilePondOptions['files'] = [
  //   {
  //     source: 'assets/photo.jpeg',
  //     options: {
  //       type: 'local'
  //     }
  //   }
  // ];

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
    this.scrollContainer = this.scrollFrame.nativeElement;
    this.suscripted = this.ngfor.changes.subscribe((_) => {
      if (this.not_bottom) {
        this.markReadMessage(this.userchat.data_chat._id);
        this.scrollToBottom();
      }
      this.not_bottom = true;
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
    this.s_standart
      .updatePut(`chats/${chat_id}/mark-read`, {})
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

}
