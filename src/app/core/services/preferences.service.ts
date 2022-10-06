import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Preferences } from '../interfaces/preferences';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {
  public SOUND: string = 'general_notification_sound';
  public WEBPUSH: string = 'general_notification_webpush';
  public EMAIL: string = 'general_notification_email';
  public WHATSAPP: string = 'general_notification_whatsapp';
  public DASHBOARD: string = 'dashboard_dates';

  public preferences: BehaviorSubject<Preferences>  = new BehaviorSubject<Preferences>({
    general_notification_sound: 'on',
    general_notification_webpush: 'on',
    general_notification_email: 'on',
    general_notification_whatsapp: 'on',
    dashboard_dates: null,
  });

  serverUrl = environment.server;

  constructor(private httpClient: HttpClient) { }

  getPreferences() {
    return this.httpClient.get(this.serverUrl + 'user/preferences')
      .pipe(tap((res: any) => {
        if (res?.success) {
          this.preferences.next(res.data) ;
        }
      }))
  }

  getPreference(preference: string): Observable<any> {
    return this.httpClient.get(`${this.serverUrl}user/preferences/${preference}`)
  }

  setPreference(preference: string, value: string, callback: Function | null = null): Observable<any> {
    return this.httpClient.put(this.serverUrl + 'user/preferences', { preference, value })
      .pipe(tap((res: any) => {
        if (res?.success) {
          const preferences = this.preferences.getValue();
          preferences[preference] = value;
          this.preferences.next(preferences);
          if (callback) {
            callback();
          }
        }
      })
      )
  }
}
