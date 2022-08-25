import { environment } from '../../environments/environment';
import { MethodsHttpService } from '../services/methods-http.service';

export class NotificationsWebPush {
  constructor(
    private methodsHttp: MethodsHttpService
  ) { }
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

  activateWebpushNotifications(_firstTime = false) {
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
          'Has bloqueado las notificaciones de navegador, si deseas activarlas desbloqueabas primero.'
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
        console.log('subscribeOptions', subscribeOptions);
        return registration.pushManager.subscribe(subscribeOptions);
      })
      .then((pushSubscription) => {
        this.storePushSubscription(pushSubscription);
      }).catch((err) => {
        console.log('Error al suscribirse', err);
        console.log(err);
      });
  }

  storePushSubscription(pushSubscription) {
    this.methodsHttp.methodPost('notifications/suscribe-webpush', JSON.parse(JSON.stringify(pushSubscription))).subscribe(() => {
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
