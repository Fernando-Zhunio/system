import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
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

  constructor(@Inject(MAT_SNACK_BAR_DATA) public notification: Notification) { }

}
