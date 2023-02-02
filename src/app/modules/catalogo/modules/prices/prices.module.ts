import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricesIndexComponent } from './pages/prices-index/prices-index.component';
// import { SearchTemplateModule } from '../../../../Modulos/search-template/search-template.module';
import { ConvertsModule } from '../../../../Modulos/converts/converts.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PricesRoutingModule } from './prices-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { CreateOrEditPriceComponent } from './create-or-edit-price/create-or-edit-price.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ModalListPricesComponent } from './tools/modal-list-prices/modal-list-prices.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FilePondModule } from 'ngx-filepond';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SearchTemplateTableComponent } from '../../../../Modulos/search-template/search-template-table/search-template-table.component';
import { MatTableModule } from '@angular/material/table';
import { CreateOrEditPricesButtonSheetComponent } from './components/create-or-edit-prices-button-sheet/create-or-edit-prices-button-sheet.component';
import { MatListModule } from '@angular/material/list';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { CreateOrEditImportModalComponent } from '../imports/components/create-or-edit-import-modal/create-or-edit-import-modal.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { SimpleSearchComponent } from '../../../../shared/standalone-components/simple-search/simple-search.component';

@NgModule({
    declarations: [CreateOrEditPricesButtonSheetComponent, PricesIndexComponent, CreateOrEditPriceComponent, ModalListPricesComponent],
    imports: [
        CommonModule,
        PricesRoutingModule,
        // SearchTemplateModule,
        ConvertsModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatChipsModule,
        MatSidenavModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        FilePondModule,
        NgxPermissionsModule,
        SearchTemplateTableComponent,
        MatTableModule,
        MatListModule,
        MatBottomSheetModule,
        CreateOrEditImportModalComponent,
        ClipboardModule,
        SimpleSearchComponent
    ]
})
export class PricesModule { }
