import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray
} from '@angular/forms';
import { vtexResponseSku } from '../../../../interfaces/vtex/iproducts';
import { IvtexPrices } from '../../../../interfaces/vtex/ivtex-prices';
import { SwalService } from '../../../../services/swal.service';
import { StandartSearchService } from './../../../../services/standart-search.service';


@Component({
  selector: 'app-vtex-prices',
  templateUrl: './vtex-prices.component.html',
  styleUrls: ['./vtex-prices.component.css'],
})
export class VtexPricesComponent implements OnInit {
  constructor(
    private s_standart: StandartSearchService
  ) {}
  formPrices: FormGroup = new FormGroup({
    markup: new FormControl(null),
    listPrice: new FormControl(null),
    basePrice: new FormControl(null, [Validators.required]),
    costPrice: new FormControl(null, [Validators.required]),
    fixedPrices: new FormArray([]),
  });
  // skuId:string;
  @Input() sku: vtexResponseSku;
  @Input() status: 'create' | 'edit';
  @Input() vtexPriceSku: IvtexPrices | null = null;

  public enablesInput = {
    markup: { value: false, function: () => this.calculateMarkup() },
    basePrice: { value: true, function: () => this.calculateBasePrice() },
    costPrice: { value: true, function: () => this.calculateCostPrice() },
    state: function () {
      return !this.markup.value
        ? 'markup'
        : !this.basePrice.value
        ? 'basePrice'
        : 'costPrice';
    },
  };
  // data:any;
  is: { isLoad: boolean; isErrorThreeCampus: boolean } = {
    isLoad: false,
    isErrorThreeCampus: false,
  };
  isErrorThreeCampus: boolean = false;
  ngOnInit(): void {
    if (this.vtexPriceSku) {
      const { basePrice, costPrice, markup, fixedPrices, listPrice } =
        this.vtexPriceSku;
      for (let i = 0; i < fixedPrices.length; i++) {
        this.addFixedPrices(fixedPrices[i]);
      }
      this.formPrices.setValue({
        basePrice,
        costPrice,
        markup,
        fixedPrices,
        listPrice,
      });
    }
    this.formPrices.get('markup')?.disable();
  }

  get fixedPrices(): FormArray {
    return this.formPrices.controls['fixedPrices'] as FormArray;
  }

  calculateCostPrice(): void {
    const pb = this.formPrices.get('basePrice')?.value;
    const m = this.formPrices.get('markup')?.value;
    if (pb && m) {
      const pc = pb - (100 * pb) / (100 - m);
      this.formPrices.get('costPrice')?.setValue(pc);
    }
  }

  calculateBasePrice(): void {
    const pc = this.formPrices.get('costPrice')?.value;
    const m = this.formPrices.get('markup')?.value;
    if (pc && m) {
      const pb = pc + (pc * m) / 100;
      this.formPrices.get('basePrice')?.setValue(pb);
    }
  }

  calculateMarkup(): void {
    const pc = this.formPrices.get('costPrice')?.value;
    const pb = this.formPrices.get('basePrice')?.value;
    if (pc && pb) {
      const m = (100 * (pb - pc)) / pc;
      this.formPrices.get('markup')?.setValue(m);
    }
  }

  keyUpInputThreePrices(): void {
    this.enablesInput[this.enablesInput.state()].function();
  }

  activeTwoInputs(name): void {
    for (let i in this.enablesInput) {
      if (i == name) {
        this.enablesInput[i].value = false;
        this.formPrices.get(i)?.disable();
        // this.enablesInput.state = name;
      } else if (i != 'state') {
        this.enablesInput[i].value = true;
        this.formPrices.get(i)?.enable();
      }
    }
  }

  addFixedPrices(
    data = {
      tradePolicyId: null,
      value: null,
      listPrice: null,
      minQuantity: null,
      dateRange: { from: null, to: null },
    }
  ): void {
    const formFixed = new FormGroup({
      tradePolicyId: new FormControl(data.tradePolicyId, [Validators.required]),
      value: new FormControl(data.value, [Validators.required]),
      listPrice: new FormControl(data.listPrice, [Validators.required]),
      minQuantity: new FormControl(data.minQuantity, [Validators.required]),
      dateRange: new FormGroup({
        from: new FormControl(data.dateRange.from, [Validators.required]),
        to: new FormControl(data.dateRange.to, [Validators.required]),
      }),
    });
    this.fixedPrices.push(formFixed);
  }
  removeFormFixedPrice(index): void {
    this.fixedPrices.removeAt(index);
  }

  saveInServer(): void {

    if (this.formPrices.valid) {
      this.is.isLoad = true;
      this.s_standart
        .updatePut(
          `products-admin/vtex/price-vtex/${this.sku.vtex_api_id}`,
          this.formPrices.value
        )
        .subscribe(
          (res) => {
            if ((res && res.hasOwnProperty('success'), res.success)) {
              SwalService.swalFire({
                icon: 'success',
                title: 'Guardado',
                text: 'Se a guardado con exito el nuevo precio',
                position: 'center',
              });
            }
            this.is.isLoad = false;
          },
          () => {
            this.is.isLoad = false;
          }
        );
    }
    else{
      this.formPrices.markAllAsTouched();
    }
    //  else if (!isTwoValidate) {
    //   SwalService.swalFire({
    //     position: "top-end",
    //     title: "Error",
    //     text: "Debe tener exactamente dos valores entre Precio base, Precio de costo y markup",
    //     icon: "error",
    //   });
    // }
  }
}
