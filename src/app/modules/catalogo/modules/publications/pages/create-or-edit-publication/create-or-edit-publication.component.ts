// import { SimpleSearchSelectorService } from './../../../../../../shared/standalone-components/simple-search/simple-search-selector.service';
import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
// import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import collect from 'collect.js';
import {
  FileSystemFileEntry,
  NgxFileDropEntry,
} from 'ngx-file-drop';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../../../environments/environment';
// import { CreateOrEdit2 } from '../../../../../../class/create-or-edit-2';
import { Iaccount } from '../../../../../../interfaces/iml-info';
import { Iresponse } from '../../../../../../interfaces/Imports/invoice-item';
import { Publication } from '../../../../../../interfaces/ipublication';
import { ICategoriesParent } from '../../../../../../Modulos/tools/list-tree-dynamic/list-tree-dynamic.component';
import { CatalogoService } from '../../../../../../services/catalogo.service';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
// import { StandartSearchService } from '../../../../../../services/standart-search.service';
import { SwalService } from '../../../../../../services/swal.service';
import { SimpleInputDialogData } from '../../../../../../shared/standalone-components/simple-input-dialog/simple-input-dialog-data';
import { SimpleInputDialogComponent } from '../../../../../../shared/standalone-components/simple-input-dialog/simple-input-dialog.component';

@Component({
  selector: 'app-create-or-edit-publication',
  templateUrl: './create-or-edit-publication.component.html',
  styleUrls: ['./create-or-edit-publication.component.css'],
})
export class EditPublicationComponent implements OnInit, OnDestroy {
  public urlSave: any;
  // protected methodsHttp: MethodsHttpService;

  // @ViewChild('formMain', { static: false }) formMain: ElementRef;
  @ViewChild('templateMlCategories', { static: false }) mlCategoriesTemplateRef: TemplateRef<any>;
  empresas = new FormControl();
  publication: Publication;
  listing_types = [];
  ml_accounts: Iaccount[] = [];
  arrayImagen = [];
  // formName: FormGroup = new FormGroup({
  //   name: new FormControl(null, Validators.required),
  //   description: new FormControl(null),
  // });

  optionsTitle: any[] = [];
  public files: NgxFileDropEntry[] = [];
  constructor(
    // private s_standart: StandartSearchService,
    protected methodsHttp: MethodsHttpService,
    protected route: ActivatedRoute,
    private s_catalogo: CatalogoService,
    private spinner_ngx: NgxSpinnerService,
    protected router: Router,
    private dialog: MatDialog,
    // private simpleDialog: SimpleSearchSelectorService
  ) {
  }

  url_server: string = environment.server_img;
  form: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    category: new FormControl(null, Validators.required),
    category_name: new FormControl({ value: null, disabled: true }),
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
  src1: any;
  attributes = [];
  // alturaAttribute = '400px';
  isLoadCategory: boolean = false;
  // title: string;
  state: 'create' | 'edit' = 'create';
  options: any;
  isLoadPosition: boolean = false;
  isLoadPublication: boolean = false;
  // isEditNamePublication: boolean = true;
  suscription_predictor: Subscription;
  suscription_attribute: Subscription;
  categories: any[] = [];
  isOpenCategoriesTree: boolean = false;
  isLoading: boolean = false;





  ngOnInit(): void {
    this.methodsHttp.methodGet(`catalogs/publications/create`).subscribe((res) => {
      this.ml_accounts = res['ml_accounts'];
      this.listing_types = res['listing_types'];
      this.options = {
        onUpdate: (_event: any) => {
          this.movePositionArrayImages();
        },
      };
    });
    this.spinner_ngx.show();
    const id = this.route.snapshot.paramMap.get('id');
    this.methodsHttp
      .methodGet('catalogs/publications/' + id + '/edit')
      .subscribe((response) => {
        if (response?.success) {
          if (response?.data?.publication?.images && response?.data?.publication?.images.length > 0) {
            const collection = collect(response.data.publication.images);
            const sorted = collection.sortBy('position');
            response.data.publication.images = sorted.all();
          }
          this.publication = response.data.publication as Publication;
          this.setDataFormPublication();
          this.spinner_ngx.hide();
        }
      });
  }

  getFile(file: any) {
    console.log(file);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      this.src1 = fileReader.result;
    };
  }

  setDataFormPublication() {
    const { name, description, ml_accounts, category, quantity, price, listing_type } = this.publication;
    // this.formName.patchValue({ name, description });
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
    // this.formPublication.get('title')?.setValue(name);
    // this.formPublication.get('category')?.setValue(category);
    // this.formPublication
    //   .get('description')?.setValue(description);
    // this.formPublication.get('qty')?.setValue(quantity);
    // this.formPublication.get('price')?.setValue(price);
    // this.formPublication.get('type')?.setValue(listing_type);
    // this.formPublication.get('mlaccounts')?.setValue(idsAccounts);
    if (category) {
      this.setCategoriesForEdit(this.publication.category);
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
  movePositionArrayImages(): void {
    let form_params: HttpParams = new HttpParams();
    this.isLoadPosition = true;
    this.methodsHttp
      .methodPut(
        'catalogs/publications/' + this.publication.id + '/images',
        form_params,
      )
      .subscribe(
        () => {
          this.isLoadPosition = false;
        },
        () => {
          this.isLoadPosition = false;
        }
      );
  }

  getIdMlAccounts(mlaccounts: Iaccount[]) {
    const mlSize = mlaccounts.length;
    const ids: any = [];
    for (let i = 0; i < mlSize; i++) {
      ids.push(mlaccounts[i].id);
    }
    return ids;
  }

  keysListingTypes(): Array<string> {
    return Object.keys(this.listing_types);
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (file.type == 'image/jpeg' || file.type == 'image/png') {
            const form = new FormData();
            form.append('image', file);
            this.methodsHttp
              .methodPost(
                'catalogs/publications/' + this.publication.id + '/upload',
                form
              )
              .subscribe((res: Iresponse) => {
                if (res.success) {
                  this.publication.images?.push(res.data);
                }
              });
          } else {
            SwalService.swalToast(
              'Este tipo de archivo no es una imagen valida',
              'error'
            );
          }
        });
      } else {

      }
    }
  }

  public removeImage(id) {
    const index_img = this.publication.images?.findIndex((x) => x.id == id)!;
    if (index_img != -1) {
      this.methodsHttp
        .methodDelete(
          'catalogs/publications/' + this.publication.id + '/images/' + id
        )
        .subscribe((res: Iresponse) => {
          if (res.success) {
            this.publication.images?.splice(index_img, 1);
          }
        });
    }
  }

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
    return this.ml_accounts.find((x) => x.id == id)?.user_name;
  }

  removeItemMlAccount(id) {
    const accounts = this.form.get('mlaccounts')?.value;
    const index = accounts.findIndex((x) => x == id);
    if (index != -1) {
      accounts.splice(index, 1);
      this.form.get('mlaccounts')?.setValue(accounts);
    }
  }

  predictorMl(event, isEdit = false) {
    const title = event.target.value;
    this.isLoadCategory = true;
    if (this.suscription_predictor) {
      this.suscription_predictor.unsubscribe();
    }
    this.suscription_predictor = this.s_catalogo
      .predictor_keyup(title)
      .subscribe(
        (res) => {
          this.optionsTitle = res;
          this.isLoadCategory = false;
          const exist_cat = this.optionsTitle.findIndex(
            (x) => x.category_id == this.publication.category
          );
          if (exist_cat != -1) {
            this.getAttributes(this.publication.category, isEdit);
          }
        },
        () => {
          this.isLoadCategory = false;
        }
      );
  }

  ngOnDestroy(): void {
    if (this.suscription_predictor) { this.suscription_predictor.unsubscribe(); }
    if (this.suscription_attribute) { this.suscription_attribute.unsubscribe(); }
  }

  alternativePredictor(event) {
    const title = event.target.value;
    this.isLoadCategory = true;
    this.s_catalogo.categoriesMl(title).subscribe(
      (res) => {
        this.optionsTitle = res;
        this.isLoadCategory = false;
      },
      () => {
        this.isLoadCategory = false;
      }
    );
  }

  publicationNow() {
    if (this.publication?.images?.length && this.publication?.images?.length < 1) {
      SwalService.swalToast('Se necesita por lo menos una imagen', 'warning');
      return;
    }
    if (this.form.valid) {
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
        .methodPost('catalogs/publications/' + this.publication.id, data_request)
        .subscribe(
          (res: { success: boolean; data: Publication }) => {
            if (res.success) {
              this.spinner_ngx.hide();
              this.router.navigate([
                '/catalogo/publicaciones/show',
                res.data.id,
              ]);
            }
          },
          (err) => {
            console.error(err);
            this.form.markAllAsTouched();
            this.spinner_ngx.hide();
          }
        );
    } else {
      SwalService.swalToast('Complete todos los campos requeridos (en rojo)', 'error')
    }
  }

  // editName(): void {
  //   this.isEditNamePublication = true;
  // }

  getAttributes(id, isEdit = false) {
    // this.alturaAttribute = this.formMain.nativeElement.offsetHeight + 'px';
    this.form.controls['attribute'] = new FormGroup({});
    this.attributes.length = 0;
    if (this.suscription_attribute) { this.suscription_attribute.unsubscribe(); }
    this.suscription_attribute = this.s_catalogo
      .getAttributes(id)
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
                // let  newFormGroup = new FormGroup({})
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
                // let  newFormGroup = new FormGroup({})
                const newFormGroup = this.form.controls[
                  'attribute'
                ] as FormGroup;
                // newFormGroup.addControl('name',new FormControl(attribute_copy[i].name));
                newFormGroup.addControl(
                  'attribute_manually_' + attribute_copy[i].id,
                  control_input
                );
                // this.formPublication.controls['attribute'].push(newFormGroup);
              } else {
                const control_input = new FormControl(null);
                // let  newFormGroup = new FormGroup({})
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
          if (isEdit) {
            this.setDataAttribute();
          }
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
    this.optionsTitle = [
      {
        attributes: [],
        category_id: categories.id,
        category_name: categories.name,
        domain_id: null,
        domain_name: null,
      }
    ];
    this.form.get('category')?.setValue(categories.id);

    this.getAttributes(categories.id, true);
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

  // openSearchCategories(): void {
  //   this.simpleDialog.openDialogSelector({
  //     path: 'catalogs/publications/category-predictor',
  //     loadInit: false,
  //     placeholder: 'Buscar categoría de mercado libre',
  //     itemTemplateRef: this.mlCategoriesTemplateRef,
  //   })
  // }

  selectOption(option: string, event): void {
    event.stopPropagation();
    this.form.get('category')?.setValue(option)
    const optionFull = this.optionsTitle.find((item) => item.category_id === option);
    this.form.get('category_name')?.setValue(`${optionFull?.category_name} (${optionFull?.domain_name})`)
  }

  displayFn(_option: any) {
    return this.form.get('title')?.value
  }

  onDrop(event) {
    event.preventDefault();
    console.log(event, 'onDrop')
  }
  isDrag = false;

  onDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
    this.isDrag = true
    console.log(event, 'onDragOver')
  }

  onDragLeave(event) {
    event.stopPropagation();
    event.preventDefault();
    this.isDrag = false
    console.log(event, 'onDragLeave')
  }
}