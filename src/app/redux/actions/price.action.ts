import { createAction } from '@ngrx/store';

export const idlePrice = createAction('[Price] Idle Price');
export const generatingPrice = createAction('[Price] Generating Price');
export const generatePrice = createAction('[Price] Generate Price');
export const downloadPrice = createAction('[Price] Download Price');
// export const overrideNotification = createAction('[Notification] Override Notification', props<{ notifications: Inotification[] }>());
