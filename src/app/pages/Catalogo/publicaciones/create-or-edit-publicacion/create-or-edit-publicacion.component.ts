// import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { MatSelectionList, MatSelectionListChange } from "@angular/material/list";
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry,
} from 'ngx-file-drop';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Iaccount } from '../../../../interfaces/iml-info';
import { Iresponse } from '../../../../interfaces/Imports/invoice-item';
import { Ipublication } from '../../../../interfaces/ipublication';
import { CatalogoService } from '../../../../services/catalogo.service';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { SwalService } from '../../../../services/swal.service';

@Component({
  selector: 'app-create-or-edit-publicacion',
  templateUrl: './create-or-edit-publicacion.component.html',
  styleUrls: ['./create-or-edit-publicacion.component.css'],
})
export class CreateOrEditPublicacionComponent implements OnInit {
  @ViewChild('formMain', { static: false }) formMain: ElementRef;
  empresas = new FormControl();
  publication: Ipublication;
  listing_types = [];
  ml_accounts: Iaccount[] = [];
  arrayImagen = [];
  id: number = 1;
  // publication_current;

  formName: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
  });

  optionsTitle = [];
  public files: NgxFileDropEntry[] = [];
  constructor(
    private s_standart: StandartSearchService,
    private act_router: ActivatedRoute,
    private s_catalogo: CatalogoService,
    private spinner_ngx: NgxSpinnerService,
    private router: Router
  ) {}

  url_server: string = environment.server_img;
  formPublication: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    category: new FormControl(null, Validators.required),
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
  alturaAttribute = '400px';
  isLoadCategory: boolean = false;
  title: string;
  state: 'create' | 'edit' = 'create';
  options: any;
  isLoadPosition: boolean = false;
  isLoadPublication: boolean = false;
  isSelectCategory: boolean;
  isEditNamePublication: boolean = true;
  suscription_predictor: Subscription;
  suscription_attribute: Subscription;
  // aditional_data:any;
  ngOnInit(): void {
    this.s_catalogo.create_publications().subscribe((res) => {
      this.ml_accounts = res.ml_accounts;
      this.listing_types = res.listing_types;
      this.options = {
        onUpdate: (event: any) => {
          this.movePositionArrayImages();
        },
      };
    });
    this.act_router.data.subscribe((res) => {
      if (res.isEdit) {
        this.state = 'edit';
        this.spinner_ngx.show();
        this.isEditNamePublication = false;
        this.title = 'Editando Publication #' + this.id;
        this.id = Number.parseInt(this.act_router.snapshot.paramMap.get('id'));
        this.s_standart
          .show('catalogs/publications/' + this.id + '/edit')
          .subscribe((response) => {
            if (
              response &&
              response.hasOwnProperty('success') &&
              response.success
            ) {
              this.isEditNamePublication = false;
              this.publication = response.data.publication as Ipublication;
              this.setDataFormPublication();
              this.spinner_ngx.hide();
            }
          });
      } else {
        this.title = 'Creando Publicacion';
        this.id = null;
      }
    });
  }

  setDataFormPublication() {
    this.formName.setValue({ name: this.publication.name });
    const idsAccounts = this.getIdMlAccounts(this.publication.ml_accounts);
    this.formPublication.get('title').setValue(this.publication.name);
    this.formPublication.get('category').setValue(this.publication.category);
    this.formPublication
      .get('description')
      .setValue(this.publication.description);
    this.formPublication.get('qty').setValue(this.publication.quantity);
    this.formPublication.get('price').setValue(this.publication.price);
    this.formPublication.get('type').setValue(this.publication.listing_type);
    this.formPublication.get('mlaccounts').setValue(idsAccounts);
    const title = { target: { value: this.publication.name } };
    this.predictorMl(title, true);
  }
  movePositionArrayImages(): void {
    let form_params: HttpParams = new HttpParams();
    this.isLoadPosition = true;
    const id_images = this.publication.images.map((value) => {
      form_params = form_params.append('ids[]', String(value.id));
      return value;
    });
    this.s_standart
      .updatePut(
        'catalogs/publications/' + this.publication.id + '/images',
        form_params,
        false
      )
      .subscribe(
        (res) => {
          this.isLoadPosition = false;
        },
        (err) => {
          this.isLoadPosition = false;
        }
      );
  }

  getIdMlAccounts(mlaccounts: Iaccount[]) {
    const mlSize = mlaccounts.length;
    const ids = [];
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
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();

        fileEntry.file((file: File) => {
          if (file.type == 'image/jpeg' || file.type == 'image/png') {
            this.s_standart
              .uploadImg(
                'catalogs/publications/' + this.publication.id + '/upload',
                file
              )
              .subscribe((res: Iresponse) => {
                if (res.success) {
                  this.publication.images.push(res.data);
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
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }

  public fileOver(event) {
  }

  public fileLeave(event) {
  }

  public removeImage(id) {
    const index_img = this.publication.images.findIndex((x) => x.id == id);
    if (index_img != -1) {
      this.s_standart
        .destory(
          'catalogs/publications/' + this.publication.id + '/images/' + id
        )
        .subscribe((res: Iresponse) => {
          if (res.success) {
            this.publication.images.splice(index_img, 1);
          }
        });
    }
  }

  createPulicationName(): void {
    if (this.formName.valid) {
      if (this.state == 'create') {
        this.s_standart
          .store('catalogs/publications', this.formName.value)
          .subscribe((res) => {
            if (res.success) {
              this.isEditNamePublication = false;
              this.publication = res.data;
            }
          });
      } else {
        this.s_standart
          .updatePut(
            'catalogs/publications/' + this.publication.id,
            this.formName.value
          )
          .subscribe((res) => {
            if (res.success) {
              this.isEditNamePublication = false;
              this.publication = res.data;
              this.setDataFormPublication();
            }
          });
      }
    }
  }

  getNameMlAccount(id) {
    return this.ml_accounts.find((x) => x.id == id).user_name;
  }

  removeItemMlAccount(id) {
    const accounts = this.formPublication.get('mlaccounts').value;
    const index = accounts.findIndex((x) => x == id);
    if (index != -1) {
      accounts.splice(index, 1);
      this.formPublication.get('mlaccounts').setValue(accounts);
    }
  }

  predictorMl(event, isEdit = false) {
    let title = event.target.value;
    this.isLoadCategory = true;
    if (this.suscription_predictor) {
      this.suscription_predictor.unsubscribe();
    }
    // this.s_catalogo.categoriesMl(title).subscribe(
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
        (err) => {
          this.isLoadCategory = false;
        }
      );
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.suscription_predictor) this.suscription_predictor.unsubscribe();
    if (this.suscription_attribute) this.suscription_attribute.unsubscribe();
  }

  alternativePredictor(event) {
    let title = event.target.value;
    this.isLoadCategory = true;
    this.s_catalogo.categoriesMl(title).subscribe(
      (res) => {
        this.optionsTitle = res;
        this.isLoadCategory = false;
      },
      (err) => {
        this.isLoadCategory = false;
      }
    );
  }

  publicationNow() {
    // this.getFormValidationErrors();
    if (this.publication.images.length < 1) {
      SwalService.swalToast('Se necesita por lo menos una imagen', 'warning');
      return;
    }
    if (this.formPublication.valid) {
      this.spinner_ngx.show();
      const data = {
        name: this.publication.name,
        category: this.formPublication.get('category').value,
        description: this.formPublication.get('description').value,
        quantity: this.formPublication.get('qty').value,
        price: this.formPublication.get('price').value,
        listing_type: this.formPublication.get('type').value,
        mlaccounts: this.formPublication.get('mlaccounts').value,
      };
      const attributes = this.formPublication.get('attribute').value;
      const data_request = { ...data, ...attributes };
      this.s_standart
        .store('catalogs/publications/' + this.publication.id, data_request)
        .subscribe(
          (res: { success: boolean; data: Ipublication }) => {
            if (res.success) {
              this.spinner_ngx.hide();
              this.router.navigate([
                '/catalogo/publicaciones/show',
                res.data.id,
              ]);
            }
          },
          (err) => {
            console.log(err);
            this.formPublication.markAllAsTouched();
            this.spinner_ngx.hide();
          }
        );
    }
    else{
      SwalService.swalToast('Complete todos los campos requeridos (en rojo)','error')
    }
  }

  editName(): void {
    this.isEditNamePublication = true;
  }

  getAttributes(id, isEdit = false) {
    this.alturaAttribute = this.formMain.nativeElement.offsetHeight + 'px';
    this.formPublication.controls['attribute'] = new FormGroup({});
    this.attributes.length = 0;
    if (this.suscription_attribute) this.suscription_attribute.unsubscribe();
    this.suscription_attribute = this.s_catalogo
      .getAttributes(id)
      .subscribe((res) => {
        if (res && res.hasOwnProperty('success') && res.success) {
          let attribute_copy = res.data;
          this.formPublication.controls['attribute'] = new FormGroup({});
          const count_attribute = attribute_copy.length;
          for (let i = 0; i < count_attribute; i++) {
            if (attribute_copy[i].hasOwnProperty('values')) {
              if (attribute_copy[i].tags.catalog_required) {
                let control_select = new FormControl(null);
                let control_input = new FormControl(null);
                let newFormGroup: FormGroup = this.formPublication.controls[
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
                let control_select = new FormControl();
                let control_input = new FormControl();
                // let  newFormGroup = new FormGroup({})
                let newFormGroup = this.formPublication.controls[
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
                let control_input = new FormControl(null);
                // let  newFormGroup = new FormGroup({})
                let newFormGroup = this.formPublication.controls[
                  'attribute'
                ] as FormGroup;
                // newFormGroup.addControl('name',new FormControl(attribute_copy[i].name));
                newFormGroup.addControl(
                  'attribute_manually_' + attribute_copy[i].id,
                  control_input
                );
                // this.formPublication.controls['attribute'].push(newFormGroup);
              } else {
                let control_input = new FormControl(null);
                // let  newFormGroup = new FormGroup({})
                let newFormGroup = this.formPublication.controls[
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
      let form_attribute: FormGroup = this.formPublication.controls[
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
}
