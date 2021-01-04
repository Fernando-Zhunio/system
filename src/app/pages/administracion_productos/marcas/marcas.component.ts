import { Component, OnInit } from "@angular/core";
import { MarcasService } from "../../../services/marcas.service";

declare let Swal: any;
@Component({
  selector: "app-marcas",
  templateUrl: "./marcas.component.html",
  styleUrls: ["./marcas.component.css"],
})
export class MarcasComponent implements OnInit {
  constructor(private s_marcas: MarcasService) {}

  brands = [];
  pageCurrent: number = 1;
  perPage: number = 10;
  totalItem: number = 0;
  ngOnInit(): void {
    this.nextPage();
  }

  nextPage(pageNumber = 1): void {
    console.log(pageNumber);

    this.s_marcas.index(pageNumber).subscribe((response: any) => {
      console.log(response);
      this.brands = response.brands.data;
      this.totalItem = response.brands.total;
      this.perPage = response.brands.per_page;
      this.pageCurrent = response.brands.current_page;
    });
  }

  destroyBrand(id): void {
    let index = this.brands.findIndex((x) => x.id === id);
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
        text: this.brands[index].name,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        // reverseButtons: true
      })
      .then((result) => {
        console.log(id);

        if (result.isConfirmed) {
          this.s_marcas.destroy(id).subscribe((res) => {
            // let index:number = this.brands.findIndex((x) => x.id === id);
            if (index != -1) this.brands.splice(index, 1);
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
