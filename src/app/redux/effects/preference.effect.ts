import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RefreshPreference, setPreference, UpdatePreference } from './../actions/preference.action';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { MethodsHttpService } from '../../services/methods-http.service';
import { setPreferenceSuccess } from '../actions/api/preferences-api.action';

@Injectable()
export class PreferenceEffects {
    constructor(private actions$: Actions, private methodsHttp: MethodsHttpService) { }

    setDataPreference$ = createEffect(() => this.actions$.pipe(
        ofType(RefreshPreference),
        switchMap(() => {
            const url = 'user/preferences';
            return this.methodsHttp.methodGet(url)
                .pipe(
                    map(data => {
                        return UpdatePreference({ preferences: data.data })
                    }),
                    catchError(error => { console.log('error', error); return EMPTY; })
                );
        })
    )
    );

    setPreference$ = createEffect(() => this.actions$.pipe(
        ofType(setPreference),
        exhaustMap((preference) => {
            const url = 'user/preferences';
            return this.methodsHttp.methodPut(url, { preference: preference.preference, value: preference.value })
                .pipe(
                    map((res: any) => {
                        console.log({ res });
                        return setPreferenceSuccess({ preference: res.data.preference, value: res.data.value })
                    }),
                    catchError(() => {
                        return EMPTY;
                    })
                );
        })
    )
    );
}
