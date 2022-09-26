/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCommonModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPermissionsAllowStubModule } from 'ngx-permissions';
import { TranslatefzModule } from '../../../../../../Modulos/translatefz/translatefz.module';
import { SelectChangeStatusShippingOrderComponent } from '../select-change-status-shipping-order/select-change-status-shipping-order.component';

import { ShippingsComponent } from './shippings.component';

describe('ShippingsComponent', () => {
  let component: ShippingsComponent;
  let fixture: ComponentFixture<ShippingsComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        MatBottomSheetModule, 
        MatDialogModule, 
        HttpClientTestingModule,
        MatMenuModule,
        TranslatefzModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        NgxPermissionsAllowStubModule,
        MatCommonModule,
        MatFormFieldModule,
        MatSelectModule,
        BrowserAnimationsModule,
    ],
      declarations: [ ShippingsComponent, SelectChangeStatusShippingOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingsComponent);
    component = fixture.componentInstance;
    component.shippings = shippingsFill();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

function shippingsFill() {
   return [
        {
            "id": 23,
            "type": "pickup",
            "status": "pending",
            "is_return": !!1,
            "return_shipping_id": null,
            "amount": 0,
            "cubicweight": null,
            "weight": null,
            "height": null,
            "width": null,
            "length": null,
            "tracking_number": null,
            "order_id": 13,
            "origin_warehouse_id": 142,
            "created_at": "2022-08-25T23:22:35.000000Z",
            "updated_at": "2022-08-25T23:22:35.000000Z",
            "tracking_link": null,
            "origin_warehouse": {
                "id": 142,
                "code": "78V",
                "name": "NOVICOMPU CHONE",
                "city": null,
                "address": null,
                "local_code": "078",
                "principal": "false",
                "type": "sale",
                "location_id": 74,
                "created_at": "2022-05-10T21:53:48.000000Z",
                "updated_at": "2022-05-10T21:53:48.000000Z"
            }
        },
        {
            "id": 25,
            "type": "servientrega",
            "status": "pending",
            "is_return": !!0,
            "return_shipping_id": null,
            "amount": 0,
            "cubicweight": null,
            "weight": 0,
            "height": 0,
            "width": 0,
            "length": 0,
            "tracking_number": null,
            "order_id": 13,
            "origin_warehouse_id": 58,
            "created_at": "2022-09-23T16:57:10.000000Z",
            "updated_at": "2022-09-23T16:57:10.000000Z",
            "tracking_link": "https://www.servientrega.com.ec/Tracking/?guia=&tipo=GUIA",
            "origin_warehouse": {
                "id": 58,
                "code": "RCQ",
                "name": "68 CONSIG QUITO",
                "city": null,
                "address": null,
                "local_code": "PRI",
                "principal": "false",
                "type": "other",
                "location_id": 36,
                "created_at": "2022-05-10T21:53:47.000000Z",
                "updated_at": "2022-05-10T21:53:47.000000Z"
            }
        }
    ]
}
