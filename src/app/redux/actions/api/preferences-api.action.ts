import { createAction, props } from "@ngrx/store";

export const setPreferenceApi = createAction('[Preference] Set Preference Api', props<{ preference: string, value: string | number }>());
export const refreshPreferenceApi = createAction('[Preference] Refresh Preference api', props());
