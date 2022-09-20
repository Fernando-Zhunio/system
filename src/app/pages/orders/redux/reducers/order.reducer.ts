import { createReducer, on } from '@ngrx/store';
import { downloadPrice, generatePrice, generatingPrice, idlePrice } from '../../../../redux/actions/price.action';

export enum EPriceState {
    Idle = 'Generar Excel de Precios',
    Generating = 'Generando Excel de Precios espere ...',
    Generated = 'Excel Generado, presione el botón para descargarlo',
    Downloading = 'Descargando Excel de Precios espere ...',
}
export const initialState: any = { status: EPriceState.Idle, data: null };

const _pricesReducer = createReducer(
    initialState,
    on(idlePrice, () => ({ status: EPriceState.Idle, data: null })),
    on(generatingPrice, () => ({ status: EPriceState.Generating, data: null })),
    on(generatePrice, (_state, data) => ({ status: EPriceState.Generated, data })),
    on( downloadPrice, (state) => ({ status: EPriceState.Downloading, data: state.data })));

export function pricesReducer(state, action) {
    return _pricesReducer(state, action);
}
