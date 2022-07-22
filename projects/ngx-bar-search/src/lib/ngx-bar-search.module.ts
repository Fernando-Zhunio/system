import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InjectionToken, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { NgxBarSearchComponent } from './ngx-bar-search.component';
import { NgxBarSearchService } from './ngx-bar-search.service';

// export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG_PARAMS');
export class AppConfig {
  serverUrl: string;
}

@NgModule({
  declarations: [
    NgxBarSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    MatIconModule,
    MatChipsModule,
    MatBadgeModule,
    MatMenuModule,
    MatButtonModule,
  ],
  exports: [
    NgxBarSearchComponent
  ]
})
export class NgxBarSearchModule {

  static forRoot(conf?: AppConfig): ModuleWithProviders<NgxBarSearchModule> {
    return {
      ngModule: NgxBarSearchModule,
      providers: [NgxBarSearchService, { provide: AppConfig, useValue: conf }]
    }
  }
}
