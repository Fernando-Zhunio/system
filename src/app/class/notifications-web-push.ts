import { JsonPipe } from '@angular/common';
import { SwPush } from '@angular/service-worker';
import { environment } from '../../environments/environment';
import { StandartSearchService } from '../services/standart-search.service';

export class NotificationsWebPush {
  constructor(
    private swPush: SwPush,
    private s_standart: StandartSearchService
  ) {}
  public readonly PUBLIC_KEY = environment.VAPID_PUBLIC_KEY;


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
    console.log('init');
    this.initSW();
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
    // axios
    //   .post('/notification/subscribe', {
    //     ...JSON.parse(JSON.stringify(pushSubscription)),
    //   })
    //   .then((res) => {
    //     // console.log(res);
    //   });

      this.s_standart.store('notifications/suscribe-webpush', JSON.parse(JSON.stringify(pushSubscription))).subscribe(res => {
        console.log(res);
    });

        //         console.log(res);
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

  // var api = new NotificationRequest();
  // var headers = {
  //   'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
  //   // "Content-Type": "application/json",
  //   'Accept': 'application/json'
  // }

  // Date.prototype.addHours = function(h) {
  //   this.setHours(this.getHours() + h);
  //   return this;
  // }

  // function canInitSw() {
  //   const key = 'canInitSw'
  //   let storedTime = localStorage.getItem(key)

  //   if(storedTime && (new Date) < new Date(Number(storedTime)))
  //       return

  //   localStorage.setItem(
  //       key,
  //       new Date().addHours(4).getTime()
  //   )
  //   initSW()
  // }
  // // initSW();

  // canInitSw();
}
