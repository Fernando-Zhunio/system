import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IClientOrder, IItemOrder, IOrder } from '../../../../../interfaces/iorder';
import { Iwarehouse } from '../../../../../interfaces/iwarehouse';

import { ElementRef, ViewChild } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { trans } from '../../../../../class/translations';
import { StorageService } from '../../../../../services/storage.service';
import { DatePipe } from '@angular/common';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-pdf-detail-order',
  templateUrl: './pdf-detail-order.component.html',
  styleUrls: ['./pdf-detail-order.component.scss'],
  providers: [DatePipe]
})
export class PdfDetailOrderComponent implements OnInit {

  @ViewChild('forPdf') forPdf!: ElementRef;
  url = 'system-orders/warehouses/search';
  warehouses: Map<number, Iwarehouse> = new Map();
  warehouseSelected: Map<number, Iwarehouse> = new Map();
  itemsPdf: Map<number, DataWarehouse> = new Map();
  currentItemPdf: DataWarehouse | null;
  isOpenSearchWarehouse = false;
  itemsOrder: Map<number, IItemOrder> = new Map();
  client: IClientOrder;

  constructor(private datePipe: DatePipe, private storage: StorageService, @Inject(MAT_DIALOG_DATA) public dataExternal: { order: IOrder }, private snackbar: MatSnackBar) {
  }

  ngOnInit() {
    this.itemsOrder = new Map(this.dataExternal.order.items.map(item => [item.id, item]));
    this.client = this.dataExternal.order.client;
  }

  getData($event): void {
    this.warehouses = new Map($event.data.map(warehouse => [warehouse.id, warehouse]));
  }

  addWarehouse(key): void {
    if (!this.currentItemPdf) {
      this.currentItemPdf = new DataWarehouse();
    }
    this.currentItemPdf.warehouse = this.warehouses.get(key)!;
    this.isOpenSearchWarehouse = false;
  }

  removeWarehouse(key): void {
    this.warehouseSelected.delete(key);
  }

  pass(quantity, id): void {
    const item = this.itemsOrder.get(id);
    if (item && quantity <= item.quantity) {
      if (!this.currentItemPdf) {
        this.currentItemPdf = new DataWarehouse();
      }
      this.currentItemPdf.addItem(item, quantity);
      item.quantity -= quantity;
    } else {
      this.snackbar.open('No hay suficientes unidades', 'Cerrar', { duration: 3000 });
    }
  }

  quitItem(id): void {
    const itemSelected = this.currentItemPdf!.items.get(id)!;
    const orderItem = this.itemsOrder.get(id);
    if (orderItem && itemSelected) {
      orderItem.quantity = Number.parseInt(orderItem.quantity.toString()) + itemSelected.quantity;
    }
    this.currentItemPdf!.items.delete(id);
  }

  saveItemPdf(): void {
    if (this.currentItemPdf && this.currentItemPdf.validateOk()) {
      if (this.itemsPdf.has(this.currentItemPdf.warehouse.id)) {
        this.snackbar.open('Ya existe una lista para la bodega', 'Cerrar', { duration: 4000 });
        return;
      }
      this.itemsPdf.set(this.currentItemPdf.warehouse.id, this.currentItemPdf);
      this.currentItemPdf = null;
    } else {
      this.snackbar.open('No se puede guardar aun falta la bodega o productos', 'Cerrar', { duration: 3000 });
    }

  }

  removeAllItems(id): void {
    this.itemsPdf.get(id)?.items.forEach((value, key) => {
      const itemOrder = this.itemsOrder.get(key);
      if (itemOrder) {
        itemOrder.quantity = Number.parseInt(itemOrder?.quantity.toString()) + value.quantity;

      }
    });
    this.itemsPdf.delete(id);
  }

  generatePDF(): void {
    if (this.itemsPdf.size === 0) {
      this.snackbar.open('No hay items para generar el pdf', 'Cerrar', { duration: 3000 });
      return;
    }
    const dd = {
      watermark: {
        text: 'Novisolutions',
        color: 'gray', opacity: 0.1, bold: true
      },
      footer: { text: 'Usuario Novisolutions: ' + this.getUserSystem(), fontSize: 7, margin: [10, 0, 0, 10] },
      content: [
        { text: 'Transferencia de orden #' + this.dataExternal.order.id, fontSize: 22, bold: true, alignment: 'center', margin: [0, 0, 0, 10] },

        this.generateHeaderPdf(),

      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          padding: [10, 10, 10, 10]
        }
      }
    }
    dd.content.push(this.generateBodyPdf());

    const pdf = pdfMake.createPdf(dd);
    pdf.download('orden-' + this.dataExternal.order.id + '-transferencia.pdf');
  }

  generateHeaderPdf(): any {
    return [
      {
        columns: [
          [
            { text: 'Cliente', fontSize: 20, bold: true },
            {
              layout: 'noBorders',
              table: {
                padding: [10, 10, 10, 10],
                body: [
                  ['Nombres:', this.client.first_name + " " + this.client.last_name],
                  ['Tipo de documento:', this.client.doc_type],
                  ['Numero de documento:', this.client.doc_id],
                  ['Teléfono:', this.client.phone],
                  ['País:', this.client.country],
                  ['Provincia:', this.client.state],
                ]
              }
            }
          ],
          [
            { text: 'Detalles', fontSize: 20, bold: true },
            {
              layout: 'noBorders',
              table: {
                padding: [10, 10, 10, 10],
                body: [
                  ['# de orden:', this.dataExternal.order.id],
                  ['Estado:', trans(this.dataExternal.order.status, "orders")],
                  ['Fecha de creación:', this.datePipe.transform(this.dataExternal.order.created_at)],
                  ['Código vendedor:', this.dataExternal.order.seller_code],
                  ['Tipo:', this.dataExternal.order?.type],
                ]
              }
            }
          ]
        ]
      },
      {
        columns: [
          [
            { text: 'Detalles de envió', fontSize: 20, bold: true, margin: [0, 10, 0, 5] },
            {
              layout: 'noBorders',
              table: {
                body: [
                  ['Nombres:', this.dataExternal.order?.shipping_address?.first_name + " " + this.dataExternal.order?.shipping_address?.last_name],
                  ['Compañía:', this.dataExternal.order?.shipping_address?.company],
                  ['Vecindario:', this.dataExternal?.order.shipping_address?.neighborhood],
                  ['Provincia:', this.dataExternal.order?.shipping_address?.state],
                  ['Ciudad:', this.dataExternal.order?.shipping_address?.city],
                  ['Calles:', this.dataExternal.order?.shipping_address?.street],
                  ['Código postal:', this.dataExternal.order?.shipping_address?.zip_code],
                ]
              }
            }
          ]
        ]
      },
    ]
  }

  getUserSystem(): string {
    const user = this.storage.getCurrentUser();
    return user?.name ? user.name : user?.email!;
  }

  generateBodyPdf(): any {
    const dataReturn: any[] = [
      {
        text: 'Bodegas con productos',
        fontSize: 20,
        bold: true,
        margin: [0, 10, 0, 0]
      }
    ]

    const warehouses: any[] = []
    this.itemsPdf.forEach((value) => {
      const warehouse = [{
        margin: [0, 10, 0, 0],
        text:
          [{
            text: 'Bodega:',
            fontSize: 14,
            bold: true,
            margin: [0, 20, 0, 0]
          },
          value.warehouse.name
          ]
      },
      {
        text: [{
          text: 'Código de bodega:',
          fontSize: 14,
          bold: true,
        },
        value.warehouse.code
        ]
      },
      { text: 'Productos:', fontSize: 14, bold: true },
      {
        ol: Array.from(value.items.values()).map((item) => {
          return [
            [
              {
                text: item.name,
                fontSize: 13,
              },
              {
                text: [
                  { text: 'Código:', fontSize: 13, bold: true },
                  item.code,
                ]
              },
              {
                text: [
                  { text: 'Cantidad:', fontSize: 13, bold: true },
                  item.quantity,
                ]
              },
              {
                text: [
                  { text: 'Precio:', fontSize: 13, bold: true },
                  item.price,
                ]
              }
            ]
          ]
        })
      }
      ];
      warehouses.push(warehouse);
    })
    dataReturn.push({ ol: warehouses });
    return dataReturn;
  }

  async getBase64Image(_url): Promise<any> {
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.onload = async () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL("image/png");
      return dataURL;
    }
    // img.src = url
  }
}


class DataWarehouse {
  warehouse: Iwarehouse;
  items: Map<number, {
    id: number;
    name: string;
    quantity: number;
    price: number;
    code: string;
    img: string;
  }> = new Map();

  constructor() { }

  addItem(item: IItemOrder, quantity: any): void {
    if (this.items.has(item.id)) {
      this.items.get(item.id)!.quantity += Number.parseInt(quantity);
      return;
    }
    this.items.set(item.id, {
      id: item.id,
      img: item?.product?.image || 'assets/img/img_not_available.png',
      name: item.product.name,
      quantity: Number.parseInt(quantity),
      price: item.price,
      code: item.product.code
    });
  }

  validateOk(): boolean {
    return this.warehouse && this.items.size > 0;
  }

}
