import { createAction, props } from "@ngrx/store";
import { Notification } from "../../../shared/interfaces/notification";


export const NOTIFICATIONS_CREATE_POPUP = createAction('[Notifications] Create Popup', props<{ notification: Notification }>());
export const ADD_NOTIFICATIONS = createAction('[Notifications] Create', props<{ notification: Notification }>());
export const SET_NOTIFICATIONS = createAction('[Notifications] Set Notifications', props<{ notifications: Notification[] }>());
// export const NOTIFICATIONS_CREATE = createAction('[Notifications] Create', props<{ notification: Notification }>());
