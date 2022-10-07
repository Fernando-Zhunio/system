
import { createFeatureSelector } from '@ngrx/store';
import { INotification } from '../../interfaces/inotification';
import { EPriceState } from '../reducers/price.reducer';

export const selectNotification = createFeatureSelector<INotification[]>('notification');
export const selectPrice = createFeatureSelector<EPriceState>('price');
export const selectPreference = createFeatureSelector<any>('preferences');

