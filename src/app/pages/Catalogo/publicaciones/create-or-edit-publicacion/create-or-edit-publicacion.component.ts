import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
// import { MatSelectionList, MatSelectionListChange } from "@angular/material/list";
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry,
} from "ngx-file-drop";
import { Subscription } from "rxjs";
import { CatalogoService } from "../../../../services/catalogo.service";
import { SwalService } from "../../../../services/swal.service";
// import { CatalogoMainComponents } from '../../catalogo-routing.module';

@Component({
  selector: "app-create-or-edit-publicacion",
  templateUrl: "./create-or-edit-publicacion.component.html",
  styleUrls: ["./create-or-edit-publicacion.component.css"],
})
export class CreateOrEditPublicacionComponent implements OnInit  {

  @ViewChild('formMain',{static:false}) formMain: ElementRef;
  empresas = new FormControl();
  listing_types = [];
  ml_accounts = [];
  arrayImagen = [];
  id: number = 1;
  publication_current;
  formName: FormGroup = new FormGroup({
    name: new FormControl(null,Validators.required),
  });
  optionsTitle=[];
  public files: NgxFileDropEntry[] = [];
  constructor(private s_catalogo: CatalogoService,private fb: FormBuilder) {
   
  }
  // formData = new FormData();
  formPublication:FormGroup = new FormGroup({
    title:new FormControl(null,Validators.required),
    category:new FormControl(null,Validators.required),
    description:new FormControl(null,Validators.required),
    qty:new FormControl(null,Validators.required),
    price:new FormControl(null,Validators.required),
    type:new FormControl(null,Validators.required),
    attribute:new FormGroup({}),
  });
  src1: any;
  attributes=[];
  alturaAttribute="auto"
  isLoadCategory:boolean = false;
    
  
  ngOnInit(): void {
    this.s_catalogo.create_publications().subscribe((res) => {
      console.log(res);
      this.ml_accounts = res.ml_accounts;
      this.listing_types = res.listing_types;
    });
  }

  

  keysListingTypes() : Array<string> {
    return Object.keys(this.listing_types);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.arrayImagen, event.previousIndex, event.currentIndex);
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();

        console.log(droppedFile);

        fileEntry.file((file: File) => {
          if (file.type == "image/jpeg" || file.type == "image/png") {
            reader.readAsDataURL(file);
            reader.onload = () => {
              this.src1 = reader.result;
              this.arrayImagen.push({
                file,
                id: this.id,
                base64: this.src1,
                relativePath: droppedFile.relativePath,
              });
            };
            console.log(file);
            this.id++;
            console.log(this.arrayImagen);
          } else {
            SwalService.swalToast(
              "Este tipo de archivo no es una imagen valida",
              "error"
            );
          }

          // console.log(droppedFile.relativePath, file);
          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)
 
          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })
 
          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  public removeImage(index) {
    this.arrayImagen.splice(index, 1);
  }

  createPulicationName(): void {
    if(this.formName.valid){
      this.s_catalogo.create_publication_name(this.formName.controls['name'].value)
      .subscribe(res=>{
        console.log(res);
        if(res.success){
          this.publication_current = res.publication;
        }
      })
    }
  }

  predictorMl(event){
    // let url = `${globalData.base_url}/catalogs/publications/category-predictor`;
      // let body =  JSON.stringify({ title: this.publication.name, _token: token });
      let title = event.target.value;
      this.isLoadCategory = true;
      this.s_catalogo.predictor_keyup(title).subscribe(res=>{
        console.log(res);
        this.optionsTitle = res
        this.isLoadCategory = false
      },err=>{
        this.isLoadCategory = false;
      })
  }


  alternativePredictor(event){
    let title = event.target.value;
    this.isLoadCategory = true;
    this.s_catalogo.categoriesMl(title).subscribe(res=>{
      console.log(res);
      this.optionsTitle = res
      this.isLoadCategory = false
    },err=>{
      this.isLoadCategory = false;
    })
  }

  publicationNow(){

  }
  


  getAttributes(id,name):void{
    this.alturaAttribute = this.formMain.nativeElement.offsetHeight+'px';
    console.log(this.alturaAttribute);
    this.s_catalogo.getAttributes(id).subscribe(res=>{
      console.log(res);
      if(res.success){
        let attribute_copy = res.data;
         this.formPublication.controls['attribute'] = new FormGroup({});
        
        const count_attribute = attribute_copy.length;
        for (let i = 0; i < count_attribute; i++) {
          if(attribute_copy[i].hasOwnProperty('values'))
          {
            if(attribute_copy[i].tags.catalog_required){
              let control_select = new FormControl(null,Validators.required)
              let control_input = new FormControl(null,Validators.required)
              // let  newFormGroup = new FormGroup({})
              let newFormGroup:FormGroup = this.formPublication.controls['attribute'] as FormGroup;
              newFormGroup.addControl('attribute_manually_'+attribute_copy[i].id,control_input);
              newFormGroup.addControl('attribute_suggest_'+attribute_copy[i].id,control_select);
              // newFormGroup.addControl('name',new FormControl(attribute_copy[i].name));
              // this.formPublication.controls['attribute'].push(newFormGroup);
            }
            else{
              let control_select = new FormControl()
              let control_input = new FormControl()              
              // let  newFormGroup = new FormGroup({})
              let  newFormGroup = this.formPublication.controls['attribute'] as FormGroup;
              // newFormGroup.addControl('name',new FormControl(attribute_copy[i].name));
              newFormGroup.addControl('attribute_suggest_'+attribute_copy[i].id,control_select);
              newFormGroup.addControl('attribute_manually_'+attribute_copy[i].id,control_input);
              // this.formPublication.controls['attribute'].push(newFormGroup);
            }
          }
          else{
            if(attribute_copy[i].tags.catalog_required){
              let control_input = new FormControl(null,Validators.required)
              // let  newFormGroup = new FormGroup({})
              let  newFormGroup = this.formPublication.controls['attribute'] as FormGroup;
              // newFormGroup.addControl('name',new FormControl(attribute_copy[i].name));
              newFormGroup.addControl('attribute_manually_'+attribute_copy[i].id,control_input);
              // this.formPublication.controls['attribute'].push(newFormGroup);
            }
            else{
              let control_input = new FormControl()
              // let  newFormGroup = new FormGroup({})
              let  newFormGroup = this.formPublication.controls['attribute'] as FormGroup;

              // newFormGroup.addControl('name',new FormControl(attribute_copy[i].name));
              newFormGroup.addControl('attribute_manually_'+attribute_copy[i].id,control_input);
              // this.formPublication.controls['attribute'].push(newFormGroup);
            }
          }

          
        }
        this.attributes = attribute_copy;
        console.log(this.formPublication.value)
          
       
      }


    })
  }
}

