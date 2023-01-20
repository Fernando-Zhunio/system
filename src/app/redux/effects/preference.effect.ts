import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { setPreference, setPreferences } from './../actions/preference.action';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { MethodsHttpService } from '../../services/methods-http.service';
import { refreshPreferenceApi, setPreferenceApi } from '../actions/api/preferences-api.action';
import { SharedService } from '../../services/shared/shared.service';
import { Preferences } from '../../core/interfaces/preferences';

@Injectable()
export class PreferenceEffects {
    refreshPreference$;
    setPreferences$;
    constructor(private actions$: Actions, private methodsHttp: MethodsHttpService) {
        this.refreshPreference$ = createEffect(() => this.actions$.pipe(
            ofType(refreshPreferenceApi),
            switchMap(() => {
                const url = 'user/preferences';
                SharedService.disabled_loader = true;
                return this.methodsHttp.methodGet(url)
                    .pipe(
                        map(data => {
                            const prePreferences = data.data;
                            const preferences = this.convertPreferencesStringToAny(prePreferences);
                            return setPreferences({ preferences })
                        }),
                        catchError(error => { console.error('error', error); return EMPTY; })
                    );
            })
        )
        );
        this.setPreferences$ = createEffect(() => actions$.pipe(
            ofType(setPreferenceApi),
            exhaustMap((preference) => {
                const url = 'user/preferences';
                SharedService.disabled_loader = true;
                return this.methodsHttp.methodPut(url, { preference: preference.preference, value: preference.value.toString() })
                    .pipe(
                        map((res: any) => {
                            
                            const value = this.convertPreferenceStringToAny(res.data.preference, res.data.value);
                            return setPreference
                                ({ preference: res.data.preference, value });
                        }),
                        catchError(error => { console.error('error', error); return EMPTY; })
                    );
            })
        )
        );
     }


    convertPreferencesStringToAny(preferences: Preferences) {
        const preferencesKeysToArray = ['favorites_items_nav', 'enable_notifications_popup'];
        preferencesKeysToArray.forEach((key) => {
            preferences[key] = this.convertStringToArrayOrBoolean(preferences[key]);
        });
        return preferences;
    }
    
    convertPreferenceStringToAny(preference: string, value: string): any {
        const preferencesKeysToArray = ['favorites_items_nav', 'enable_notifications_popup'];
        return preferencesKeysToArray.includes(preference) ?  JSON.parse(value) : value;
    }

    convertStringToArrayOrBoolean(preferences: string): any[] | boolean {
        if (!preferences) {
            return false;
        }
        return JSON.parse(preferences);
    }

}
