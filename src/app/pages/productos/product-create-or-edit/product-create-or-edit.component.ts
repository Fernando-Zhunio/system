import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-product-create-or-edit',
  templateUrl: './product-create-or-edit.component.html',
  styleUrls: ['./product-create-or-edit.component.css']
})
export class ProductCreateOrEditComponent implements OnInit {

  constructor(private s_products: ProductsService,private act_router:ActivatedRoute) { }

  formCreateOrEdit:FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.max(200)]),
    code_old: new FormControl('',[Validators.required,Validators.max(200)]),
    code_alt: new FormControl('',[Validators.required,Validators.max(200)]),
    description: new FormControl('',[Validators.required,Validators.max(200)]),
    prefix: new FormControl('',[Validators.required,Validators.max(200)]),
    category: new FormControl('',[Validators.required,Validators.max(200)]),
    brand: new FormControl('',[Validators.required,Validators.max(200)]),
    sequence_pre: new FormControl('',[Validators.max(200)]),
    code_pre: new FormControl('',[Validators.max(200)]),
  });

  title:string="";
  categories=[];
  brands=[];
  prefixes=[];
  ngOnInit(): void {
     this.act_router.data.subscribe(res=>{
      console.log(res);
      if(res.isEdit){
        this.title ="Editando Producto";
        let id = this.act_router.snapshot.paramMap.get('id');
        this.s_products.edit(id).subscribe(response=>{
          this.updateVariants(response.categories,response.brands,response.prefixes);
          console.log(response);
          this.formCreateOrEdit.controls['name'].setValue(response.product.name);
          this.formCreateOrEdit.controls['code_old'].setValue(response.product.old_code);
          this.formCreateOrEdit.controls['code_alt'].setValue(response.product.code_alt);
          this.formCreateOrEdit.controls['description'].setValue(response.product.description);
          this.formCreateOrEdit.controls['prefix'].setValue(response.product.prefix_id);
          this.formCreateOrEdit.controls['category'].setValue(response.product.category_id);
          this.formCreateOrEdit.controls['brand'].setValue(response.product.brand_id);
          // this.formCreateOrEdit.controls['name'].setValue(response.product.name);
          // this.formCreateOrEdit.controls['name'].setValue(response.product.name);
        })
      }
      else{
        this.title ="Creando Producto";
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

  }

}
