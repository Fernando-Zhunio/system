import { createReducer, on } from '@ngrx/store';
import { addNotification, overrideNotification } from '../actions/notification.action';

export const initialState: any = [];

const _notificationsReducer = createReducer(
    initialState,
    on(addNotification, (state, {notification}) => {
        return [notification, ...state];
    }),
    on(overrideNotification, (_state, {notifications}) => notifications)
);

export function notificationsReducer(state, action) {
    return _notificationsReducer(state, action);
}
