import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderSearchComponent } from '../../components/header-search/header-search.component';
// import { MatTabsModule } from '@angular/material/tabs';
// import { MatIconModule } from '@angular/material/icon';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';



@NgModule({
  declarations: [HeaderSearchComponent],
  imports: [
    CommonModule,
    // MatTabsModule,
    // MatIconModule,
    // MatFormFieldModule,
    // MatSelectModule,
    FormsModule,
    MatButtonModule,
    MatMenuModule,
    MatChipsModule,
    MatBadgeModule,
  ],
  exports: [
    HeaderSearchComponent,
  ]
})
export class HeaderSearchModule { }
