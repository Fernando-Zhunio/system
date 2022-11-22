import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPersonDialogComponent } from './search-person-dialog.component';

describe('SearchPersonDialogComponent', () => {
  let component: SearchPersonDialogComponent;
  let fixture: ComponentFixture<SearchPersonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPersonDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPersonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
