import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
import { CreateHostService } from '../../../../../../shared/services/create-host.service';
import { CreateOrEditImportModalComponent } from '../../../imports/components/create-or-edit-import-modal/create-or-edit-import-modal.component';
import { Import } from '../../../imports/interfaces/imports';
import { Price, ProductPrice } from '../../interfaces/price';
import { PriceGroup } from '../../interfaces/price-group';
import { PRICE_ROUTE_API_GROUP_PRICE, PRICE_PRODUCT_ROUTE_API_STORE_OR_SHOW } from '../../routes-api/prices-routes-api';
import { SearchImportDialogComponent } from '../search-import-dialog/search-import-dialog.component';

interface Data {
  pricesGroups: PriceGroup[];
  product: ProductPrice
}

@Component({
  selector: 'app-create-or-edit-prices-button-sheet',
  templateUrl: './create-or-edit-prices-button-sheet.component.html',
  styleUrls: ['./create-or-edit-prices-button-sheet.component.css']
})
export class CreateOrEditPricesButtonSheetComponent implements OnInit {

  constructor(private dialog: MatDialog, private chs: CreateHostService, private btnSheetRef: MatBottomSheetRef<CreateOrEditPricesButtonSheetComponent>, private mhs: MethodsHttpService, @Inject(MAT_BOTTOM_SHEET_DATA) public externalData: Data) { }

  title: string = 'Agregando precios';
  form: FormGroup = new FormGroup({
    import_id: new FormControl(null, [Validators.required]),
    import_code: new FormControl({value: '', disabled: true}),
  });
  pricesGroups: PriceGroup[] = [];
  isLoading: boolean = false;
  ngOnInit() {
    this.initGroupPrice();
    this.initIfEditOrCreate();
  }

  initIfEditOrCreate(): void {
    if (this.externalData.product) {
      this.title = 'Editando precios';
      this.assignData(this.externalData.product.last_prices);
    }
  }

  initGroupPrice(): void {
    if (this.externalData.pricesGroups.length > 0) {
      this.pricesGroups = this.externalData.pricesGroups;
      this.generateTemplateForm(this.externalData.pricesGroups);
    } else {
      this.isLoading = true;
      this.mhs.methodGet(PRICE_ROUTE_API_GROUP_PRICE).subscribe({
        next: (res) => {
          this.generateTemplateForm(res.data);
          this.pricesGroups = res.data;
          this.generateTemplateForm(this.pricesGroups);
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
    }
  }

  generateTemplateForm(group): void {
    group.forEach((element) => {
      const control_input = new FormControl(null);
      const control_input_with_tax = new FormControl(null);
      this.form.addControl(
        `price_group_${element.id}`,
        control_input
      );
      this.form.addControl(
        `tax_price_group_${element.id}`,
        control_input_with_tax
      );
    });
  }

  addOrRemoveTax(id: number, isTax = false): void {
    console.log(this.form.get('price_group_' + id)?.value);
    const name = 'price_group_' + id;
    if (isTax) {
      const price_out_tax = this.form.get('tax_' + name)?.value / 1.12;

      this.form.get(name)?.setValue(price_out_tax.toFixed(2));
    } else {
      const price_with_tax = this.form.get(name)?.value * 1.12;
      console.log(price_with_tax);

      this.form.get('tax_' + name)?.setValue(price_with_tax.toFixed(2));
    }
  }

  saveInServer(): void {
    this.isLoading = true;
    this.mhs
      .methodPost<ProductPrice>(
        PRICE_PRODUCT_ROUTE_API_STORE_OR_SHOW(this.externalData.product.id),
        this.form.value
      )
      .subscribe(
        {
          next: (res) => {
            this.isLoading = false;
            this.btnSheetRef.dismiss(res);
          },
          error: () => {
            this.isLoading = false;
          }
        }
      );
  }

  assignData(prices: Price[] | undefined): void {
    if (prices) {
      prices.forEach(element => {
        this.form.get('price_group_' + element.price_group_id)?.setValue(element.price.toFixed(2));
        this.form.get('tax_price_group_' + element.price_group_id)?.setValue((element.price * 1.12).toFixed(2));
      });
    }
  }

  openSearchImportDialog(): void {
    this.chs.injectComponent(SearchImportDialogComponent)
    .beforeClose().subscribe((res: {data:Import}) => {
      if (res?.data) {
        console.log(res.data);
        this.setInputImport(res.data);
      }
    });
  }

  openCreateImportDialog(): void {
    this.dialog.open(CreateOrEditImportModalComponent).beforeClosed().subscribe((response) => {
      if (response?.success) {
        // console.log({import: response});
        this.setInputImport(response.data);
      }
    });
  }

  setInputImport(importation: Import): void {
    console.log(importation.code);
    this.form.get('import_id')?.setValue(importation.id);
    this.form.get('import_code')?.setValue(importation.code);
  }

  close(): void {
    this.btnSheetRef.dismiss();
  }

}
