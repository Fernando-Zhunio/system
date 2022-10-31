import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslatefzModule } from '../../../../../../Modulos/translatefz/translatefz.module';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
import { Price, ProductPrice } from '../../../prices/interfaces/price';
import { Import } from '../../interfaces/imports';
import { IMPORT_ROUTE_API_SHOW } from '../../routes-api/imports-routes-api';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    TranslatefzModule,
    MatProgressBarModule,
    MatButtonModule
  ],
  selector: 'app-show-import-dialog',
  templateUrl: './show-import-dialog.component.html',
  styleUrls: ['./show-import-dialog.component.scss']
})
export class ShowImportDialogComponent implements OnInit {


  import: Import;
  products: {
    product: ProductPrice,
    price: Price
  }[]

  isLoading: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) private externalData: { importId: number },
    private mhs: MethodsHttpService
  ) { }

  ngOnInit() {
    this.getImportApi();
  }

  getImportApi(): void {
    this.isLoading = true;
    this.mhs.methodGet(IMPORT_ROUTE_API_SHOW(this.externalData.importId))
      .subscribe((response) => {
        if (response.success) {
          this.import = response.data?.import;
          this.products = response.data?.products;
          console.log(this.products);
        }
        this.isLoading = false;
      });
  }

}
