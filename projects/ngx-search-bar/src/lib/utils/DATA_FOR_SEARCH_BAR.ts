import { InjectionToken } from "@angular/core";

export interface NgxSearchBarProvider {
  BASE_URL: string;
  OPTIONS?: {
    customBtnApplyFilter?: { text?: string, class?: string, color?: string, icon?: string}
  }
}

export const defaultConfigNgxSearchBar: NgxSearchBarProvider = {
  BASE_URL: 'https://jsonplaceholder.typicode.com/',
  OPTIONS: {
    customBtnApplyFilter: { text: 'Aplicar Filtros', class: '', color: 'accent', icon: 'done' }
  }
}

export const DATA_FOR_SEARCH_BAR = new InjectionToken<NgxSearchBarProvider>('Token de datos para la barra de búsqueda', {
  providedIn: 'root',
  factory: () => defaultConfigNgxSearchBar
}
);
