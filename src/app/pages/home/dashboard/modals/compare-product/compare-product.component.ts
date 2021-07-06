import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { Chart } from "chart.js";
import { StandartSearchService } from "../../../../../services/standart-search.service";

export enum Ecompares {
  productos = "productos",
  locales = "locales",
}
interface IitemsSelection {
  name: string;
  id: number;
  image: string;
}

interface IresponseCompareProducts {
  id: number;
  product_id: number;
  invoice_id: number;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
  sum_products: number;
  month: number;
}

@Component({
  selector: "app-compare-product",
  templateUrl: "./compare-product.component.html",
  styleUrls: ["./compare-product.component.css"],
})
export class CompareProductComponent implements OnInit {
  constructor(private s_standart: StandartSearchService) {}

  // @Input() currentCompare:'productos'|'locales';
  _Ecompares = Ecompares;
  @Input() currentCompare: Ecompares;
  @Input() url: string;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  // product1:IproductSelection;
  // product2:IproductSelection;
  itemsCompare: IitemsSelection[] = [];
  titleCompare: string;
  placeholderCompare: string;
  imgInvoice: string = "assets/img/img_default_null.jpg";
  items: any[] = [];
  isCompare: boolean = false;

  ngOnInit(): void {
    new Chart("chart-items", {
      type: "radar",
      data: {
        labels: ["Enero ", "Febrero", "Marzo", "Abril", "Mayo"],
        datasets: [
          {
            label: "Ventas",
            backgroundColor: [
              "rgba(32, 206, 52, 0.762)",
              "rgba(206, 46, 32, 0.762)",
              "rgba(32, 55, 206, 0.762)",
              "rgba(32, 174, 206, 0.762)",
            ],
            data: [10, 1, 2, 43, 4],
          },
          {
            label: "Ventas2",
            backgroundColor: "#c45850",

            data: [10, 11, 2, 3, 4],
          },
          {
            label: "Ventas3",
            backgroundColor: "#3e95cd",
            data: [0, 15, 2, 3, 34],
          },
        ],
      },
      options: {
        responsive: true,
        // aspectRatio: 1,
        plugins: {
          title: {
            display: true,
            text: "Chart.js Radar Chart",
          },
        },
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    let change_current_compare = changes.currentCompare;
    if (change_current_compare.currentValue == this._Ecompares.locales) {
      this.url = "admin/locations";
      this.itemsCompare = [];
      this.items = [];
    } else if (
      change_current_compare.currentValue == this._Ecompares.productos
    ) {
      this.url = "catalogs/products";
      this.itemsCompare = [];
      this.items = [];
    }
    console.log(changes.currentCompare);
  }

  closeCompare(): void {
    this.close.emit(true);
  }

  remove(): void {}

  changeProduct(event): void {}

  getItemOfServer(): void {
    switch (this.currentCompare) {
      case this._Ecompares.locales:
        break;

      default:
        break;
    }
  }

  captureImagenProduct(i): string {
    if (this.items[i]?.prestashop_products?.length > 0) {
      return this.items[i].prestashop_products[0].image;
    }
    if (this.items[i].ml_infos?.length > 0) {
      return this.items[i].ml_infos[0].image;
    }
    return "assets/img/img_default_null.jpg";
  }

  selectItemCompare(id): void {
    if (this.itemsCompare.length >= 4) return;
    const exist = this.itemsCompare.findIndex((x) => x.id == id);
    if (exist != -1) return;
    const productIndex = this.items.findIndex((x) => x.id == id);

    console.log(id);
    if (productIndex != -1)
      this.itemsCompare.push({
        id: this.items[productIndex].id,
        name: this.items[productIndex].name,
        image: this.captureImagenProduct(productIndex),
      });
  }

  removeItemCompare(id): void {
    const exist = this.itemsCompare.findIndex((x) => x.id == id);
    if (exist != -1) {
      this.itemsCompare.splice(exist, 1);
    }
  }

  getItems(event) {
    this.items = event.data.data;
  }

  compareNow(): void {
    if (this.itemsCompare.length < 5 && this.itemsCompare.length > 0) {
      const ids = this.itemsCompare.map((item) => item.id);
      console.log(ids);
      this.isCompare = true;
      const url = "dashboard/compare/products";
      this.s_standart.search2(url, { "ids[]": ids }).subscribe((res) => {
        console.log(res);
      });
    }
  }

  generateChart(res): void {

    let date = new Date().getMonth()+1;
    console.log({date});

    const labels:string[] = []
    for (let i = 0; i < 4; i++) {
    //  Genera el label con los ultimos 4 meses
     labels.push(months[date]);


     if(date== 1)date=12;

    }
    const data = {
      labels,
      // : ["Enero ", "Febrero", "Marzo", "Abril", "Mayo"],

      datasets: [
        {
          label: "Ventas",
          backgroundColor: [
            "rgba(32, 206, 52, 0.762)",
            "rgba(206, 46, 32, 0.762)",
            "rgba(32, 55, 206, 0.762)",
            "rgba(32, 174, 206, 0.762)",
          ],
          data: [10, 1, 2, 43, 4],
        },
        {
          label: "Ventas2",
          backgroundColor: "#c45850",

          data: [10, 11, 2, 3, 4],
        },
        {
          label: "Ventas3",
          backgroundColor: "#3e95cd",
          data: [0, 15, 2, 3, 34],
        },
      ],
    };
  }
}

const months = {
  1: "Enero",
  2: "Febrero",
  3: "Marzo",
  4: "Abril",
  5: "Mayo",
  6: "Junio",
  7: "Julio",
  8: "Agosto",
  9: "Septiembre",
  10: "Obtubre",
  11: "Noviembre",
  12: "Diciembre",
};
