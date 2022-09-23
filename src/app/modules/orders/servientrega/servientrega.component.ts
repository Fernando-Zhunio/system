import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DomSanitizer } from '@angular/platform-browser';
import { IShippingOrder } from '../../../interfaces/iorder';
import { StandartSearchService } from '../../../services/standart-search.service';
import { SelectedViewServientregaPdfComponent } from '../modules/shared-order/selected-view-servientrega-pdf/selected-view-servientrega-pdf.component';

@Component({
  selector: 'app-servientrega',
  templateUrl: './servientrega.component.html',
  styleUrls: ['./servientrega.component.scss']
})
export class ServientregaComponent implements OnInit {

  constructor(private btnSheet: MatBottomSheet, private standard: StandartSearchService, protected _sanitizer: DomSanitizer) { }
  url = 'system-orders/orders/shippings';
  isOpenCv = false;
  encoded_pdf: any;
  shippings: IShippingOrder[] = [];
  ngOnInit() {
  }

  getData($event): void {
    console.log($event);
    this.shippings = $event;
  }

  openViewPdf(order_id, id: number): void {
    this.btnSheet.open(SelectedViewServientregaPdfComponent).afterDismissed()
      .subscribe(res => {
        if (res) {
          let url: any = null;
          switch (res) {
            case 'docs':
              url = `system-orders/orders/${order_id}/shippings/${id}/servientrega/tracking-pdf`;
              break;
            case 'labels':
              url = `system-orders/orders/${order_id}/shippings/${id}/servientrega/label-pdf`;
              break;
            case 'stickers':
              url = `system-orders/orders/${order_id}/shippings/${id}/servientrega/sticker-pdf`;
              break;
            default:
              url = `system-orders/orders/shippings/servientrega/manifest-pdf?date=${res}`;
              break;
          }
          this.standard.methodGet(url)
            .subscribe(res => {
              if (res?.success) {
                this.isOpenCv = true;
                const byteArray = new Uint8Array(atob(res.data.encoded_pdf).split('').map(char => char.charCodeAt(0)));
                const blob = new Blob([byteArray], { type: 'application/pdf' });
                const _url = window.URL.createObjectURL(blob);
                this.encoded_pdf = this._sanitizer.bypassSecurityTrustResourceUrl(_url);
              }
            });
        }
      });
  }

}
