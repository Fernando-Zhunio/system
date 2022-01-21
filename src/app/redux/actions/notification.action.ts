import { createAction, props } from '@ngrx/store';
import { Inotification } from '../../interfaces/inotification';

export const addNotification = createAction('[Notification] Add Notification', props<{ notification: Inotification }>());
export const overrideNotification = createAction('[Notification] Override Notification', props<{ notifications: Inotification[] }>());
