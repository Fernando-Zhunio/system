import { createAction, props } from '@ngrx/store';
import { Preferences } from '../../core/interfaces/preferences';
export const setPreferences = createAction('[Preference] Set Preferences', props<{ preferences: Preferences  }>());
// export const RefreshPreference = createAction('[Preference] Get Preferences', props());
// export const UpdatePreference = createAction('[Preference] Update Preferences', props<{ preferences: Preferences }>());
export const setPreference = createAction('[Preference] Set Preference api', props<{ preference: string, value: string }>());
// export const RefreshPreferenceSuccess = createAction('[Preference] Refresh Preference api', props<{ preference: Preferences}>());