import { JsonPipe } from '@angular/common';
import { SwPush } from '@angular/service-worker';
import { environment } from '../../environments/environment';
import { StandartSearchService } from '../services/standart-search.service';

export class NotificationsWebPush {
  constructor(private swPush: SwPush,private s_standart: StandartSearchService) {}
  public readonly publicKey = environment.VAPID_PUBLIC_KEY;
  pushSuscription() {
    if (!this.swPush.isEnabled) {
      console.log('Web Push is not enabled',);
      this.canInitSw();

      return;
    } else {
      console.log('Web Push is enabled');
      this.canInitSw();
    }
  }

  answerPush() {
    this.swPush
    .requestSubscription({
      serverPublicKey: this.publicKey,
    })
    .then((sub) => {
      this.s_standart.store('notifications/suscribe-webpush', JSON.parse(JSON.stringify(sub))).subscribe(res => {
        console.log(res);
    });
    }).catch((err) => {
      console.error(err);
    });
  }

   addHours(h: number): Date {
    const date = new Date();
    date.setHours(date.getHours() + h);
    return date;
    }
   canInitSw(): void {
    const key = 'canInitSw';
    const storedTime = localStorage.getItem(key);
    if (storedTime && (new Date) < new Date(Number(storedTime))) {return; }
    localStorage.setItem(
        key,
        this.addHours(4).getTime().toString()
    );
    console.log ('init');
    this.answerPush();
}
}
