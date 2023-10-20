# Ngx Search Bar

The package needs angular material to work (This package is compatible with angular 15)

## Installation

To install this library, run:

```bash
$ npm install ngx-search-bar-fz --save
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"

import { AppComponent } from "./app.component"

// Import your library
import { DATA_FOR_SEARCH_BAR, NgxSearchBarModule } from "ngx-search-bar-fz"

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,

    // Specify your library as an import
    NgxSearchBarModule,
  ],
  providers: [
    {
      provide: NGX_SEARCH_BAR_DATA,
      useValue: {
        BASE_URL: environment.serverBar,
        OPTIONS: {
          classContainerFilter: "main-style",
          fnScrollTop: () => {
            window.scrollTo(0, 0)
          },
          stickyTop: "55px",
        },
        OPTIONS_PAGINATE: {
          fnGetLength: (arg: any) => {
            return arg.data.total
          },
        },
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Usage in templates is as simple as:

```html
<ngx-search-bar
  [isChangeUrl]="false"
  nameInputSearch="name"
  placeholder="Search products"
  title="Products"
  [autoInit]="true"
  (data)="getData($event)"
  [isBarExpand]="false"
  maxWidth="50%"
  [isSticky]="true"
  path="products-admin/products">
  <!-- Optional filters -->
  <ngx-search-bar-form-filter [filters]="formFilter" [withParamsClean]="false">
    <div [formGroup]="formFilter" class="gap-2 pt-2 grid md:grid-cols-2 w-full">
      <mat-form-field class="w-full" appearance="outline">
        <mat-label>ID</mat-label>
        <input matInput placeholder="#" formControlName="id" />
      </mat-form-field>
      <!-- More filters -->
    </div>
  </ngx-search-bar-form-filter>

  <!-- Optional buttons -->
  <ng-container buttons>
    <button class="!bg-orange-500 !text-white" mat-raised-button [routerLink]="['/admin-products/products/create']">
      <i class="fa-solid fa-plus"></i>
      Producto
    </button>
  </ng-container>

  <div class="overflow-auto p-2">
    <!-- render information -->
  </div>
  <!-- Optional paginator -->
  <ngx-search-bar-paginator></ngx-search-bar-paginator>
</ngx-search-bar>
```
# NgxSearchBarComponent
## Inputs 

| Name | Type | Default | Description |
| -------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------- |
| placeholder |string  | 'Search' | Entry placeholder |
| title|string| null| Component Title |
|path|string| search|Route for requests|
|isChangeUrl|boolean|false|If the url should be changed when doing a search
| autoInit|boolean|true|If it automatically starts searching
|nameInputSearch|string| 'search'| search Name of the search input to send to the backend|
isBarExpand| boolean| false| If it is an expanded bar|
size| number | 1 | grow bar css|
maxWidth| string | '100%' | maximum width of the bar|
isSticky| boolean | true |si siempre es visible arriba(le afecta el top con el input stickyTop)|
fnScrollTop| Function| null | Function to return to the top by scrolling|
notScroll| boolean | false | If you scroll up with the function|




## Outputs

| Names         | Type    | Description                            |
| ------------- | ------- | -------------------------------------- |
| data          | unknown | Event fired when data is received
| loading       | boolean | Event fired when load state is changed |

## Slots

| Name       | Description                                          |
| ---------- | ---------------------------------------------------- |
| ngx-search-bar-form-filter | Component for filters
|ngx-search-bar-paginator | Component for paginator
| buttons    | Button slot next to filter button| 

## Example img

![Example](/forReadme.jpg)

# NgxSearchBarFormFilterComponent
## Inputs

|Name|Type|Default|Description|
|--------|--------|--------|--------|
|filters|FormGroup|is required|filter form that is sent to the backend|
textBtnApply|string|'Apply Filters'| Apply button text|
textBtnClose|string|'Close Filters'| Close button text|
withParamsClean|boolean|false|If it should clean the params|
classPanel|string|null|Class for panel of filters|


# NgxSearchBarPaginatorComponent
## Inputs

|Name|Type|Default|Description|
|--------|--------|--------|--------|
|fnGetLength|Function|null|Function that returns the length of the data|
|fnGetPage|Function|null|Function that returns the current page|