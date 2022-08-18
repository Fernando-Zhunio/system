import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxGalleryAction, NgxGalleryAnimation,  NgxGalleryOptions} from 'ngx-gallery-9';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxGalleryImage } from '../../../class/NgxGalleryImage';
import {
  invoiceItem,
  Iresponse,
  invoiceItemImg,
} from '../../../interfaces/Imports/invoice-item';
import { StandartSearchService } from '../../../services/standart-search.service';
import { SwalService } from '../../../services/swal.service';

@Component({
  selector: 'app-invoice-item-modal',
  templateUrl: './invoice-item-modal.component.html',
  styleUrls: ['./invoice-item-modal.component.css'],
})
export class InvoiceItemModalComponent implements OnInit {
  @ViewChild('drawer') drawer: any;
  constructor(
    private snack: MatSnackBar,
    private s_standart: StandartSearchService,
    private dialogRef: MatDialogRef<InvoiceItemModalComponent>,
    private spinner:NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id_import: number;
      id_invoice: number;
      state: string;
      formData?: invoiceItem;
    }
  ) {}
  isLoadItem: boolean = false;
  formMore: FormGroup = new FormGroup({
    new: new FormControl(null, Validators.required),
    code: new FormControl(null),
    description: new FormControl(null, Validators.required),
    quantity: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    tariff: new FormControl(''),
    images: new FormControl([]),
    note: new FormControl(null),
    product_id: new FormControl(null),
  });
  products = [];
  title: string = 'Nuevo item en la factura';
  product_relationship: any;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];
  state_edit_init = '';
  galleryAction = <NgxGalleryAction>{
    icon: 'fas fa-trash text-danger',
    onClick: (event: Event, index: number) => {
      alert(this.galleryImages[index].medium);
      const id = this.galleryImages[index].id;
      const url = 'purchase-department/imports/imagen/' + id;
      this.s_standart.destory(url).subscribe((res) => {
        this.removeImageGallery(res.data.id);
      });
    },
  };
  imgInvoice: string = 'assets/img/img_default_null.jpg';
  ngOnInit(): void {
    this.galleryOptions = [
      {
        width: '100%',
        height: '100%',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        actions: [this.galleryAction],
      },

      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '100%',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false,
      },
    ];

    if (this.data.state === 'edit') { this.title = 'Editando item de la factura'};
    if (this.data.hasOwnProperty('formData')) {
      const {
        code,
        description,
        quantity,
        price,
        tariff,
        note,
        product_id,
      } = this.data.formData;
      this.formMore.setValue({
        new: this.data.formData.new,
        code,
        description,
        quantity,
        price,
        tariff,
        images: [],
        note,
        product_id,
      });
      this.state_edit_init = JSON.stringify(this.formMore.value);
      this.product_relationship = this.data.formData.product;
      if (this.data.formData.images.length > 0){
        this.getIdImagens(this.data.formData.images);
      }
    }
  }

  getIdImagens(imagens: invoiceItemImg[]) {
    // let ids = [];
    const images = Object.assign(imagens,[]);
    images.forEach((item) => {
      this.addImageGallery(item.full_url_api, item.id);
    });
  }

  addImageGallery(img, id): void {
    this.galleryImages.push({
      small: img,
      medium: img,
      big: img,
      id,
    });

    const arr: any[] = this.formMore.controls['images'].value;
    arr.push(id);

  }

  removeImageGallery(id): void {
    const index = this.galleryImages.findIndex((x) => x.id === id);
    if (index !== -1) {
      this.galleryImages.splice(index, 1);
      const arr: [] = this.formMore.controls['images'].value;
      const indexImg = arr.findIndex(id);
      if (indexImg !== -1) {
        arr.splice(indexImg, 1);
      }
    }
  }

  cancelItemInvoice() {}

  addItem() {
    if (this.formMore.valid) {
      this.isLoadItem = true;
      this.spinner.show()
      if (this.data.state == 'create') {
        let snack1 = this.snack.open('Agregando item espera...');
        this.s_standart
          .store(
            'purchase-department/imports/' +
              this.data.id_import +
              '/invoices/' +
              this.data.id_invoice +
              '/items',
            this.formMore.value
          )
          .subscribe(
            (res) => {
              this.isLoadItem = false;
              snack1.dismiss();
              if (res.success) {
                this.snack.open('Agregado con exito', 'Ok', { duration: 2500 });
                this.dialogRef.close(res);
              } else {
                this.snack.open('Error intentalo de nuevo', 'Error', {
                  duration: 2500,
                });
              }
              this.spinner.hide();
            },
            (err) => {
              snack1.dismiss();
              this.isLoadItem = false;
              this.spinner.hide();

            }
          );
      } else {
        const state_edit_current = JSON.stringify(this.formMore.value);
        const snack1 = this.snack.open('Editando item espera...');
        if (this.state_edit_init === state_edit_current) {
          SwalService.swalToast('No se encuentran cambios', 'error');
          return;
        }
        this.s_standart
          .updatePut(
            'purchase-department/imports/' +
              this.data.id_import +
              '/invoices/' +
              this.data.id_invoice +
              '/items/' +
              this.data.formData.id,
            this.formMore.value
          )
          .subscribe(
            (res) => {
              snack1.dismiss();
              if (res.success) {
                this.snack.open('Actualizado con exito', 'Ok', {
                  duration: 2500,
                });
                this.dialogRef.close(res);
              } else {
                this.snack.open('Error intentalo de nuevo', 'Error', {
                  duration: 2500,
                });
              }
              this.isLoadItem = false;
              this.spinner.hide();

            },
            (err) => {
              snack1.dismiss();
              this.isLoadItem = false;
              this.spinner.hide();

            }
          );
      }
    }
  }
  getProduct(event) {
    this.products = event.data.data;
  }

  /*Sube la imagen al servidor y luego la anade a la galeria y al form control de imagen*/
  uploadImg(event) {
    let img: any = event.target.files[0];
    let snack1 = this.snack.open('Actualizando imagen espera...');
    this.isLoadItem = true;
    this.s_standart
      .uploadImg(
        'purchase-department/imports/' +
          this.data.id_import +
          '/upload-item-images',
        img
      )
      .subscribe(
        (res) => {
          snack1.dismiss();
          if (res.success) {
            this.imgInvoice = res.data.full_url_api;
            this.addImageGallery(this.imgInvoice, res.data.id);
            this.snack.open('Imagen subida con exito', 'Ok', {
              duration: 2500,
            });
          }
          this.isLoadItem = false;
        },
        (error) => {
          snack1.dismiss();
          // this.loader = false;
          console.log(error);
          this.isLoadItem = false;

          // alert('Imagen supera el tamaño permitido');
        }
      );
    // }
  }

  /* Captura la primera imagen de los producto que busca si tiene
   prestashop_product captura la primera imagen si no captura la
   de ml_info si no una imagen por defecto*/
  captureImagenProduct(i): string | boolean {
    if (this.products[i]?.prestashop_products?.length > 0) {
      return this.products[i].prestashop_products[0].image;
    }
    if (this.products[i].ml_infos?.length > 0) {
      return this.products[i].ml_infos[0].image;
    }

    return 'assets/img/img_default_null.jpg';
  }

  // Se ejecuta cuando se da click en algun producto que busco y se crea el producto relacionado
  selectProductRelationship(index) {
    this.product_relationship = this.products[index];
    this.drawer.toggle();
    this.formMore.controls['product_id'].setValue(this.product_relationship.id);
  }

  // Captura la imagen de el producto relacionado con el item si no tiene de pone una iamgen por defecto
  captureImagenProductInique(): string | boolean {
    if (this.product_relationship.prestashop_products?.length > 0) {
      return this.product_relationship.prestashop_products[0].image;
    }
    if (this.product_relationship.ml_infos?.length > 0) {
      return this.product_relationship.ml_infos[0].image;
    }

    return 'assets/img/img_default_null.jpg';
  }

  removeProductRelationship() {
    this.product_relationship = null;
    this.formMore.controls['product_id'].setValue(null);
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.spinner.hide();
  }
}
