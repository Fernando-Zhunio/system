import { createAction, props } from "@ngrx/store";

export const setPreferenceApi = createAction('[Preference] Set Preference', props<{ preference: string, value: string }>());
export const refreshPreferenceApi = createAction('[Preference] Refresh Preference api', props());
