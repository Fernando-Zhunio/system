import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NotificationSnackbarComponent } from '../../../shared/components/notification-snackbar/notification-snackbar.component';
// import { Notification } from '../../../shared/interfaces/notification';
import { ADD_NOTIFICATIONS, NOTIFICATIONS_CREATE_POPUP } from '../actions/notifications.action';
// declare let Swal: any;

@Injectable({
  providedIn: 'root'
})
export class NotificationEffectService {

  constructor(private actions$: Actions, private snackbar: MatSnackBar) { }

  createNotification$ = createEffect(() => this.actions$.pipe(
    ofType(NOTIFICATIONS_CREATE_POPUP),
    switchMap((action: any) => {
      console.log('action', action.notification);
      this.generateSweetAlertNotification(action.notification);
      return of(ADD_NOTIFICATIONS({ notification: action.notification }))
    })
  ));

  generateSweetAlertNotification(notification: any) {
    // const fire = Swal.mixin({
    //   toast: true,
    //   position: 'bottom-end',
    // });
    // Swal.fire({
    //   title: 'Sweet!',
    //   text: 'Modal with a custom image.',
    //   imageUrl: 'https://unsplash.it/400/200',
    //   imageWidth: 50,
    //   imageHeight: 50,
    //   imageAlt: 'Custom image',
    //   position: 'top-end'
    // });
    this.snackbar.openFromComponent(NotificationSnackbarComponent, {
      data: notification,
    });
  }
}
