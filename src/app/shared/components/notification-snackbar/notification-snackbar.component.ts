import { CommonModule } from '@angular/common';
// import { HttpEventType } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';
// import { NotificationTypes } from '../../class/notification-types';
import { Notification } from '../../interfaces/notification';
import { DownloadAndRedirectService } from '../../services/download.service';

@Component({
  standalone: true,
  imports: [
    CommonModule
  ],
  selector: 'app-notification-snackbar',
  templateUrl: './notification-snackbar.component.html',
  styleUrls: ['./notification-snackbar.component.scss']
})
export class NotificationSnackbarComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public notification: Notification, private sd: DownloadAndRedirectService) { }

  callback() {
    this.notification.callback && this.notification.callback();
  }

  action() {
    let url = this.notification.data?.url
    if (url) {
      this.sd.download(url);
      return;
    }

    let isRedirect = this.notification.data.route || null
    if (isRedirect) {
      this.sd.redirectTo(this.notification.data);
      return;
    }
  }

  // generatePathAndQueryParams(data): { path: string, queryParams: any } {
  //   const urlOutHash = data.route.replace('#/', '');
  //   const urlObject: any = new URL(urlOutHash);
  //   const path = urlObject.pathname;
  //   const queryStrings = Array.from(urlObject.searchParams.entries());
  //   const queryParams = {};
  //   if (queryStrings.length > 0) {
  //     queryStrings.forEach((item: any) => {
  //       queryParams[item[0]] = item[1];
  //     });
  //   }
  //   return { path, queryParams };
  // }

  // redirectTo(data) {
  //   const { path, queryParams } = this.generatePathAndQueryParams(data);
  //   if (this.router.url !== path) {
  //     this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
  //       this.router.navigate([path], { queryParams }));
  //   }
  // }
  // percentSpinner: {percent: number} = {percent: 0};

  // download(url) {
  //   this.sd.download(url);
  // }

  

}
