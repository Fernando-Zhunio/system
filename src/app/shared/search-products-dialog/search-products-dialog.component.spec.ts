/* tslint:disable:no-unused-variable */
// import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogProductsService } from '../../services/dialog-products.service';
import { SearchProductsDialogComponent } from './search-products-dialog.component';

describe('SearchProductsDialogComponent', () => {
    let component: SearchProductsDialogComponent;
    let fixture: ComponentFixture<SearchProductsDialogComponent>;
    let compiled: any;
    beforeEach((() => {
        TestBed.configureTestingModule({
            declarations: [SearchProductsDialogComponent],
            imports: [
                MatIconModule,
                MatButtonModule,
            ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [{
                provide: DialogProductsService, useClass: class fer {
                    close(data:any = null) {
                        return 'der' || data.data?.get(10).id;
                    }
                }
            }],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchProductsDialogComponent);
        component = fixture.componentInstance;
        component.getData(MockDataProducts);
        fixture.detectChanges();
        compiled = fixture.nativeElement;
    });

    it('Creacion de componente', () => {
        expect(component).toBeTruthy();
    });

    it('Probando la funcion de cerrado - close', () => {
        spyOn<any>(component['dialogService'], 'close');
        component.productsSelected.set(10, MockDataProducts.data[0]);
        component.close();
        expect(component['dialogService'].close)
        .toHaveBeenCalledWith({data: component.productsSelected});
    });

    it('Probando la funcion de cerrado con onlyone - close', () => {
        spyOn<any>(component['dialogService'], 'close');
        component.productsSelected.set(10, MockDataProducts.data[0]);
        component.onlyOne = true;
        component.close();
        expect(component['dialogService'].close)
        .toHaveBeenCalledWith({data: [...component.productsSelected][0][1]});
    });

    it('probando la funcion removeProduct', () => {
        const id1 = MockDataProducts.data[0].id;
        const id2 = MockDataProducts.data[1].id;
        component.addProduct(id1);
        component.addProduct(id2);
        expect(component.productsSelected.size).toEqual(2);
        component.removeProduct(1);
        expect(component.productsSelected.size).toEqual(1);
        expect(component.productsSelected.has(id2)).toBeTruthy();
    });

    it('probando la funcion getData', () => {
        expect(component.products.size).toEqual(MockDataProducts.data.length);
    });

    it('agregando seleccion de productos - AddProduct', () => {
        spyOn(component.add, 'emit');
        const btn = compiled.querySelector('[data-test=add-product]');
        btn?.dispatchEvent(new Event('click'));
        expect(component.productsSelected.size).toEqual(1);
        expect(component.add.emit).toHaveBeenCalled();
    })

    it('agregando seleccion de productos solo uno - AddProduct with OnlyOne', () => {
        component.onlyOne = true;
        spyOn(component.add, 'emit');
        spyOn(component, 'close');
        const btn = compiled.querySelector('[data-test=add-product]');
        btn?.dispatchEvent(new Event('click'));
        expect(component.productsSelected.size).toEqual(1);
        expect(component.close).toHaveBeenCalled();
        expect(component.add.emit).not.toHaveBeenCalled();
    })



});


const MockDataProducts = {
    data: [
        {
            "id": 1,
            "name": "LAPTOP HP CORE I5 7200, 2TB",
            "description": "LAPTOP HP CORE I5 7200, 2TB DISCO, 8GB RAM, TOUCHSCREEN, ROSE GOLD",
            "user_id": 2,
            "category_id": 4,
            "brand_id": 51,
            "sequence_id": 1,
            "prefix_id": 1,
            "code": "1EHP1",
            "available": 0,
            "code_alt": "17-BS027CY ROSE",
            "old_code": null,
            "created_at": "2018-10-09T17:48:47.000000Z",
            "updated_at": "2020-02-13T15:24:58.000000Z",
            "deleted_at": null,
            "image": null,
            "last_prices": [
                {
                    "id": 40182,
                    "price": 8.9285714285714,
                    "price_with_tax": 10,
                    "duration_type": "permanent",
                    "start_date": null,
                    "end_date": null,
                    "status": "active",
                    "action": "discontinue_all",
                    "product_id": null,
                    "price_group_id": 1,
                    "tax_group_id": 1,
                    "created_at": "2022-09-15T16:09:43.000000Z",
                    "updated_at": "2022-09-15T16:09:43.000000Z",
                    "full_price_formated": "10.00",
                    "group": {
                        "id": 1,
                        "type": "ml",
                        "name": "Mercado Libre",
                        "active": true,
                        "required": true,
                        "created_at": "2020-01-14T10:03:27.000000Z",
                        "updated_at": "2020-01-14T10:03:27.000000Z"
                    }
                },
                {
                    "id": 40183,
                    "price": 17.857142857143,
                    "price_with_tax": 20,
                    "duration_type": "permanent",
                    "start_date": null,
                    "end_date": null,
                    "status": "active",
                    "action": "discontinue_all",
                    "product_id": null,
                    "price_group_id": 2,
                    "tax_group_id": 1,
                    "created_at": "2022-09-15T16:09:43.000000Z",
                    "updated_at": "2022-09-15T16:09:43.000000Z",
                    "full_price_formated": "20.00",
                    "group": {
                        "id": 2,
                        "type": "wp",
                        "name": "Pagina web",
                        "active": true,
                        "required": true,
                        "created_at": "2020-01-14T10:03:27.000000Z",
                        "updated_at": "2020-01-14T10:03:27.000000Z"
                    }
                }
            ]
        },
        {
            "id": 2,
            "name": "GG LAPTOP HP CORE I5 7200, 2TB",
            "description": "GG LAPTOP HP CORE I5 7200, 2TB DISCO, 8GB RAM, TOUCHSCREEN, ROSE GOLD",
            "user_id": 2,
            "category_id": 4,
            "brand_id": 51,
            "sequence_id": 2,
            "prefix_id": 3,
            "code": "3EHP2",
            "available": 0,
            "code_alt": "17-BS027CY ROSE",
            "old_code": null,
            "created_at": "2018-10-09T17:48:47.000000Z",
            "updated_at": "2020-02-13T15:24:58.000000Z",
            "deleted_at": null,
            "image": null,
            "last_prices": []
        },
        {
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
        },
    ]
}