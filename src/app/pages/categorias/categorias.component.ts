import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';


declare let Swal:any;
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  constructor(private s_categories:CategoriasService) { }
  
  categories:any
  pageCurrent:number = 1;
  perPage:number = 10;
  totalItem:number = 0;
  ngOnInit(): void {
   this.nextPage();
  }

  nextPage(pageNumber=1):void{
    console.log(pageNumber);
    
    this.s_categories.index(pageNumber).subscribe(
      (response:any)=>{
        console.log(response);
        this.categories = response[0]
        this.totalItem = this.categories.total;
        this.perPage = this.categories.per_page;
        this.pageCurrent =  this.categories.current_page;   
      }
    )
  }

  destroyProduct(id):void{
    let index = this.categories.data.findIndex(x=>x.id===id)
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mr-1',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Seguro que quieres eliminar este Producto?',
      text: this.categories.data[index].name,
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
