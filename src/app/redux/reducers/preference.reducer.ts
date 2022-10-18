import { createReducer, on } from '@ngrx/store';
import { Preferences } from '../../core/interfaces/preferences';
import { setPreferences, setPreference } from '../actions/preference.action';

export const initialState: Preferences = {
    general_notification_email: 'off',
    general_notification_sound: 'off',
    general_notification_webpush: 'off',
    general_notification_whatsapp: 'off',
    dashboard_dates: null,
};

const _preferenceReducer = createReducer(
    initialState,
    // on(RefreshPreferenceSuccess, (_state, {preferences}) => preferences),
    on(setPreference, (state, { preference, value } ) => {
       const newState = {...state, [preference]: value};
       return newState;
    }),
    on(setPreferences, (_state, { preferences } ) =>  {
        return {..._state, ...preferences};
    }),
);

export function preferenceReducer(state, action) {
    return _preferenceReducer(state, action);
};
