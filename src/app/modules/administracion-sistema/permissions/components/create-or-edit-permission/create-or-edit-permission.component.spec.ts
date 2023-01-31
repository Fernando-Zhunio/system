import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import collect from 'collect.js';

import { CreateOrEditPermissionComponent } from './create-or-edit-permission.component';

describe('CreateOrEditPermissionComponent', () => {
    let component: CreateOrEditPermissionComponent;
    let fixture: ComponentFixture<CreateOrEditPermissionComponent>;

    beforeEach((() => {
        TestBed.configureTestingModule({
            declarations: [CreateOrEditPermissionComponent],
            imports: [
                HttpClientTestingModule,
                MatBottomSheetModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatSelectModule,
                BrowserAnimationsModule,
            ],
            providers: [
                {
                    provide: MatBottomSheetRef,
                    useValue: {}
                },
                {
                    provide: MAT_BOTTOM_SHEET_DATA,
                    useValue: { id: 1, isEdit: true }
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateOrEditPermissionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.groupsPermissions = mockGroupsPermissions();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('#convertForm', () => {
        component.convertForm(true);

        expect(collect(component.inputsForm).sort().all() ).toEqual(
            [
                'article',
                'guard_name',
                'name',
                'plural_name',
                'singular_name',
            ]);

        component.convertForm(false);

        expect(collect(component.inputsForm).sort().all()).toEqual([
            'description',
            'guard_name',
            'name',
            'title',
        ])
    });
});


function mockGroupsPermissions(): any {
    return [
        [
            {
                "id": 1,
                "name": "Inicio",
                "slug": "home",
                "position": 0,
                "created_at": "2022-07-08T16:22:45.000000Z",
                "updated_at": "2022-07-08T16:22:45.000000Z"
            },
            {
                "id": 2,
                "name": "Recursos humanos",
                "slug": "rrhh",
                "position": 1,
                "created_at": "2022-07-08T16:22:45.000000Z",
                "updated_at": "2022-07-08T16:22:45.000000Z"
            },
            {
                "id": 3,
                "name": "Administración de productos",
                "slug": "admin-products",
                "position": 2,
                "created_at": "2022-07-08T16:22:45.000000Z",
                "updated_at": "2022-07-08T16:22:45.000000Z"
            },
            {
                "id": 4,
                "name": "Catalogo",
                "slug": "catalog",
                "position": 3,
                "created_at": "2022-07-08T16:22:45.000000Z",
                "updated_at": "2022-07-08T16:22:45.000000Z"
            },
            {
                "id": 5,
                "name": "Reportes",
                "slug": "reports",
                "position": 4,
                "created_at": "2022-07-08T16:22:45.000000Z",
                "updated_at": "2022-07-08T16:22:45.000000Z"
            },
            {
                "id": 6,
                "name": "Ordenes",
                "slug": "orders",
                "position": 5,
                "created_at": "2022-07-08T16:22:45.000000Z",
                "updated_at": "2022-07-08T16:22:45.000000Z"
            },
            {
                "id": 7,
                "name": "Información General",
                "slug": "general-information",
                "position": 6,
                "created_at": "2022-07-08T16:22:45.000000Z",
                "updated_at": "2022-07-08T16:22:45.000000Z"
            },
            {
                "id": 8,
                "name": "Importaciones",
                "slug": "imports",
                "position": 7,
                "created_at": "2022-07-08T16:22:45.000000Z",
                "updated_at": "2022-07-08T16:22:45.000000Z"
            },
            {
                "id": 9,
                "name": "Administración de sistema",
                "slug": "admin",
                "position": 100,
                "created_at": "2022-07-08T16:22:45.000000Z",
                "updated_at": "2022-07-08T16:22:45.000000Z"
            },
            {
                "id": 10,
                "name": "Otros",
                "slug": "others",
                "position": 1000,
                "created_at": "2022-07-08T16:22:45.000000Z",
                "updated_at": "2022-07-08T16:22:45.000000Z"
            }
        ]
    ]
}
