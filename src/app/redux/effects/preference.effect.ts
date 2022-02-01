import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadPreference, setPreference } from './../actions/preference.action';
// import { tap } from 'rxjs/operators';
import { StandartSearchService } from './../../services/standart-search.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable()
export class PreferenceEffects {

    constructor(private actions$: Actions, private s_standard: StandartSearchService) { }
    setDataPreference$ = createEffect(() => this.actions$.pipe(
            ofType(loadPreference),
            // tap(() => { console.log('setPreference'); }),
            mergeMap((action) => {
                console.log('setPreference', action);
                const url = 'user/preferences/dashboard';
                return this.s_standard.updatePut(url, action.preferenceDateDashboard)
                .pipe(
                    map(data => setPreference({ preference: data.data })),
                    catchError(error => { console.log('error', error); return EMPTY; })
                );
            })
        )
    );
//  fe = {dates : {from : ".Carbon::now()->subDays(7)->format('Y/m/d').",
//                 to : ".Carbon::now()->format('Y/m/d')."}, 
//                 dates_compare: {from : ".Carbon::now()->subDays(8)->format('Y/m/d').", to : ".Carbon::now()->subDays(15)->format('Y/m/d')."}}
}
