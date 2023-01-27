import { NgxSearchBarButtonsSetComponent } from './components/ngx-search-bar-buttons-set/ngx-search-bar-buttons-set.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSearchBarComponent } from './components/ngx-search-bar/ngx-search-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { MatBadgeModule } from '@angular/material/badge';
import { MatPaginatorModule} from '@angular/material/paginator';
import { NgxSearchBarFormFilterComponent } from './components/ngx-search-bar-form-filter/ngx-search-bar-form-filter.component';

@NgModule({
  declarations: [
    NgxSearchBarComponent,
    NgxSearchBarButtonsSetComponent,
    NgxSearchBarFormFilterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatMenuModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
  ],
  exports: [
    NgxSearchBarComponent,
    NgxSearchBarButtonsSetComponent,
    NgxSearchBarFormFilterComponent,
  ],
  providers: [
  ]
})
export class NgxSearchBarModule { }
