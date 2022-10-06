import { Component, OnInit } from '@angular/core';
import { Preferences } from '../../core/interfaces/preferences';
import { PreferencesService } from '../../core/services/preferences.service';

@Component({
  selector: 'app-configuration-menu',
  templateUrl: './configuration-menu.component.html',
  styleUrls: ['./configuration-menu.component.scss']
})
export class ConfigurationMenuComponent implements OnInit {

  preferences: Preferences;
  constructor(protected s_preferences: PreferencesService) {
    console.log(this.s_preferences.preferences.getValue())
    this.preferences = this.s_preferences.preferences.getValue();
  }
  ngOnInit() {
    this.s_preferences.getPreferences().subscribe((res: any) => {
      if (res?.success) {
        this.preferences = res.data;
      }
    });
  }

  setPreference(preference: string, value: string): void {
    console.log(preference, value);
    this.s_preferences.setPreference(preference, value)
      .subscribe((res: any) => {
        if (res?.success) {
          this.preferences[preference] = value;
        }
      }, () => {
        this.preferences[preference] = value === 'on' ? 'off' : 'on';
      });
  }

}
