import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SoundNotification } from '../../../shared/class/sound-notification';
import { NotificationSnackbarComponent } from '../../../shared/components/notification-snackbar/notification-snackbar.component';
// import { Notification } from '../../../shared/interfaces/notification';
import { ADD_NOTIFICATIONS, NOTIFICATIONS_CREATE_POPUP } from '../actions/notifications.action';
// declare let Swal: any;

@Injectable({
  providedIn: 'root'
})
export class NotificationEffectService {

  constructor(private actions$: Actions, private snackbar: MatSnackBar, private _sn: SoundNotification) { }

  createNotification$ = createEffect(() => this.actions$.pipe(
    ofType(NOTIFICATIONS_CREATE_POPUP),
    switchMap((action: any) => {
      console.log('action', action.notification);
      this.generateSweetAlertNotification(action.notification);
      return of(ADD_NOTIFICATIONS({ notification: action.notification }))
    })
  ));

  generateSweetAlertNotification(notification: any) {
    this._sn.play();
    this.snackbar.openFromComponent(NotificationSnackbarComponent, {
      data: notification,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 4000,
    }, );
  }
}
