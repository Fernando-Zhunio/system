import { createReducer, on } from '@ngrx/store';
import { Preferences } from '../../class/fast-data';
// import { PreferencesTypes } from '../../core/enums/preferences-types';
import { Preferences as IPreferences } from '../../core/interfaces/preferences';
import { setPreferences, setPreference } from '../actions/preference.action';

export const initialState: IPreferences = Preferences.getInstance().get();

const _preferenceReducer = createReducer(
    initialState,
    on(setPreference, (state, { preference, value } ) => {
       const newState = {...state, [preference]: value};
        console.log({ newState });
         Preferences.getInstance().set(newState);
       return newState;
    }),
    on(setPreferences, (_state, { preferences } ) =>  {
        console.log({..._state, ...preferences});
        Preferences.getInstance().set({..._state, ...preferences});
        return {..._state, ...preferences};
    }),
);

export function preferenceReducer(state, action) {
    return _preferenceReducer(state, action);
};
