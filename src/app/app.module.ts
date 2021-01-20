import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

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
    MomentModule

    
 

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
      provide: HTTP_INTERCEPTORS,
      useClass:CustomInterceptor,
      multi:true
    },
  ],
  entryComponents: [
    InfoViewComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
