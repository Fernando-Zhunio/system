import { createReducer, on } from '@ngrx/store';
// import { addNotification, overrideNotification } from '../actions/notification.action';
import { ADD_NOTIFICATIONS, SET_NOTIFICATIONS } from '../actions/notifications.action';

export const initialState: any = [];

const _notificationsReducer = createReducer(
    initialState,
    on(ADD_NOTIFICATIONS, (state, {notification}) => {
        return [notification, ...state];
    }),
    on(SET_NOTIFICATIONS, (_state, {notifications}) => notifications)
);

export function notificationsReducer(state, action) {
    return _notificationsReducer(state, action);
}