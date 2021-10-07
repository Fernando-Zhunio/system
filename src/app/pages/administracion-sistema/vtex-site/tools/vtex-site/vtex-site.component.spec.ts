import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtexSiteComponent } from './vtex-site.component';

describe('VtexSiteComponent', () => {
  let component: VtexSiteComponent;
  let fixture: ComponentFixture<VtexSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtexSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtexSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
