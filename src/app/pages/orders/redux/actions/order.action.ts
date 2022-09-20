import { createAction, props } from '@ngrx/store';
import { Order } from '../../interfaces/order';

export const refreshOrder = createAction('[Price] Generate Price', props<{ data: Order | null }>());
