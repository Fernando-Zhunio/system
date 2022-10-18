import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { PreferencesTypes } from '../../core/enums/preferences-types';
import { Preferences } from '../../core/interfaces/preferences';
import { refreshPreferenceApi, setPreferenceApi } from '../../redux/actions/api/preferences-api.action';
import { selectPreference } from '../../redux/state/state.selectors';
import { StorageService } from '../../services/storage.service';
import { SoundNotification } from '../../shared/class/sound-notification';

@Component({
  selector: 'app-configuration-menu',
  templateUrl: './configuration-menu.component.html',
  styleUrls: ['./configuration-menu.component.scss']
})
export class ConfigurationMenuComponent implements OnInit, OnDestroy {

  preferences: Preferences;
  storeSubscription: Subscription | null = null;
  volume = 0;

  constructor(private store: Store, private storage: StorageService, private soundNotification: SoundNotification ) {
  }

  ngOnDestroy(): void {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  typesPreferences = PreferencesTypes;

  ngOnInit() {
    this.store.dispatch(refreshPreferenceApi({}));
    this.storeSubscription = this.store.select(selectPreference).subscribe((res: Preferences) => {
      this.preferences = res;
    });
    this.volume = this.soundNotification.getVolume() * 100;
  }

  setPreference(preference: string, value: string): void {
    console.log(preference, value);
    this.store.dispatch(setPreferenceApi({ preference, value }));
  }

  changeVolume(volume: MatSliderChange): void {
    if (volume.value) {
      this.soundNotification.setVolumen(this.storage, volume.value);
    }
  }

}
