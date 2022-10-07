import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PreferencesTypes } from '../../core/enums/preferences-types';
import { Preferences } from '../../core/interfaces/preferences';
import { RefreshPreference, setPreference } from '../../redux/actions/preference.action';
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
    // this.s_preferences.getPreferences().subscribe((res: any) => {
    //   if (res?.success) {
    //     this.preferences = res.data;
    //   }
    // });
    this.store.dispatch(RefreshPreference({}));
    this.store.select(selectPreference).subscribe((res: Preferences) => {
      console.log(res);
      this.preferences = res;
    });
  }

  setPreference(preference: string, value: string): void {
    console.log(preference, value);
    this.store.dispatch(setPreference({ preference, value}));
    // this.setPreference(preference, value);
    // this.s_preferences.setPreference(preference, value)
    //   .subscribe((res: any) => {
    //     if (res?.success) {
    //       this.preferences[preference] = value;
    //     }
    //   }, () => {
    //     this.preferences[preference] = value === 'on' ? 'off' : 'on';
    //   });
  }

}
