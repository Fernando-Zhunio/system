import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MarcasService } from '../../../../services/marcas.service';
import { SwalService } from '../../../../services/swal.service';

@Component({
  selector: 'app-marcas-create-or-edit',
  templateUrl: './marcas-create-or-edit.component.html',
  styleUrls: ['./marcas-create-or-edit.component.css']
})
export class MarcasCreateOrEditComponent implements OnInit {

  constructor(private s_marcas:MarcasService,private act_router:ActivatedRoute) { }





  formCreateOrEdit:FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.max(200)]),
    sort_name: new FormControl('',[Validators.max(200)]),
  });

  title:string="";
  // categories=[];
  // brands=[];
  // prefixes=[];
  isSend = false; 
  product_name = ""

  id:number|string = null;
  ngOnInit(): void {
     this.act_router.data.subscribe(res=>{
      console.log(res);
      if(res.isEdit){
        this.title ="Editando Marca";
        this.id = this.act_router.snapshot.paramMap.get('id');
        this.s_marcas.edit(this.id).subscribe(response=>{
          // this.updateVariants(response.categories,response.brands,response.prefixes);
          console.log(response);
          this.product_name = response.brand.name;
          this.formCreateOrEdit.controls['name'].setValue(response.brand.name);
          this.formCreateOrEdit.controls['sort_name'].setValue(response.brand.sort_name);
        
        })
      }
      else{
        this.title ="Creando Marca";
       
      }
    })
  }



  sendData():void{
    if(this.formCreateOrEdit.valid){
      this.isSend = ! this.isSend;
      if(!this.id){
        console.log(this.formCreateOrEdit.value);
        this.s_marcas.store(this.formCreateOrEdit.value).subscribe(
          res=>{
            console.log(res);
            if (res.hasOwnProperty('success') && res.success) {
              SwalService.swalToast('Marca creado con exito','success')
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
        this.s_marcas.update(this.id,this.formCreateOrEdit.value).subscribe(
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
