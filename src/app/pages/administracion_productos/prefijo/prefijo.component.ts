import { Component, OnInit } from '@angular/core';
import { PrefijoService } from '../../../services/prefijo.service';

declare let Swal: any;
@Component({
  selector: 'app-prefijo',
  templateUrl: './prefijo.component.html',
  styleUrls: ['./prefijo.component.css']
})
export class PrefijoComponent implements OnInit {

  constructor(private s_prefijos: PrefijoService) {}

  prefixes = [];
  pageCurrent: number = 1;
  perPage: number = 10;
  totalItem: number = 0;
  ngOnInit(): void {
    this.nextPage();
  }

  nextPage(pageNumber = 1): void {
    console.log(pageNumber);

    this.s_prefijos.index(pageNumber).subscribe((response: any) => {
      console.log(response);
      this.prefixes = response.prefixes.data;
      this.totalItem = response.prefixes.total;
      this.perPage = response.prefixes.per_page;
      this.pageCurrent = response.prefixes.current_page;
    });
  }

  destroyPrefix(id): void {
    let index = this.prefixes.findIndex((x) => x.id === id);
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mr-1",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Seguro que quieres eliminar esta Marca ?",
        text: this.prefixes[index].name,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        // reverseButtons: true
      })
      .then((result) => {
        console.log(id);

        if (result.isConfirmed) {
          this.s_prefijos.destroy(id).subscribe((res) => {
            // let index:number = this.prefixes.findIndex((x) => x.id === id);
            if (index != -1) this.prefixes.splice(index, 1);
            this.totalItem--;
            swalWithBootstrapButtons.fire(
              "Eliminado!",
              "Eliminado con exito.",
              "success"
            );
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Tu accion a sido cancelada :)",
            "error"
          );
        }
      });
  }


}
