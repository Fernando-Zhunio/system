import { createReducer, on } from '@ngrx/store';
import { loadPreference, setPreference } from '../actions/preference.action';

export const initialState: any = null;

const _preferenceReducer = createReducer(
    initialState,
    on(loadPreference, (state) => state),
    on(setPreference, (_state, { preference }) => preference),
);

export function preferenceReducer(state, action) {
    return _preferenceReducer(state, action);
};
