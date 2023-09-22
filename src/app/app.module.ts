import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import {
  LocationStrategy,
  HashLocationStrategy,
  DATE_PIPE_DEFAULT_TIMEZONE,
} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { AppComponent } from './app.component';

import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { AppRoutingModule } from './app.routing';

// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgxSpinnerModule } from 'ngx-spinner';
import { CustomInterceptor } from './interceptors/custom.interceptor';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MomentModule } from 'ngx-moment';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { SnackBarLoaderComponent } from './components/snack-bar-loader/snack-bar-loader.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReusingStrategy } from './class/custom-reusing-strategy';
import { OkLoginComponent } from './components/ok-login/ok-login.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AddInfoPersonModalComponent } from './components/modals/add-info-person-modal/add-info-person-modal.component';
// import { ChatTemplateComponent } from './shared/modules/chat/components/chat-template/chat-template.component';
// import { ChatComponent } from './shared/modules/chat/components/chat/chat.component';
// import { InfiniteScrollModule } from 'ngx-infinite-scroll';
// import { PopoverModule } from 'ngx-bootstrap/popover';
import {  registerPlugin } from 'ngx-filepond';
import * as FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UsersGroupsChatModalComponent } from './shared/modules/chat/components/users-groups-chat-modal/users-groups-chat-modal.component';
// import { MarkdownModule } from './Modulos/Markdown/markdown/markdown.module';
registerPlugin(FilePondPluginImagePreview);
// import { OrderModule } from 'ngx-order-pipe';
import { StoreModule } from '@ngrx/store';
import { pricesReducer } from './redux/reducers/price.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { preferenceReducer } from './redux/reducers/preference.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PreferenceEffects } from './redux/effects/preference.effect';
// import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { P403Component } from './views/error/p403/p403.component';
import { SidebarFzComponent } from './layout/sidebar-fz/sidebar-fz.component';
import { HeaderFzComponent } from './layout/header-fz/header-fz.component';
import { StorageService } from './services/storage.service';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { ConfigurationMenuComponent } from './layout/configuration-menu/configuration-menu.component';
import { notificationsReducer } from './redux/notifications/reducers/notifications.reducer';
import { NotificationEffectService } from './redux/notifications/effects/notification.effect.service';
import { MatSliderModule } from '@angular/material/slider';
import { SoundNotification } from './shared/services/sound-notification';
import { AuthService } from './services/auth.service';
import { MenuNotificationsComponent } from './layout/menu-notifications/menu-notifications.component';
import { InitializerAppNovisolutions } from './core/class/initializer-app-novisolutions';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CreateHostDirective } from './shared/directives/create-host.directive';
import { DownloadFileStatusComponent } from './core/components/download-file-status/download-file-status.component';
import { DATA_NGX_SEARCH_BAR } from '../../project/ngx-search-bar/src/public-api';
import { ChatModule } from './shared/modules/chat/chat.module';

registerLocaleData(localeEs, 'es');
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // BsDropdownModule.forRoot(),
    // TabsModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    // PopoverModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    MatDialogModule,
    MatCardModule,
    MomentModule,
    MatListModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatBadgeModule,
    MatDialogModule,
    // InfiniteScrollModule,
    // FilePondModule,
    MatTooltipModule,
    MatProgressBarModule,
    // MarkdownModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production,
    }),
    // OrderModule,
    StoreModule.forRoot({ notification: notificationsReducer, price: pricesReducer, preferences: preferenceReducer }),
    EffectsModule.forRoot([PreferenceEffects, NotificationEffectService]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
      features: {
        pause: false,
        lock: true,
        persist: true,
        dispatch: true,
        test: true
      }
    }),
    // LoadingBarRouterModule,
    MatSliderModule,
    NgxSkeletonLoaderModule,
    CreateHostDirective,
    ChatModule
  ],
  declarations: [
    // ChatSortPipe,
    SidebarFzComponent,
    HeaderFzComponent,
    AppComponent,
    ConfigurationMenuComponent,
    DefaultLayoutComponent,
    P404Component,
    P500Component,
    SnackBarLoaderComponent,
    OkLoginComponent,
    AddInfoPersonModalComponent,
   
    UsersGroupsChatModalComponent,
    P403Component,
    MenuNotificationsComponent,
    DownloadFileStatusComponent,
  ],
  providers: [
    // {
    //   // processes all errors
    //   provide: ErrorHandler,
    //   useClass: GlobalErrorHandler,
    // },
    { 
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
      // useClass: PathLocationStrategy,
    },
    {
      provide: LOCALE_ID,
      useValue: 'es',
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true,
    },
    {
      provide: RouteReuseStrategy,
      useClass: CustomReusingStrategy
    },
    {
      provide: APP_INITIALIZER,
      useFactory: InitializerAppNovisolutions,
      multi: true,
      deps: [StorageService, NgxPermissionsService, SoundNotification, AuthService],
    },

    { provide: DATE_PIPE_DEFAULT_TIMEZONE, useValue: "GMT-5" },


    // {
    //     provide: ErrorHandler,
    //     useValue: Sentry.createErrorHandler({
    //       showDialog: true,
    //     }),
    //   },
    //   {
    //     provide: Sentry.TraceService,
    //     deps: [Router],
    //   },
    //   {
    //     provide: APP_INITIALIZER,
    //     useFactory: () => () => {},
    //     deps: [Sentry.TraceService],
    //     multi: true,
    //   },
    {
      provide: DATA_NGX_SEARCH_BAR,
      useValue: {
        BASE_URL: environment.server,
        OPTIONS: {
          classContainerFilter: 'main-style'
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

