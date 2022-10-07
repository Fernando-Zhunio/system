import { createAction, props } from "@ngrx/store";

export const setPreferenceSuccess = createAction('[Preference] Set Preference', props<{ preference: string, value: string }>());
