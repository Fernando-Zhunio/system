import { InjectionToken } from "@angular/core"

export interface NgxSearchBarProvider {
  BASE_URL: string
  OPTIONS?: {
    classContainerFilter?: string,
    fnScrollTop?: () => void,
    stickyTop?: string,
  }
  OPTIONS_PAGINATE?: {
    fnGetLength?: ((arg) => number) | string,
  },
  OPTIONS_FILTERS?: {
    textButtons: {
      apply: string,
      cancel: string,
    }
  }
}

export const defaultConfigNgxSearchBar: NgxSearchBarProvider = {
  BASE_URL: "https://jsonplaceholder.typicode.com/",
  OPTIONS: {
    // customBtnApplyFilter: { text: "Aplicar Filtros", class: "" },
    classContainerFilter: "main-style",
  },
  OPTIONS_FILTERS: {
    textButtons: {
      apply: "Aplicar",
      cancel: "Cancelar",
    }
  }
}

export const NGX_SEARCH_BAR_DATA = new InjectionToken<NgxSearchBarProvider>(
  "Token de datos para la barra de búsqueda",
  {
    providedIn: "root",
    factory: () => defaultConfigNgxSearchBar,
  }
)


