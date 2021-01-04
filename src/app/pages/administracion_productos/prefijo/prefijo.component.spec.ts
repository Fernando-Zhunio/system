import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefijoComponent } from './prefijo.component';

describe('PrefijoComponent', () => {
  let component: PrefijoComponent;
  let fixture: ComponentFixture<PrefijoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrefijoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefijoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
