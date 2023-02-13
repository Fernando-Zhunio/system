import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../../../class/fast-data';
// import { User } from '../../../class/fast-data';
import { INotification } from '../../../interfaces/inotification';
import { selectNotification } from '../../../redux/state/state.selectors';
import { MethodsHttpService } from '../../../services/methods-http.service';
import { Inewsletter } from './../../../interfaces/inewsletter';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, OnDestroy {

  constructor(private sm: MethodsHttpService, private store: Store) {
  }

  newsletters: Inewsletter[] = [];
  icon_url: string;
  date = new Date().getTime();
  notifications: INotification[] = [];
  subscriptionNotifications: Subscription;
  weather_key = environment.weather_key;
  weather_date: {
    'coord': {
      'lon': number,
      'lat': number,
    },
    'weather': [
      {
        'id': number,
        'main': string,
        'description': string,
        'icon': string,
      }
    ],
    'base': string,
    'main': {
      'temp': number,
      'feels_like': number,
      'temp_min': number,
      'temp_max': number,
      'pressure': number,
      'humidity': number,
    },
    'visibility': number,
    'wind': {
      'speed': number,
      'deg': number,
    },
    'rain': {
      '1h': number,
    },
    'clouds': {
      'all': number,
    },
    'dt': number,
    'sys': {
      'type': number,
      'id': number,
      'country': string,
      'sunrise': number,
      'sunset': number,
    },
    'timezone': number,
    'id': number,
    'name': string,
    'cod': number,
  } =
    {
      'coord': {
        'lon': -79.9,
        'lat': -2.1667
      },
      'weather': [
        {
          'id': 500,
          'main': 'Rain',
          'description': 'Sin datos',
          'icon': '10d'
        }
      ],
      'base': 'stations',
      'main': {
        'temp': 0,
        'feels_like': 31.19,
        'temp_min': 29,
        'temp_max': 29,
        'pressure': 1012,
        'humidity': 0
      },
      'visibility': 10000,
      'wind': {
        'speed': 3.6,
        'deg': 40
      },
      'rain': {
        '1h': 0.3
      },
      'clouds': {
        'all': 75
      },
      'dt': 1619191248,
      'sys': {
        'type': 1,
        'id': 8534,
        'country': 'EC',
        'sunrise': 1619176573,
        'sunset': 1619219948
      },
      'timezone': -18000,
      'id': 3657509,
      'name': 'Guayaquil',
      'cod': 200
  };
  user = User.getUser();

  ngOnInit(): void {
    // this.user = User.getInstance();
    this.getDataWeather();
    this.sm.methodGet('home').subscribe(res => {
      if (res?.success) {
        this.newsletters = res.data.newsletter;
      }
    });
    this.getNotification();
  }

  ngOnDestroy(): void {
    this.subscriptionNotifications?.unsubscribe();
  }

  getNotification(): void {
    this.subscriptionNotifications = this.store.select(selectNotification).subscribe(res => {
      this.notifications = res;
    });
  }

  getDataWeather(): void {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.user?.person?.city?.name || 'Guayaquil'}&lang=es&units=metric&appid=${this.weather_key}`;
    fetch(url).then(res => res.json()).then(res => {
      this.weather_date = res;
      this.icon_url = `assets/weather/${this.weather_date.weather[0].main.toLowerCase()}.svg`
    });
  }

}
