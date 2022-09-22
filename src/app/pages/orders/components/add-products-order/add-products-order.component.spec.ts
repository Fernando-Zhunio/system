/* tslint:disable:no-unused-variable */
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {  NgxPermissionsAllowStubModule } from 'ngx-permissions';
import { environment } from '../../../../../environments/environment';
import { DialogProductsService } from '../../../../services/dialog-products.service';

import { AddProductsOrderComponent } from './add-products-order.component';

describe('AddProductsOrderComponent', () => {
    let component: AddProductsOrderComponent;
    let fixture: ComponentFixture<AddProductsOrderComponent>;
    let compiled: any;   
    let httpMock: HttpTestingController;

    beforeEach((() => {
        TestBed.configureTestingModule({
            declarations: [AddProductsOrderComponent],
            imports: [
                CommonModule,
                HttpClientTestingModule,
                ReactiveFormsModule,
                NgxPermissionsAllowStubModule
            ],
            providers: [{
                provide: DialogProductsService, useClass: class fer {
                    close(data: any = null) {
                        return data
                    }
                }
            }],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddProductsOrderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        compiled = fixture.nativeElement;
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('creando item de producto - createOrEditItemOrder', () => {
        spyOn(component.changeOrder, 'emit');
        validateForm(component.form);
        component.order = {
            id: 10,
        } as any
        component.createOrEditItemOrder();
        const request = httpMock.expectOne( `${environment.server}system-orders/orders/${component.order.id}/items`);
        request.flush({success:true, data: 'MockProducts'});
        expect(request.request.method).toBe('POST');
        expect(component.changeOrder.emit).toHaveBeenCalled();
    });

    it('editando item de producto - createOrEditItemOrder', () => {
        spyOn(component.changeOrder, 'emit');
        validateForm(component.formEdit);
        component.order = {
            id: 10,
        } as any
        component.createOrEditItemOrder();
        const request = httpMock.expectOne( `${environment.server}system-orders/orders/${component.order.id}/items`);
        request.flush({success:true, data: 'MockProducts'});
        expect(request.request.method).toBe('POST');
        expect(component.changeOrder.emit).toHaveBeenCalled();
    });

});

function validateForm(form: FormGroup) {
    form.patchValue({
        product: MockProducts,
        quantity: 1,
        price: 1,
        description: 'test',
    });
}

const MockProducts = {
    "id": 3,
    "name": "LAPTOP HP CORE I5 7200, 2TB",
    "description": "LAPTOP HP CORE I5 7200, 2TB DISCO, 8GB RAM, TOUCHSCREEN, ROSE GOLD",
    "user_id": 2,
    "category_id": 4,
    "brand_id": 51,
    "sequence_id": 3,
    "prefix_id": 1,
    "code": "1EHP3",
    "available": 0,
    "code_alt": "17-BS028CY GOLD",
    "old_code": null,
    "created_at": "2018-10-09T17:48:47.000000Z",
    "updated_at": "2020-02-13T15:24:58.000000Z",
    "deleted_at": null,
    "image": null,
    "last_prices": []
}