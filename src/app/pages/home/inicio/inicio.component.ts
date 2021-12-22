import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Cperson } from '../../../class/cperson';
import { Inotification } from '../../../interfaces/inotification';
import { SharedService } from '../../../services/shared/shared.service';
import { StandartSearchService } from '../../../services/standart-search.service';
import { StorageService } from '../../../services/storage.service';
import { Inewsletter } from './../../../interfaces/inewsletter';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  person: Cperson = new Cperson();
  constructor(private s_shared: SharedService, private s_storage: StorageService, private s_standart: StandartSearchService) { }

  categoriesCount: number;
  brandCount: number;
  productsCount: number;
  newsletters: Inewsletter[] = [];
  icon_url: string;
  date = new Date().getTime();
  notifications: Inotification[] = [];
  suscription_notifications: Subscription;
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
  city: string;


  ngOnInit(): void {
    this.person.first_name = this.s_storage.getCurrentUser().name;
    this.city = this.person?.city?.name || 'guayaquil';

    this.suscription_notifications = this.s_shared.currentNotifications.subscribe(res => {
      this.notifications = res;
    });

    this.getDataWeather();
    this.s_standart.index('home').subscribe(res => {
      if (res && res.hasOwnProperty('success') && res.success) {
        // this.categoriesCount = res.data.categories;
        // this.productsCount = res.data.products;
        // this.brandCount = res.data.brands;
        this.newsletters = res.data.newsletter;
      }
    });
  }

  getDataWeather(): void {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&lang=es&units=metric&appid=${this.weather_key}`;
    fetch(url).then(res => res.json()).then(res => {
      this.weather_date = res;
      // this.icon_url = `http://openweathermap.org/img/wn/${res.weather[0].icon}.png?width=100`
      this.icon_url = `assets/weather/${this.weather_date.weather[0].main.toLowerCase()}.svg`
    });
  }

}
