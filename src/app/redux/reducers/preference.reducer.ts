import { createReducer, on } from '@ngrx/store';
import { Preferences } from '../../core/interfaces/preferences';
import { setPreferenceSuccess } from '../actions/api/preferences-api.action';
import { RefreshPreference, UpdatePreference, setPreferences } from '../actions/preference.action';

export const initialState: Preferences = {
    general_notification_email: 'off',
    general_notification_sound: 'off',
    general_notification_webpush: 'off',
    general_notification_whatsapp: 'off',
    dashboard_dates: null 
};

const _preferenceReducer = createReducer(
    initialState,
    on(setPreferences, (_state, {preferences}) => preferences),
    on(setPreferenceSuccess, (state, { preference, value } ) => {
        state[preference] = value;
       return state;
    }),
    on(RefreshPreference, (state ) => state),
    on(UpdatePreference, (_state, { preferences } ) => {
        return preferences;
    }),
);

export function preferenceReducer(state, action) {
    return _preferenceReducer(state, action);
};
