import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
// import { NotificationTypes } from '../../class/notification-types';
import { Notification } from '../../interfaces/notification';

@Component({
  standalone: true,
  imports: [
    CommonModule
  ],
  selector: 'app-notification-snackbar',
  templateUrl: './notification-snackbar.component.html',
  styleUrls: ['./notification-snackbar.component.scss']
})
export class NotificationSnackbarComponent  {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public notification: Notification, private router: Router) { }

  callback() {
    this.notification.callback && this.notification.callback();
  }

  action() {
    let isDownload = this.notification.data.url
    if (isDownload) {
      this.download();
    }
    let isRedirect = this.notification.data.route || null
    if (isRedirect) {
      this.router.navigate([this.notification.data.route]);
    }
    
  }

  download() {
    window.open(this.notification.data.url, '_blank');
  }

}
