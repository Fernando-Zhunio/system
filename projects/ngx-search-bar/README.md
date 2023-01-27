# Ngx Search Bar with angular material

The package needs angular material to work (This package is compatible with angular 15)

## Installation

To install this library, run:

```bash
$ npm install ngx-search-bar-fz --save
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";

// Import your library
import { DATA_FOR_SEARCH_BAR, NgxSearchBarModule } from "ngx-search-bar-fz";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,

    // Specify your library as an import
    NgxSearchBarModule,
  ],
  providers: [
    {
      provide: DATA_FOR_SEARCH_BAR,
      useValue: {
        BASE_URL: "https://localhost:7124/api/",
        OPTIONS: {
          customBtnApplyFilter: {
            text: "Apply",
            color: "primary",
            class: "btn-apply-filter",
            icon: "done",
          },
        },
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Custom provider (IMPORTANT)

You need to override the DATA_FOR_SEARCH_BAR provider for the component to work
The provider must have the following structure:

```typescript
providers: [
    {
      provide: DATA_FOR_SEARCH_BAR,
      useValue: {
        BASE_URL: 'https://localhost:7124/api/',
        OPTIONS: {
          customBtnApplyFilter: {
            text: 'Apply',
            color: 'primary',
            class: 'btn-apply-filter',
            icon: 'done',
          }
        }
      }
    },
  ],
```

Usage in templates is as simple as:

```html
<ngx-search-bar
  title="Novisolutions "
  (data)="getData($event)"
  path="brands"
  [isChangeUrl]="true"
  [(filters)]="filters"
>
</ngx-search-bar>
```

## Inputs

| Name                 | Type                                                            | Default                                                               | Description                                         |
| -------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------- |
| placeholder          | string                                                          | 'Search here'                                                         | Entry placeholder                                   |
| title                | string                                                          | 'Search'                                                              | Component Title                                     |
| path                 | string                                                          | search                                                                | Route for requests                                  |
| isChangeUrl          | boolean                                                         | false                                                                 | If the url should be changed when doing a search    |
| filters           | NgxSearchBarFilter                                              | {}                                                                    | Object to filter the data                           |
| withFilter           | boolean                                                         | false                                                                 | Whether to use the filter                           |
| autoInit             | boolean                                                         | true                                                                  | If it automatically starts searching                |
| nameInputSearch      | string                                                          | search                                                                | Name of the search input to send to the backend     |
| withParamsClean      | boolean                                                         | false                                                                 | If necessary, non-empty or null parameters are sent |
| customBtnApplyFilter | { text?: string, class?: string, color?: string, icon?: string} | { text: 'Aplicar Filtros', class: '', color: 'accent', icon: 'done' } | Custom button to apply filters                      |

## Outputs

| Names            | Type    | Description                            |
| ---------------- | ------- | -------------------------------------- |
| data             | unknown | Event fired when data is received      |
| filtersChange | unknown | Event triggered when filter is changed |
| loading          | boolean | Event fired when load state is changed |

## Slots

| Name       | Description                                          |
| ---------- | ---------------------------------------------------- |
| filterMenu | Filter slot here you should color the filter entries |
| buttons    | Button slot next to filter button                    |

Slots Usage Example

```html
<ngx-search-bar
  title="Novisolutions "
  (data)="getData($event)"
  path="brands"
  [isChangeUrl]="true"
  [(filters)]="filters"
>
  <!-- Aqui va los inputs de filtro -->
  <div style="padding: 10px" filterMenu>
    <ng-container>
      <mat-form-field style="width: 100%">
        <mat-label>Search</mat-label>
        <input matInput type="text" [(ngModel)]="filters['filter1'].value" />
      </mat-form-field>
      <mat-form-field style="width: 100%">
        <mat-label>Search</mat-label>
        <input matInput type="text" [(ngModel)]="filters['filter2'].value" />
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Toppings</mat-label>
        <mat-select [(ngModel)]="filters['filter3'].value" multiple>
          <mat-option value="fer">fer</mat-option>
          <mat-option value="fer2">fer2</mat-option>
          <mat-option value="fer3">fer3</mat-option>
        </mat-select>
      </mat-form-field>
    </ng-container>
  </div>

  <!-- Aqui va entre la paginacion y la barra -->
  <div style="margin-top: 20px;">
    <div *ngFor="let brand of brands">
      <div>{{ brand.name }}</div>
    </div>
  </div>
</ngx-search-bar>
```

## Example img

![Example](/forReadme.jpg)

## How to use with MatPaginator

```html
<ngx-search-bar
  [isChangeUrl]="true"
  [(filters)]="filters"
  [nameInputSearch]="'name'"
  placeholder="Buscar productos"
  [withFilter]="true"
  title="Productos"
  (data)="getData($event)"
  path="products-admin/products"
>
  <ng-container filterMenu>
    <div class="filter-menu">
      <mat-form-field>
        <input matInput placeholder="#" [(ngModel)]="filters['id'].value" />
      </mat-form-field>
      <mat-form-field>
        <input
          matInput
          placeholder="Codigo"
          [(ngModel)]="filters['code'].value"
        />
      </mat-form-field>
      <mat-form-field>
        <input
          matInput
          placeholder="Codigo Alterno"
          [(ngModel)]="filters['code_alt'].value"
        />
      </mat-form-field>
    </div>
  </ng-container>
  <ng-container buttons>
    <mat-chip-set>
      <mat-chip
        color="create"
        *ngxPermissionsOnly="permission_create"
        [routerLink]="['/admin-products/productos/create']"
        ><i class="fa-solid fa-plus"></i> Producto</mat-chip
      >
    </mat-chip-set>
  </ng-container>
</ngx-search-bar>

<mat-paginator
  [length]="paginator.length"
  [pageSize]="paginator.pageSize"
  [pageSizeOptions]="[10,20,30,40,50]"
  (page)="changePaginator($event)"
>
</mat-paginator>
```

```typescript
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent {
  constructor(
    private methods_http: MethodsHttpService,
  ) { }

  @ViewChild(NgxSearchBarComponent) searchBar: NgxSearchBarComponent
 filters: NgxSearchBarFilter = {
    id: {
      friendlyName: '#',
      value: null
    },
    code: {
      friendlyName: "Código",
      value: null,
    },
    code_alt: {
      friendlyName: "C Alt.",
      value: null
    },
  }

   paginator: PageEvent = {
    pageIndex: 0,
    length: 0,
    pageSize: 0
  }

  products: Product[] = [];

   getData(event: RequestPaginate<Product>) {
    this.products = event.data.data
    this.paginator.length = event.data.total
  }

   changePaginator(event: PageEvent): void {
    this.paginator = event
    const params = {
      pageSize: this.paginator.pageSize,
      page: this.paginator.pageIndex + 1
    }
    this.searchBar.search(params)
  }
```


