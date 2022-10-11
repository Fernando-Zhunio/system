import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PreferencesTypes } from '../../core/enums/preferences-types';
import { Preferences } from '../../core/interfaces/preferences';
import { refreshPreferenceApi, setPreferenceApi } from '../../redux/actions/api/preferences-api.action';
import { selectPreference } from '../../redux/state/state.selectors';
// import { PreferencesService } from '../../core/services/preferences.service';

@Component({
  selector: 'app-configuration-menu',
  templateUrl: './configuration-menu.component.html',
  styleUrls: ['./configuration-menu.component.scss']
})
export class ConfigurationMenuComponent implements OnInit {

  preferences: Preferences;
  constructor(private store: Store) {
  }
  typesPreferences = PreferencesTypes
  ngOnInit() {
    this.store.dispatch(refreshPreferenceApi({}));
    this.store.select(selectPreference).subscribe((res: Preferences) => {
      this.preferences = res;
    });
  }

  setPreference(preference: string, value: string): void {
    console.log(preference, value);
    this.store.dispatch(setPreferenceApi({ preference, value }));
  }

}
