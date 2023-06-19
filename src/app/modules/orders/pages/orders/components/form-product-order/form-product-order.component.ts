import { Component, Inject, OnInit } from "@angular/core"
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { MethodsHttpService } from "../../../../../../services/methods-http.service"
import { SwalService } from "../../../../../../services/swal.service"
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"
import { SimpleSearchComponent } from "../../../../../../shared/standalone-components/simple-search/simple-search.component"
import { SimpleSearchSelectorService } from "../../../../../../shared/standalone-components/simple-search/simple-search-selector.service"

@Component({
  selector: "app-form-product-order",
  templateUrl: "./form-product-order.component.html",
  styleUrls: ["./form-product-order.component.scss"],
})
export class FormProductOrderComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<FormProductOrderComponent>,
    private methodsHttpService: MethodsHttpService,
    @Inject(MAT_DIALOG_DATA) public dataExternal: {id: number, item?: any, isEdit: boolean},
    private chs: SimpleSearchSelectorService
  ) {}

  ngOnInit(): void {
    this.fillData()
  }

  fillData(): void {
    if (this.dataExternal.isEdit) {
      this.form.patchValue({
        quantity: this.dataExternal.item.quantity,
        price: this.dataExternal.item.price,
        description: this.dataExternal.item.description,
        product: this.dataExternal.item?.product,
      })
    }
  }

  isLoading = false
  form: FormGroup = new FormGroup({
    product: new FormControl(null, [Validators.required]),
    quantity: new FormControl(1, [Validators.required]),
    description: new FormControl(null),
    price: new FormControl(null, [Validators.required]),
  })

  addItem(): void {
    this.isLoading = true
    const values = { ...this.form.value, product_id: this.form.getRawValue().product.id }
    const observable = this.dataExternal.isEdit ? 
    this.methodsHttpService.methodPut(`system-orders/orders/${this.dataExternal.id}/items/${this.dataExternal.item.id}`, values) : 
    this.methodsHttpService.methodPost(`system-orders/orders/${this.dataExternal.id}/items`, values);
    observable
    .subscribe({
      next: (res) => {
        if (res?.success) {
          this.form.reset()
          SwalService.swalToast(this.dataExternal.isEdit ? 'Editado correctamente' : 'Agregado correctamente', 'success')
          this.dialogRef.close({success: true})
          // this.changeOrder.emit('change');
        }
        this.isLoading = false
      },
      error: () => {
        SwalService.swalToast("Ups! ocurrió un problema, vuelve a intentarlo", "error")
        this.isLoading = false
      },
    })
  }

  openSearchProducts(): void {
    this.chs.openDialog(
      SimpleSearchComponent,
      {
        path: 'system-orders/products',
        isMultiSelection: false
      }).beforeClose().subscribe(res => {
        if (res?.data) {
          this.form.get('product')?.setValue(res.data);
        }
      });
  }
}
