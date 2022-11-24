import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Preferences } from '../../../class/fast-data';
import { SoundNotification } from '../../../shared/services/sound-notification';
import { NotificationSnackbarComponent } from '../../../shared/components/notification-snackbar/notification-snackbar.component';
import { ADD_NOTIFICATIONS, NOTIFICATIONS_CREATE_POPUP } from '../actions/notifications.action';

@Injectable({
  providedIn: 'root'
})
export class NotificationEffectService {

  constructor(private actions$: Actions, private snackbar: MatSnackBar, private sn: SoundNotification) { }
  createNotification$ = createEffect(() => this.actions$.pipe(
    ofType(NOTIFICATIONS_CREATE_POPUP),
    switchMap((action: any, state) => {
      console.log({ action, state });
      this.sn.play();
      Preferences.getInstance().get().enable_notifications_popup &&
      this.generateNotificationPopup(action.notification);
      return of(ADD_NOTIFICATIONS({ notification: action.notification }))
    })
  ));

  generateNotificationPopup(notification: any) {
    this.snackbar.openFromComponent(NotificationSnackbarComponent, {
      data: notification,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 4000,
    });
  }
}

