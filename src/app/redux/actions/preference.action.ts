import { createAction, props } from '@ngrx/store';
interface IPreference {
    [key: string]: any;
}
interface IPreferenceDateDashboard { dates: { to: any }; dates_compare: { to: any, from: any }; }
export const setPreference = createAction('[Preference] Set Preference', props<{ preference: any }>());
export const loadPreference = createAction('[Preference] Get Preference', props<{ preferenceDateDashboard: IPreferenceDateDashboard }>());
