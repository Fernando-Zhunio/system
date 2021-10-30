import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import {
  LocationStrategy,
  HashLocationStrategy,

  PathLocationStrategy,
} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};
// import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
const APP_CONTAINERS = [DefaultLayoutComponent];
import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgxSpinnerModule } from 'ngx-spinner';
import { CustomInterceptor } from './interceptors/custom.interceptor';

import { NgxPermissionsModule } from 'ngx-permissions';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RepricarMlModalComponent } from './components/repricar-ml-modal/repricar-ml-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { InfoViewComponent } from './components/modals/info-view/info-view.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MomentModule } from 'ngx-moment';
import { StockBodegasComponent } from './components/modals/stock-bodegas/stock-bodegas.component';
import { MatTableModule } from '@angular/material/table';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { SelectProviderComponent } from './components/modals/select-provider/select-provider.component';
import { ActionProviderComponent } from './components/Sheet/action-provider/action-provider.component';
import { MatListModule } from '@angular/material/list';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { InvoiceItemModalComponent } from './components/modals/invoice-item-modal/invoice-item-modal.component';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderSearchModule } from './Modulos/header-search/header-search.module';
import { NgxGalleryModule } from 'ngx-gallery-9';
import { CreateProviderOrContactComponent } from './components/modals/create-provider-or-contact/create-provider-or-contact.component';
import { SearchProductModalComponent } from './components/modals/search-product-modal/search-product-modal.component';
import { InConstructionComponent } from './views/in-construction/in-construction.component';
import { RedirectToComponent } from './components/redirect-to/redirect-to.component';
import { SnackBarLoaderComponent } from './components/snack-bar-loader/snack-bar-loader.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReusingStrategy } from './class/custom-reusing-strategy';
import { OkLoginComponent } from './components/ok-login/ok-login.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MatBadgeModule } from '@angular/material/badge';
import { FormRecuperationPasswordComponent } from './views/form-recuperation-password/form-recuperation-password.component';
import { AddInfoPersonModalComponent } from './components/modals/add-info-person-modal/add-info-person-modal.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { ChatTemplateComponent } from './components/chat-template/chat-template.component';
import {  NgxEmojiPickerModule  } from 'ngx-emoji-picker';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { ChatComponent } from './components/chat-template/chat/chat.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FilePondModule, registerPlugin } from 'ngx-filepond';
import * as FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { MatTooltipModule } from '@angular/material/tooltip';

// import FilePondPluginFileValidateType from 'filepond';
registerPlugin(FilePondPluginImagePreview);
// import { CreateGroupChatComponent } from './pages/chats/create-group-chat/create-group-chat.component';

// import { DownloadStockComponent } from './pages/reportes/download-stock/download-stock.component';
// import { ModalRealistComponent } from './components/ml/tools/modal-realist/modal-realist.component';

registerLocaleData(localeEs, 'es');
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // ProductoModule,
    NgxSpinnerModule,
    NgxPermissionsModule.forRoot(),
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    MatCardModule,
    MomentModule,
    MatTableModule,
    MatListModule,
    MatBottomSheetModule,
    MatInputModule,
    MatSidenavModule,
    HeaderSearchModule,
    NgxGalleryModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatBadgeModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxEmojiPickerModule,
    TextareaAutosizeModule,
    OverlayModule,
    InfiniteScrollModule,
    FilePondModule,
    MatTooltipModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    RepricarMlModalComponent,
    InfoViewComponent,
    StockBodegasComponent,
    SelectProviderComponent,
    ActionProviderComponent,
    InvoiceItemModalComponent,
    CreateProviderOrContactComponent,
    SearchProductModalComponent,
    InConstructionComponent,
    RedirectToComponent,
    SnackBarLoaderComponent,
    OkLoginComponent,
    FormRecuperationPasswordComponent,
    AddInfoPersonModalComponent,
    ChatTemplateComponent,
    ChatComponent,
    // CreateGroupChatComponent,



    // DownloadStockComponent,
    // ModalRealistComponent,
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
    // { provide: RouteReuseStrategy, useClass: CustomReusingStrategy },
    { provide: RouteReuseStrategy, useClass: CustomReusingStrategy },
  ],
  entryComponents: [
    InfoViewComponent,
    StockBodegasComponent,
    SelectProviderComponent,
    ActionProviderComponent,
    InvoiceItemModalComponent,
    CreateProviderOrContactComponent,
    SearchProductModalComponent,
    AddInfoPersonModalComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
