import { Component, OnInit } from '@angular/core';
import { IProducts } from '../../interfaces/iproducts';
import { ProductsService } from '../../services/products.service';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  constructor(private s_products:ProductsService) { }
  
  products:IProducts
  pageCurrent:number = 1;
  perPage:number = 10;
  totalItem:number = 0;
  ngOnInit(): void {
   this.nextPage();
  }

  nextPage(pageNumber=1):void{
    console.log(pageNumber);
    
    this.s_products.index(pageNumber).subscribe(
      (response:any)=>{
        console.log(response);
        this.products = response[0]
        this.totalItem = this.products.total;
        this.perPage = this.products.per_page;
        this.pageCurrent =  this.products.current_page;   
      }
    )
  }

  destroyProduct(id):void{
    let index = this.products.data.findIndex(x=>x.id===id)
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mr-1',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Seguro que quieres eliminar este Producto?',
      text: this.products.data[index].name,
      icon: 'warning',
      showCancelButton: true,
    
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'Eliminado con exito.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Tu accion a sido cancelada :)',
          'error'
        )
      }
    })
  }



}
