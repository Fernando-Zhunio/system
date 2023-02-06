import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgxSearchBarPaginatorComponent } from './../../../../shared/standalone-components/ngx-search-bar-paginator/ngx-search-bar-paginator.component';
import { NgModule } from "@angular/core";
import { PublicationsRoutingModule } from "./publications.routing";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { IndexPublicationsComponent } from './pages/index-publications/index-publications.component';
import { CreateOrEditPublicationComponent } from './pages/create-or-edit-publicacion/create-or-edit-publication.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
// import { PublicationComponent } from '../../components/publication/publication.component';
import { ShowPublicationComponent } from './pages/show-publication/show-publication.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [
        IndexPublicationsComponent,
        CreateOrEditPublicationComponent,
        // PublicationComponent,
        ShowPublicationComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PublicationsRoutingModule,
        NgxSearchBarPaginatorComponent,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatChipsModule,
        NgxPermissionsModule,
        RouterModule,
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
    ],
})
export class PublicationsModule {}