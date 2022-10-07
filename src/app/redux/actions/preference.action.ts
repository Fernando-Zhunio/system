import { createAction, props } from '@ngrx/store';
import { Preferences } from '../../core/interfaces/preferences';
export const setPreference = createAction('[Preference] Set Preference', props<{ preference: string, value: string }>());
export const setPreferences = createAction('[Preference] Set Preferences', props<{ preferences: Preferences  }>());
export const RefreshPreference = createAction('[Preference] Get Preferences', props());
export const UpdatePreference = createAction('[Preference] Update Preferences', props<{ preferences: Preferences }>());
