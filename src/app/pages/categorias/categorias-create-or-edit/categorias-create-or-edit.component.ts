import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriasService } from '../../../services/categorias.service';

@Component({
  selector: 'app-categorias-create-or-edit',
  templateUrl: './categorias-create-or-edit.component.html',
  styleUrls: ['./categorias-create-or-edit.component.css']
})
export class CategoriasCreateOrEditComponent implements OnInit {
  constructor(private s_categories:CategoriasService,private act_router:ActivatedRoute) { }

  formCreateOrEdit:FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.max(200)]),
    code: new FormControl('',[Validators.max(200)]),
  });

  title:string="";
  categories=[];
  brands=[];
  prefixes=[];
  ngOnInit(): void {
     this.act_router.data.subscribe(res=>{
      console.log(res);
      if(res.isEdit){
        this.title ="Editando Categoria";
        let id = this.act_router.snapshot.paramMap.get('id');
        this.s_categories.edit(id).subscribe(response=>{
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
        this.title ="Creando Categoria";
        this.s_categories.create().subscribe(
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
