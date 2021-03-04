import { BrowserModule } from "@angular/platform-browser";
import { LOCALE_ID, NgModule } from "@angular/core";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};
// import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { AppComponent } from "./app.component";

// Import containers
import { DefaultLayoutComponent } from "./containers";

import { P404Component } from "./views/error/404.component";
import { P500Component } from "./views/error/500.component";
import { LoginComponent } from "./views/login/login.component";
import { RegisterComponent } from "./views/register/register.component";

const APP_CONTAINERS = [DefaultLayoutComponent];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from "@coreui/angular";

// Import routing module
import { AppRoutingModule } from "./app.routing";

// Import 3rd party components
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TabsModule } from "ngx-bootstrap/tabs";
import { ChartsModule } from "ng2-charts";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
// import { ProductosComponent } from './pages/productos/productos.component';

// mis modulos
// import { ProductoModule } from "./pages/productos/producto.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { CustomInterceptor } from "./interceptors/custom.interceptor";

import { NgxPermissionsModule } from 'ngx-permissions';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { RepricarMlModalComponent } from './components/repricar-ml-modal/repricar-ml-modal.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { InfoViewComponent } from './components/modals/info-view/info-view.component';
// import { PublicacionesComponent } from './pages/importaciones/publicaciones/publicaciones.component';
// import { ImportacionesComponent } from './Importaciones/importaciones/importaciones.component';
// import { PrefijosCreateOrEditComponent } from './pages/administracion_productos/prefijo/prefijos-create-or-edit/prefijos-create-or-edit.component';

// import { BuscarProductosComponent } from './pages/buscar-productos/buscar-productos.component';
// import { MarcasCreateOrEditComponent } from './pages/marcas/marcas-create-or-edit/marcas-create-or-edit.component';
import {MatDialogModule} from '@angular/material/dialog';
// import { MlComponent } from './components/ml/ml.component';
import { MatCardModule } from "@angular/material/card";
import { MomentModule } from "ngx-moment";
import { StockBodegasComponent } from './components/modals/stock-bodegas/stock-bodegas.component';
import {MatTableModule} from '@angular/material/table';
import localeEs from '@angular/common/locales/es';
import {registerLocaleData} from '@angular/common';
import { SelectProviderComponent } from './components/modals/select-provider/select-provider.component';
import { ActionProviderComponent } from './components/Sheet/action-provider/action-provider.component';
import { MatListModule } from "@angular/material/list";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { InvoiceItemModalComponent } from './components/modals/invoice-item-modal/invoice-item-modal.component';
import { MatInputModule } from "@angular/material/input";
import { MatSidenavModule } from "@angular/material/sidenav";
import { HeaderSearchModule } from "./Modulos/header-search/header-search.module";
// import { InvoiceCreateOrEditComponent } from './components/invoice-create-or-edit/invoice-create-or-edit.component';
registerLocaleData(localeEs,'es')
// import { ImportComponent } from './components/import/import.component';
// import { HeaderSearchComponent } from './components/header-search/header-search.component';
import { NgxGalleryModule } from 'ngx-gallery-9';
import { CreateProviderOrContactComponent } from './components/modals/create-provider-or-contact/create-provider-or-contact.component';
import { SearchProductModalComponent } from './components/modals/search-product-modal/search-product-modal.component';
import { PublicationComponent } from './components/publication/publication.component';
import { InConstructionComponent } from './views/in-construction/in-construction.component';
import { PaginaWebComponent } from './components/pagina-web/pagina-web.component';
import { RedirectToComponent } from './components/redirect-to/redirect-to.component';
// import { PostInstagramComponent } from './components/post-instagram/post-instagram.component';
// import { OrganizationChartComponent } from './pages/information-user/organization-chart/organization-chart.component';
// import { PostComponent } from './components/post/post-facebook.component';

// import {EchoConfig, EchoService, NgxLaravelEchoModule} from 'ngx-laravel-echo';
// import { environment } from "../environments/environment";
// import Pusher from 'pusher-js';  //No curly braces around Pusher!

// export const echoConfig: EchoConfig = {
//     userModel: 'users',
//     notificationNamespace: 'App\\Notifications',
//     options: {
//         broadcaster: 'pusher',
//         key: '03045e5e16a02b690e4c',
//         // wsHost: 'http://sistema-codificacion.test',
//         // authEndpoint: 'http://api.test/broadcasting/auth',
//         // authEndpoint: 'http://sistema-codificacion.test',
//         // host: 'http://sistema-codificacion.test',
//         host: window.location.hostname,
//         wsPort: 6001,
//         wssPort: 6001,
//         disableStats: true,
//         namespace: ''
//     }
// };
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
    NgxGalleryModule
    // MatTabsModule
    
 

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
    // PostInstagramComponent,
    // OrganizationChartComponent,
    // PostComponent,
    // PaginaWebComponent,
    // PublicationComponent,
    // InvoiceCreateOrEditComponent,
    // HeaderSearchComponent,
    // ImportComponent,
    // HeaderSearchComponent,
    // MlComponent,
    // PublicacionesComponent,
    // ImportacionesComponent,
    // PrefijosCreateOrEditComponent,
    // PromocionesComponent,
    // BuscarProductosComponent,
    // MarcasCreateOrEditComponent,
    // ProductosComponent,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  
    
    {
      provide:LOCALE_ID, useValue:'es'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass:CustomInterceptor,
      multi:true
    },
  ],
  entryComponents: [
    InfoViewComponent,
    StockBodegasComponent,
    SelectProviderComponent,
    ActionProviderComponent,
    InvoiceItemModalComponent,
    CreateProviderOrContactComponent,
    SearchProductModalComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
