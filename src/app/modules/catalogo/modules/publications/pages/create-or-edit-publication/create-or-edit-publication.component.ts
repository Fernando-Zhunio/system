import { SimpleSearchSelectorService } from './../../../../../../shared/standalone-components/simple-search/simple-search-selector.service';
import { Component, OnDestroy, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
// import { environment } from '../../../../../../../environments/environment';
import { Iaccount } from '../../../../../../interfaces/iml-info';
import { Publication } from '../../../../../../interfaces/ipublication';
import { ICategoriesParent } from '../../../../../../Modulos/tools/list-tree-dynamic/list-tree-dynamic.component';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
import { SwalService } from '../../../../../../services/swal.service';
import { SimpleInputDialogData } from '../../../../../../shared/standalone-components/simple-input-dialog/simple-input-dialog-data';
import { SimpleInputDialogComponent } from '../../../../../../shared/standalone-components/simple-input-dialog/simple-input-dialog.component';
import { ImgUploadComponent } from '../../components/img-upload/img-upload.component';

@Component({
  selector: 'app-create-or-edit-publication',
  templateUrl: './create-or-edit-publication.component.html',
  styleUrls: ['./create-or-edit-publication.component.css'],
})
export class EditPublicationComponent implements OnInit, OnDestroy {
  public urlSave: any;
  @ViewChild('templateMlCategories', { static: false }) mlCategoriesTemplateRef: TemplateRef<any>;
  @ViewChild(ImgUploadComponent) imgUpload: ImgUploadComponent;
  publication: Publication;
  listingTypes = [];
  mlAccounts: Iaccount[] = [];
  images: { id: any, url: string }[] = [];
  pathPost: string = '';
  pathDelete: string = '';

  // optionsTitle: any[] = [];
  constructor(
    protected methodsHttp: MethodsHttpService,
    protected route: ActivatedRoute,
    private spinner_ngx: NgxSpinnerService,
    protected router: Router,
    private dialog: MatDialog,
    private simpleDialog: SimpleSearchSelectorService,
  ) { }

  form: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    category: new FormControl(null, Validators.required),
    category_name: new FormControl(),
    description: new FormControl(null, [
      Validators.required,
      Validators.minLength(20),
    ]),
    qty: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    type: new FormControl(null, Validators.required),
    attribute: new FormGroup({}, [Validators.required]),
    mlaccounts: new FormControl(null, [Validators.required]),
  });

  attributes = [];
  subscriptionPredictor: Subscription;
  subscriptionAttribute: Subscription;
  isOpenCategoriesTree: boolean = false;

  ngOnInit(): void {
    this.spinner_ngx.show();
    const id = this.route.snapshot.paramMap.get('id');
    this.setPaths(id);
    this.methodsHttp
      .methodGet('catalogs/publications/' + id + '/edit')
      .subscribe((response) => {
        if (!response?.success) {
          return
        }
        this.listingTypes = response.data.listingTypes;
        this.mlAccounts = response.data.mlAccounts;
        this.publication = response.data.publication;
        this.images = this.publication?.images?.map((img) => {
          return { id: img.id, url: img.permalink };
        }) || [];
        console.log(this.images);
        this.setDataFormPublication();
        this.spinner_ngx.hide();
      });
  }

  setPaths(id): void {
    this.pathPost = `catalogs/publications/${id}/upload`;
    this.pathDelete = `catalogs/publications/${id}/images`;

  }

  addImage(event: any): void {
    this.imgUpload.addImage(event.target.files[0]);
  }

  setDataFormPublication() {
    const { name, description, ml_accounts, category, quantity, price, listing_type } = this.publication;
    const idsAccounts = this.getIdMlAccounts(ml_accounts);
    this.form.patchValue({
      name,
      description,
      category,
      qty: quantity,
      price,
      type: listing_type,
      mlaccounts: idsAccounts
    })
    if (category) {
      this.setCategoriesForEdit(category);
    }
  }

  setCategoriesForEdit(category_id: string): void {
    this.methodsHttp.methodPost(`catalogs/publications/ml/categories/${category_id}?type=full`, {}).subscribe((res) => {
      if (res?.success) {
        const categories: ICategoriesParent = {
          id: this.form.get('category')?.value,
          name: res.data.name,
          children: null
        };
        this.selectedCategories(categories);
      }
    });
  }


  // movePositionArrayImages(): void {
  //   let form_params: HttpParams = new HttpParams();
  //   this.isLoadPosition = true;
  //   this.methodsHttp
  //     .methodPut(
  //       'catalogs/publications/' + this.publication.id + '/images',
  //       form_params,
  //     )
  //     .subscribe(
  //       () => {
  //         this.isLoadPosition = false;
  //       },
  //       () => {
  //         this.isLoadPosition = false;
  //       }
  //     );
  // }

  getIdMlAccounts(mlaccounts: Iaccount[]) {
    const mlSize = mlaccounts.length;
    const ids: any = [];
    for (let i = 0; i < mlSize; i++) {
      ids.push(mlaccounts[i].id);
    }
    return ids;
  }

  keysListingTypes(): Array<string> {
    return Object.keys(this.listingTypes);
  }

  // public removeImage(id) {
  //   const index_img = this.publication.images?.findIndex((x) => x.id == id)!;
  //   if (index_img != -1) {
  //     this.methodsHttp
  //       .methodDelete(
  //         'catalogs/publications/' + this.publication.id + '/images/' + id
  //       )
  //       .subscribe((res: Iresponse) => {
  //         if (res.success) {
  //           this.publication.images?.splice(index_img, 1);
  //         }
  //       });
  //   }
  // }

  // createPublicationName(): void {
  //   if (this.formName.invalid) {
  //     this.formName.markAllAsTouched();
  //     return;
  //   }
  //   this.isLoading = true;
  //   // let observable: Observable<any>
  //   // const isCreate = this.state == 'create';
  //   // if (this.status == 'create') {
  //   //   observable = this.methodsHttp
  //   //     .methodPost('catalogs/publications', this.formName.value)
  //   // } else {
  //   //   observable = this.methodsHttp
  //   //     .methodPut(
  //   //       'catalogs/publications/' + this.publication.id,
  //   //       this.formName.value
  //   //     )
  //   // }
  //   this.methodsHttp
  //     .methodPut(
  //       `catalogs/publications/${this.publication.id}`,
  //       this.formName.value
  //     ).subscribe({
  //       next: (res) => {
  //         if (res?.success) {
  //           this.publication = res.data;
  //           if (this.status !== 'create') {
  //             this.setDataFormPublication();
  //           }
  //           this.isLoading = false;
  //         }
  //       }, error: () => {
  //         this.isLoading = false;
  //       }
  //     })
  // }

  getNameMlAccount(id) {
    return this.mlAccounts.find((x) => x.id == id)?.user_name;
  }

  removeItemMlAccount(id) {
    const accounts = this.form.get('mlaccounts')?.value;
    const index = accounts.findIndex((x) => x == id);
    if (index != -1) {
      accounts.splice(index, 1);
      this.form.get('mlaccounts')?.setValue(accounts);
    }
  }

  // predictorMl(event) {
  //   const title = event.target.value;
  //   if (this.subscriptionPredictor) {
  //     this.subscriptionPredictor.unsubscribe();
  //   }
  //   this.subscriptionPredictor = this.methodsHttp
  //     .methodPost('catalogs/publications/category-predictor', { title })
  //     .subscribe(
  //       (res: any) => {
  //         this.optionsTitle = res;
  //         const exist_cat = this.optionsTitle.findIndex(
  //           (x) => x.category_id == this.publication.category
  //         );
  //         if (exist_cat != -1) {
  //           this.getAttributes(this.publication.category);
  //         }
  //       }
  //     );
  // }

  ngOnDestroy(): void {
    if (this.subscriptionPredictor) { this.subscriptionPredictor.unsubscribe(); }
    if (this.subscriptionAttribute) { this.subscriptionAttribute.unsubscribe(); }
  }

  // alternativePredictor(event) {
  //   const title = event.target.value;
  //   // this.isLoadCategory = true;
  //   this.methodsHttp.methodGet(`http://api.mercadolibre.com/sites/MEC/domain_discovery/search?q=${title}`).subscribe(
  //     (res: any) => {
  //       this.optionsTitle = res;
  //       // this.isLoadCategory = false;
  //     },
  //     // () => {
  //     //   this.isLoadCategory = false;
  //     // }
  //   );
  // }

  publicationNow() {
    if (this.publication?.images?.length && this.publication?.images?.length < 1) {
      SwalService.swalToast('Se necesita por lo menos una imagen', 'warning');
      return;
    }
    if (this.form.invalid) {
      SwalService.swalToast('Complete todos los campos requeridos (en rojo)', 'error');
      this.form.markAllAsTouched();
      return;
    }
    this.spinner_ngx.show();
    const data: any = {
      name: this.publication.name,
      category: this.form.get('category')?.value,
      description: this.form.get('description')?.value,
      quantity: this.form.get('qty')?.value,
      price: this.form.get('price')?.value,
      listing_type: this.form.get('type')?.value,
      mlaccounts: this.form.get('mlaccounts')?.value,
    }

    const attributes = this.form.get('attribute')?.value;
    const data_request = { ...data, ...attributes };
    this.methodsHttp
      .methodPost<Publication>('catalogs/publications/' + this.publication.id, data_request)
      .subscribe(
        {
          next: (res) => {
            if (res?.success) {
              this.spinner_ngx.hide();
              this.router.navigate([
                '/catalogo/publications'
              ]);
            }
          }, error: (err) => {
            console.error(err);
            this.form.markAllAsTouched();
            this.spinner_ngx.hide();
          }
        }
      );

  }

  getAttributes(id) {
    this.form.controls['attribute'] = new FormGroup({});
    this.attributes.length = 0;
    if (this.subscriptionAttribute) { this.subscriptionAttribute.unsubscribe(); }
    this.subscriptionAttribute = this.methodsHttp
      .methodGet(`catalogs/publications/category-predictor/${id}/attributes`)
      .subscribe((res) => {
        if (res && res.hasOwnProperty('success') && res.success) {
          const attribute_copy = res.data;
          this.form.controls['attribute'] = new FormGroup({});
          const count_attribute = attribute_copy.length;
          for (let i = 0; i < count_attribute; i++) {
            if (attribute_copy[i].hasOwnProperty('values')) {
              if (attribute_copy[i].tags.catalog_required) {
                const control_select = new FormControl(null);
                const control_input = new FormControl(null);
                const newFormGroup: FormGroup = this.form.controls[
                  'attribute'
                ] as FormGroup;
                newFormGroup.addControl(
                  'attribute_manually_' + attribute_copy[i].id,
                  control_input
                );
                newFormGroup.addControl(
                  'attribute_suggest_' + attribute_copy[i].id,
                  control_select
                );
              } else {
                const control_select = new FormControl();
                const control_input = new FormControl();
                const newFormGroup = this.form.controls[
                  'attribute'
                ] as FormGroup;
                newFormGroup.addControl(
                  'attribute_suggest_' + attribute_copy[i].id,
                  control_select
                );
                newFormGroup.addControl(
                  'attribute_manually_' + attribute_copy[i].id,
                  control_input
                );
              }
            } else {
              if (attribute_copy[i].tags.catalog_required) {
                const control_input = new FormControl(null);
                const newFormGroup = this.form.controls[
                  'attribute'
                ] as FormGroup;
                newFormGroup.addControl(
                  'attribute_manually_' + attribute_copy[i].id,
                  control_input
                );
              } else {
                const control_input = new FormControl(null);
                const newFormGroup = this.form.controls[
                  'attribute'
                ] as FormGroup;

                newFormGroup.addControl(
                  'attribute_manually_' + attribute_copy[i].id,
                  control_input
                );
              }
            }
          }
          this.attributes = attribute_copy;
          this.setDataAttribute();
        }
      });
  }

  setDataAttribute(): void {
    if (
      this.publication.aditional_data &&
      this.publication.aditional_data?.attributes
    ) {
      const form_attribute: FormGroup = this.form.controls[
        'attribute'
      ] as FormGroup;
      this.publication.aditional_data.attributes.forEach((attribute) => {
        if (form_attribute.contains('attribute_manually_' + attribute.id)) {
          form_attribute.controls[
            'attribute_manually_' + attribute.id
          ].setValue(attribute.value_name);
        }
        if (form_attribute.contains('attribute_suggest_' + attribute.id)) {
          form_attribute.controls['attribute_suggest_' + attribute.id].setValue(
            attribute.value_id
          );
        }
      });
    }
  }

  openSideBarCategories(): void {
  }

  selectedCategories(categories: ICategoriesParent): void {
    this.form.get('category')?.setValue(categories.id);
    this.getAttributes(categories.id);
  }

  openOrCloseCategoriesTree(): void {
    this.isOpenCategoriesTree = !this.isOpenCategoriesTree;
  }

  editNamePublication(): void {
    const data: SimpleInputDialogData = {
      title: 'Editando publicación',
      url: `catalogs/publications/${this.publication.id}`,
      method: 'put',
      structs: [
        {
          name: 'name',
          formControl: new FormControl(this.publication.name, [Validators.required]),
          label: 'Nombre',
        },
        {
          name: 'description',
          formControl: new FormControl(this.publication.description),
          label: 'Descripción',
          type: 'textarea',
        }

      ]
    };
    this.dialog.open(SimpleInputDialogComponent, {
      maxWidth: '400px',
      data,
      closeOnNavigation: true,
    }).beforeClosed().subscribe((res) => {
      console.log({ res });
      if (!res) {
        return;
      }

      if (res.response.success && res.response.data?.id) {
        this.publication.name = res.response.data.name;
        this.publication.description = res.response.data.description;
        // this.isEditNamePublication = false;
      }

    });
  }

  openSearchCategories(): void {
    this.simpleDialog.openDialogSelector({
      path: 'catalogs/publications/category-predictor',
      loadInit: false,
      key: 'category_id',
      placeholder: 'Buscar categoría de mercado libre',
      itemTemplateRef: this.mlCategoriesTemplateRef,
    }).beforeClose().subscribe((res) => {
      console.log({ res })
      if (!res) {
        return;
      }
      const category = res.data;
      this.form.get('category')?.setValue(category.category_id);
      this.form.get('category_name')?.setValue(`${category.category_name} (${category.domain_name})`)
      this.getAttributes(category.category_id);
    });
  }

  displayFn(_option: any) {
    return this.form.get('title')?.value
  }

  isDrag = false;
  counterDrag = 0

  onDrop(event: (Event & { dataTransfer: DataTransfer })) {
    event.preventDefault();
    this.isDrag = false;
    console.log(event?.dataTransfer.files[0], 'onDrop')
    if (!event?.dataTransfer?.files[0]?.type?.includes('image')) {
      return;
    }
  }

  onDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
    this.isDrag = true
    console.log(event, 'onDragOver')
  }

  onDragEnter(event: { dataTransfer: DataTransfer }) {
    this.isDrag = true;

    this.counterDrag++;

    console.log(event?.dataTransfer.files[0], 'onDragEnter',)
  }

  onDragLeave(event) {
    event.stopPropagation();
    event.preventDefault();
    this.counterDrag--;
    if (this.counterDrag === 0) {
      this.isDrag = false
    }
    console.log(event, 'onDragLeave')
  }
}