import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
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
import { EditPublicationComponent } from './pages/create-or-edit-publication/create-or-edit-publication.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
// import { PublicationComponent } from '../../components/publication/publication.component';
import { ShowPublicationComponent } from './pages/show-publication/show-publication.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { CreatePublicationComponent } from './components/create-publication/create-publication.component';
import { SimpleInputDialogComponent } from '../../../../shared/standalone-components/simple-input-dialog/simple-input-dialog.component';

@NgModule({
    declarations: [
        IndexPublicationsComponent,
        EditPublicationComponent,
        // PublicationComponent,
        ShowPublicationComponent,
        CreatePublicationComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PublicationsRoutingModule,
        NgxSearchBarPaginatorComponent,
        SimpleInputDialogComponent,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatChipsModule,
        NgxPermissionsModule,
        RouterModule,
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        NgOptimizedImage,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatDialogModule,
        MatAutocompleteModule,
    ],
})
export class PublicationsModule {}