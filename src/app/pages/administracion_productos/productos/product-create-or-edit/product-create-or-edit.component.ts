import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../../services/products.service';
import { SwalService } from '../../../../services/swal.service';

@Component({
  selector: 'app-product-create-or-edit',
  templateUrl: './product-create-or-edit.component.html',
  styleUrls: ['./product-create-or-edit.component.css']
})
export class ProductCreateOrEditComponent implements OnInit {

  constructor(private s_products: ProductsService,private act_router:ActivatedRoute) { }

  formCreateOrEdit:FormGroup = new FormGroup({
    name: new FormControl(null,[Validators.required,Validators.max(200)]),
    code_old: new FormControl(null,[Validators.max(200)]),
    code_alt: new FormControl(null,[Validators.max(200)]),
    description: new FormControl(null,[Validators.max(200)]),
    prefix: new FormControl(null,[Validators.required,Validators.max(200)]),
    category: new FormControl(null,[Validators.required,Validators.max(200)]),
    brand: new FormControl(null,[Validators.required,Validators.max(200)]),
    sequence: new FormControl(null),
    special_code: new FormControl(null,[Validators.max(200)]),
    code: new FormControl({value:null,disabled:true}),
    
  });
  isSend = false;

  title:string="";
  categories=[];
  brands=[];
  prefixes=[];
  product_name = ""
  id:number|string = null;
  ngOnInit(): void {
     this.act_router.data.subscribe(res=>{
      console.log(res);
      if(res.isEdit){
        this.title ="Editando Producto";
         this.id = this.act_router.snapshot.paramMap.get('id');
        this.s_products.edit(this.id).subscribe(response=>{
          this.updateVariants(response.categories,response.brands,response.prefixes);
          console.log(response);
          this.product_name = response.product.name;
          this.formCreateOrEdit.controls['name'].setValue(response.product.name);
          this.formCreateOrEdit.controls['code_old'].setValue(response.product.old_code);
          this.formCreateOrEdit.controls['code_alt'].setValue(response.product.code_alt);
          this.formCreateOrEdit.controls['description'].setValue(response.product.description);
          this.formCreateOrEdit.controls['prefix'].setValue(response.product.prefix_id);
          this.formCreateOrEdit.controls['category'].setValue(response.product.category_id);
          this.formCreateOrEdit.controls['brand'].setValue(response.product.brand_id);
          this.formCreateOrEdit.controls['code'].setValue(response.product.code);
          this.formCreateOrEdit.controls['sequence'].setValue(response.product.sequence.sequence_number);
          // sequence_number
        })
      }
      else{
        this.title ="Creando Producto";
        this.id = null;
        this.s_products.create().subscribe(
          response=>{
            console.log(response);
           this.updateVariants(response.categories,response.brands,response.prefixes);          
          }
        )
      }
    })
  }

  updateVariants(categories,brands,prefixes){
    this.categories = categories;
    this.brands = brands;
    this.prefixes = prefixes;
  }

  sendData():void{
      if(this.formCreateOrEdit.valid){
        this.isSend = ! this.isSend;
        if(!this.id){
          console.log(this.formCreateOrEdit.value);
          this.s_products.store(this.formCreateOrEdit.value).subscribe(
            res=>{
              console.log(res);
              if (res.hasOwnProperty('success') && res.success) {
                SwalService.swalToast('Producto creado con exito','success')
              }
              else{
                SwalService.swalToast(res.errors,'warning')
              }
              this.isSend = ! this.isSend;
            },
            error=>{
              console.log({error}); 
          this.isSend = ! this.isSend;

            }
          )
        }
        else{
          console.log(this.formCreateOrEdit.value);
          this.s_products.update(this.id,this.formCreateOrEdit.value).subscribe(
            res=>{
              console.log(res);
              if (res.hasOwnProperty('success') && res.success) {
                SwalService.swalToast(res.message,'success')
              }
              else{
                SwalService.swalToast(res.errors,'warning')
              }
              this.isSend = ! this.isSend;
            },
            error=>{
              console.log({error}); 
          this.isSend = ! this.isSend;

            }
          )
        }

      }
  }

}
