import { createReducer, on } from '@ngrx/store';
import { downloadPrice, generatePrice, generatingPrice, idlePrice  } from '../actions/price.action';

export enum EPriceState {
    Idle = 'Generar Excel de Precios',
    Generating = 'Generando Excel de Precios',
    Generated = 'Excel Generado, descargar',
    Downloading = 'Descargando Excel de Precios',
}
export const initialState = EPriceState.Idle;

const _pricesReducer = createReducer(
    initialState,
    on(idlePrice, (state) => EPriceState.Idle),
    on(generatingPrice, (state) => EPriceState.Generating),
    on(generatePrice, (state) => EPriceState.Generated),
    on(downloadPrice, (state) => EPriceState.Generated),
);

export function pricesReducer(state, action) {
    return _pricesReducer(state, action);
}
