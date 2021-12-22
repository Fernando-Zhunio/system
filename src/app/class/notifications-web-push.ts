// import { JsonPipe } from '@angular/common';
// import { SwPush } from '@angular/service-worker';
import { SwPush } from '@angular/service-worker';
import { environment } from '../../environments/environment';
import { StandartSearchService } from '../services/standart-search.service';

export class NotificationsWebPush {
  constructor(
    private swPush: SwPush,
    private s_standart: StandartSearchService
  ) { }
  public readonly PUBLIC_KEY = 'BIpvX7op6SPzeb27Jg1rm7FJrOxmLRPOMkHDlzMnhTFaso8nBPvm9PZuwcVbLQua1T6mNctdw2B9gSGfBWX6w9E';
  //  environment.VAPID_PUBLIC_KEY;


  addHours(h: number): Date {
    const date = new Date();
    date.setHours(date.getHours() + h);
    return date;
  }

  canInitSw(): void {
    const key = 'canInitSw';
    const storedTime = localStorage.getItem(key);
    if (storedTime && new Date() < new Date(Number(storedTime))) {
      return;
    }
    localStorage.setItem(key, this.addHours(4).getTime().toString());
    // this.initSW();
    const _token = '='.repeat((4 - this.PUBLIC_KEY.length % 4) % 4);
    this.swPush.requestSubscription({
      serverPublicKey: this.PUBLIC_KEY + _token,
    }).then((subscription) => {
      const token = JSON.parse(JSON.stringify(subscription));
      // console.log('**************** TOKEN **************', token);
      this.storePushSubscription(token);
    }).catch((err) => {
      console.error('Could not subscribe to notifications', err);
    });
  }

  initSW() {
    if (!('serviceWorker' in navigator)) {
      return;
    }
    if (!('PushManager' in window)) {
      return;
    }

    navigator.serviceWorker
      .register('/assets/sw.js')
      .then(() => {
        console.log('serviceWorker installed!');
        this.activateWebpushNotifications(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  activateWebpushNotifications(firstTime = false) {
    if (!navigator.serviceWorker.ready) {
      return;
    }
    new Promise(function (resolve, reject) {
      const permissionResult = Notification.requestPermission(function (
        result
      ) {
        resolve(result);
      });

      if (permissionResult) {
        permissionResult.then(resolve, reject);
      }
    }).then((permissionResult) => {
      if (permissionResult !== 'granted') {
        console.error(
          'Has bloqueado las notificaciones de navegador, si deseas activarlas desbloquealas primero.'
        );
      }
      this.subscribeUser();
    });
  }

  subscribeUser() {
    navigator.serviceWorker.ready
      .then((registration) => {
        const subscribeOptions = {
          userVisibleOnly: true,
          applicationServerKey: this.urlBase64ToUint8Array(this.PUBLIC_KEY),
        };

        return registration.pushManager.subscribe(subscribeOptions);
      })
      .then((pushSubscription) => {
        this.storePushSubscription(pushSubscription);
      });
  }

  storePushSubscription(pushSubscription) {
    this.s_standart.store('notifications/suscribe-webpush', JSON.parse(JSON.stringify(pushSubscription))).subscribe(res => {
    });

  }

  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}
