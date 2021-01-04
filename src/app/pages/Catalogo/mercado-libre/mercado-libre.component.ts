import { Component, OnInit } from "@angular/core";
import { MercadoLibreService } from "../../../services/mercado-libre.service";

@Component({
  selector: "app-mercado-libre",
  templateUrl: "./mercado-libre.component.html",
  styleUrls: ["./mercado-libre.component.css"],
})
export class MercadoLibreComponent implements OnInit {
  search_name: string = "";
  isColumns: boolean = true;
  constructor(private s_mercado_libre: MercadoLibreService) {}

  products = [];
  ngOnInit(): void {
    this.s_mercado_libre.index(1).subscribe((res) => {
      console.log(res);
      this.products = res.products.data;
    });
  }

  searchAutocomplete(): void {}

  calcDate(date) {
    let date1 = new Date();
    let date2 = new Date(date);
    var diff = Math.floor(date1.getTime() - date2.getTime());
    var day = 1000 * 60 * 60 * 24;

    var days = Math.floor(diff / day);
    var months = Math.floor(days / 31);
    var years = Math.floor(months / 12);

    var message;
    // = date2.toDateString();
    message = " was ";
    message += days + " days ";
    message += months + " months ";
    message += years + " years ago \n";

    return message;
  }



  assingProduct(mlId):void {
    // var mlId = $(this).attr('id-ml-product');
    // var productMlCont = $(this).parent('.col-lg-12');
    // var assignModal = modal({
    //     id: 'assign',
    //     title: 'Asignar información a otro producto',
    //     ajax: {
    //         url: '/catalogs/ml-products/' + mlId + '/assign/',
    //         type: 'GET',
    //         callback: function() {
    //             searchProducts();
    //             setTimeout(function() {
    //                 $('input.search-product').select();
    //             }, 600);

    //         }

    //     }
    // });

    // $('body').off('click', '#select-assign');
    // $('body').on('click', '#select-assign', function(e) {
    //     var product_id = $(this).attr('product-id');

    //     ajax.xhr({
    //             url: '/catalogs/ml-products/' + mlId + '/assign',
    //             params: { product_id: product_id, _method: 'PUT', _token: token },
    //             method: 'POST',

    //         },
    //         function(data) {
    //             if (data.id) {
    //                 assignModal.close();
    //                 $('[name="search"]').val(data.name);
    //                 //searchExtended(data.name);
    //             }
    //         });
    //     e.preventDefault();
    // });
    // assignModal.show();
}
}
