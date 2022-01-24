import { createAction, props } from '@ngrx/store';
import { INotificationData } from '../../interfaces/inotification';

export const idlePrice = createAction('[Price] Idle Price');
export const generatingPrice = createAction('[Price] Generating Price');
export const generatePrice = createAction('[Price] Generate Price', props<{ data: INotificationData }>());
export const downloadPrice = createAction('[Price] Download Price');
// export const overrideNotification = createAction('[Notification] Override Notification', props<{ notifications: Inotification[] }>());
