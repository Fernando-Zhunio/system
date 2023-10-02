import { Location } from "@angular/common"
import { Component, OnInit } from "@angular/core"
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { ActivatedRoute } from "@angular/router"
import { ProductsService } from "../../../../../services/products.service"
import { SwalService } from "../../../../../services/swal.service"

@Component({
  selector: "app-product-create-or-edit",
  templateUrl: "./create-or-edit-product.component.html",
  styleUrls: ["./create-or-edit-product.component.css"],
})
export class CreateOrEditProductComponent implements OnInit {
  constructor(private location: Location, private s_products: ProductsService, private act_router: ActivatedRoute) {}

  formCreateOrEdit: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.max(200)]),
    code_old: new FormControl(null, [Validators.max(200)]),
    code_alt: new FormControl(null, [Validators.max(200)]),
    description: new FormControl(null, [Validators.max(200)]),
    prefix: new FormControl(null, [Validators.required, Validators.max(200)]),
    category: new FormControl(null, [Validators.required, Validators.max(200)]),
    brand: new FormControl(null, [Validators.required, Validators.max(200)]),
    sequence: new FormControl(null),
    special_code: new FormControl(null, [Validators.max(200)]),
    code: new FormControl({ value: null, disabled: true }),
  })
  isSend = false

  title: string = ""
  categories = []
  brands = []
  prefixes = []
  product_name = ""
  id: any = null
  ngOnInit(): void {
    this.act_router.data.subscribe((res) => {
      if (res["isEdit"]) {
        this.title = "Editando Producto"
        this.id = this.act_router.snapshot.paramMap.get("id")
        this.s_products.edit(this.id).subscribe((response) => {
          this.updateVariants(response.categories, response.brands, response.prefixes)
          this.product_name = response.product.name
          this.formCreateOrEdit.controls["name"].setValue(response.product.name)
          this.formCreateOrEdit.controls["code_old"].setValue(response.product.old_code)
          this.formCreateOrEdit.controls["code_alt"].setValue(response.product.code_alt)
          this.formCreateOrEdit.controls["description"].setValue(response.product.description)
          this.formCreateOrEdit.controls["prefix"].setValue(response.product.prefix_id)
          this.formCreateOrEdit.controls["category"].setValue(response.product.category_id)
          this.formCreateOrEdit.controls["brand"].setValue(response.product.brand_id)
          this.formCreateOrEdit.controls["code"].setValue(response.product.code)
          this.formCreateOrEdit.controls["sequence"].setValue(response.product.sequence.sequence_number)
          // sequence_number
        })
      } else {
        this.title = "Creando Producto"
        this.id = null
        this.s_products.create().subscribe((response) => {
          this.updateVariants(response.categories, response.brands, response.prefixes)
        })
      }
    })
  }

  updateVariants(categories, brands, prefixes) {
    this.categories = categories
    this.brands = brands
    this.prefixes = prefixes
  }

  sendData(): void {
    if (this.formCreateOrEdit.valid) {
      this.isSend = !this.isSend
      if (!this.id) {
        this.s_products.store(this.formCreateOrEdit.value).subscribe(
          (res) => {
            if (res.hasOwnProperty("success") && res.success) {
              SwalService.swalToast("Producto creado con exito", "success")
            } else {
              SwalService.swalToast(res.errors, "warning")
            }
            this.isSend = !this.isSend
          },
          (error) => {
            console.error({ error })
            this.isSend = !this.isSend
          }
        )
      } else {
        this.s_products.update(this.id, this.formCreateOrEdit.value).subscribe({
          next: (res) => {
            if (res.hasOwnProperty("success") && res.success) {
              SwalService.swalToast(res.message, "success")
            } else {
              SwalService.swalToast(res.errors, "warning")
            }
            this.isSend = !this.isSend
          },
          error: () => {
            this.isSend = !this.isSend
          },
        })
      }
    }
  }

  goBack() {
    this.location.back()
  }
}
